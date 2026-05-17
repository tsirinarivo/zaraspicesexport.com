#!/usr/bin/env bash
# deploy.sh — Mise à jour Zara Spices Export (après install initiale)
# Usage: bash deploy.sh

set -e
cd "$(dirname "$0")"

echo "▶ Pull dernière version..."
git pull origin claude/ecommerce-full-stack-design-umvTK

echo "▶ Rebuild & restart conteneur..."
docker compose down
docker compose build --no-cache
docker compose up -d

echo "▶ Statut :"
sleep 5
docker compose ps
docker compose logs --tail=15

echo "✓ Déployé → https://epice.dago-cloud.com"
