#!/usr/bin/env bash
# deploy.sh — Déploiement Zara Spices Export sur VPS
# Usage: bash deploy.sh

set -e

echo "▶ Pull dernière version..."
git pull origin claude/ecommerce-full-stack-design-umvTK

echo "▶ Build & restart conteneur Docker..."
docker compose down
docker compose build --no-cache
docker compose up -d

echo "▶ Vérification santé du conteneur..."
sleep 5
docker compose ps
docker compose logs --tail=20

echo "✓ Déploiement terminé — https://epice.dago-cloud.com"
