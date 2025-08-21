#!/usr/bin/env bash
set -euo pipefail

echo "[1/4] Detecting Node and npm versions..."
node -v || { echo "Node.js is required"; exit 1; }
npm -v || { echo "npm is required"; exit 1; }

echo "[2/4] Installing dependencies..."
npm install --no-fund --no-audit

echo "[3/4] Updating browserslist DB (optional)..."
npx --yes update-browserslist-db@latest || true

echo "[4/4] Checking TypeScript types..."
npm run -s check || true

echo "\nSetup complete. Start development server with:\n  npm run dev\n\nOverride port if needed:\n  PORT=5173 npm run dev\n"

