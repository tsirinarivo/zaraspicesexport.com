#!/usr/bin/env bash
# vps-check.sh — Diagnostic VPS pour déploiement Zara Spices Export
# Usage: bash vps-check.sh

BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

ok()   { echo -e "  ${GREEN}✓${NC} $1"; }
warn() { echo -e "  ${YELLOW}⚠${NC} $1"; }
fail() { echo -e "  ${RED}✗${NC} $1"; }
section() { echo -e "\n${BOLD}${BLUE}══ $1 ══${NC}"; }

echo -e "${BOLD}╔══════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║   VPS Diagnostic — Zara Spices Deploy    ║${NC}"
echo -e "${BOLD}╚══════════════════════════════════════════╝${NC}"

# ── Système ──────────────────────────────────────────────────────────────────
section "SYSTÈME"
echo "  OS        : $(cat /etc/os-release | grep PRETTY_NAME | cut -d= -f2 | tr -d '\"')"
echo "  Kernel    : $(uname -r)"
echo "  Arch      : $(uname -m)"
echo "  Hostname  : $(hostname)"
echo "  Date      : $(date)"

# ── Ressources ───────────────────────────────────────────────────────────────
section "RESSOURCES"
RAM_TOTAL=$(free -m | awk '/^Mem:/ {print $2}')
RAM_USED=$(free -m  | awk '/^Mem:/ {print $3}')
RAM_FREE=$(free -m  | awk '/^Mem:/ {print $7}')
echo "  RAM       : ${RAM_USED}MB utilisé / ${RAM_TOTAL}MB total (${RAM_FREE}MB dispo)"

DISK_INFO=$(df -h / | awk 'NR==2 {print $3" utilisé / "$2" total ("$5" plein)"}')
echo "  Disque /  : $DISK_INFO"

CPU_CORES=$(nproc)
echo "  CPU cores : $CPU_CORES"

# ── Réseau & ports ───────────────────────────────────────────────────────────
section "RÉSEAU & PORTS OUVERTS"
IP_PUB=$(curl -s --max-time 5 ifconfig.me 2>/dev/null || echo "indisponible")
echo "  IP publique : $IP_PUB"

echo "  Ports en écoute :"
ss -tlnp 2>/dev/null | awk 'NR>1 {
  split($4, a, ":"); port=a[length(a)];
  split($6, p, "\""); proc=p[2];
  if (port != "") printf "    %-6s %s\n", port, proc
}' | sort -n | uniq | head -20

# ── Docker ───────────────────────────────────────────────────────────────────
section "DOCKER"
if command -v docker &>/dev/null; then
  ok "Docker installé : $(docker --version)"
  if docker info &>/dev/null 2>&1; then
    ok "Docker daemon actif"
  else
    warn "Docker installé mais daemon non accessible (sudo requis ?)"
  fi
else
  fail "Docker NON installé"
fi

if command -v docker &>/dev/null && docker compose version &>/dev/null 2>&1; then
  ok "Docker Compose v2 : $(docker compose version --short)"
elif command -v docker-compose &>/dev/null; then
  warn "Docker Compose v1 (legacy) : $(docker-compose --version)"
else
  fail "Docker Compose NON installé"
fi

if command -v docker &>/dev/null && docker info &>/dev/null 2>&1; then
  echo ""
  echo "  Conteneurs actifs :"
  docker ps --format "    {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null | column -t || echo "    (aucun)"

  echo ""
  echo "  Réseaux Docker :"
  docker network ls --format "    {{.Name}}\t{{.Driver}}" 2>/dev/null | column -t

  echo ""
  echo "  Images présentes :"
  docker images --format "    {{.Repository}}:{{.Tag}}\t{{.Size}}" 2>/dev/null | head -10 | column -t || echo "    (aucune)"
fi

# ── Nginx ─────────────────────────────────────────────────────────────────────
section "NGINX"
if command -v nginx &>/dev/null; then
  ok "nginx installé sur l'hôte : $(nginx -v 2>&1)"

  if systemctl is-active --quiet nginx 2>/dev/null; then
    ok "nginx actif (systemctl)"
  elif service nginx status &>/dev/null 2>/dev/null; then
    ok "nginx actif (service)"
  else
    warn "nginx installé mais non actif"
  fi

  echo ""
  echo "  Sites activés (/etc/nginx/sites-enabled/) :"
  if [ -d /etc/nginx/sites-enabled ]; then
    ls -1 /etc/nginx/sites-enabled/ 2>/dev/null | sed 's/^/    /' || echo "    (vide)"
  else
    echo "    (dossier absent — peut-être /etc/nginx/conf.d/)"
    ls -1 /etc/nginx/conf.d/ 2>/dev/null | sed 's/^/    /' || echo "    (vide)"
  fi

  echo ""
  echo "  Vhosts configurés (server_name) :"
  grep -r "server_name" /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null \
    | grep -v "#" | sed 's/.*server_name/   /' | tr -s ' ' | head -20 || echo "    (aucun)"

else
  warn "nginx NON installé sur l'hôte"
  echo "  → Vérification si nginx tourne dans Docker..."
  if command -v docker &>/dev/null && docker info &>/dev/null 2>&1; then
    NGINX_CTR=$(docker ps --format "{{.Names}}\t{{.Image}}\t{{.Ports}}" 2>/dev/null | grep -i nginx || echo "")
    if [ -n "$NGINX_CTR" ]; then
      ok "nginx trouvé dans Docker :"
      echo "$NGINX_CTR" | sed 's/^/    /'
    else
      fail "nginx introuvable (ni hôte ni Docker)"
    fi
  fi
fi

# ── Certbot / SSL ─────────────────────────────────────────────────────────────
section "SSL / CERTBOT"
if command -v certbot &>/dev/null; then
  ok "Certbot installé : $(certbot --version 2>&1)"
  echo "  Certificats existants :"
  certbot certificates 2>/dev/null | grep -E "Domains|Expiry|Certificate" | sed 's/^/    /' || echo "    (aucun)"
else
  warn "Certbot NON installé"
fi

# Vérif certificats dans /etc/letsencrypt
if [ -d /etc/letsencrypt/live ]; then
  echo "  Dossiers /etc/letsencrypt/live/ :"
  ls -1 /etc/letsencrypt/live/ 2>/dev/null | sed 's/^/    /'
fi

# ── Node.js / npm (hôte) ──────────────────────────────────────────────────────
section "NODE.JS (hôte — info seule)"
if command -v node &>/dev/null; then
  warn "Node.js sur l'hôte : $(node -v) — pas nécessaire (on utilise Docker)"
else
  ok "Node.js absent sur l'hôte (normal, on utilise Docker)"
fi

# ── Port 3001 libre ? ─────────────────────────────────────────────────────────
section "PORT 3001 (cible du conteneur)"
if ss -tlnp 2>/dev/null | grep -q ':3001'; then
  warn "Port 3001 déjà utilisé :"
  ss -tlnp | grep ':3001' | sed 's/^/    /'
  echo "  → Il faudra changer le port dans docker-compose.yml"
else
  ok "Port 3001 libre — OK pour le conteneur"
fi

# ── Git ───────────────────────────────────────────────────────────────────────
section "GIT"
if command -v git &>/dev/null; then
  ok "git installé : $(git --version)"
else
  fail "git NON installé — requis pour cloner le projet"
fi

# ── Résumé ────────────────────────────────────────────────────────────────────
section "RÉSUMÉ"
echo "  Envoyez la sortie complète de ce script pour"
echo "  recevoir les instructions d'installation personnalisées."
echo ""
echo -e "${BOLD}  epice.dago-cloud.com${NC} — Zara Spices Export"
echo ""
