#!/usr/bin/env bash
# Set Theory — local server.
# The YouTube embeds REQUIRE a real http:// origin. Opening index.html directly
# from Finder (file://) makes every player fail with "Video player configuration
# error" (error 153), because the embed has no valid referrer.

set -euo pipefail

cd "$(dirname "$0")"

PORT="${1:-8000}"
URL="http://localhost:${PORT}"

# Step to the next free port if this one is taken.
while lsof -i ":${PORT}" >/dev/null 2>&1; do
  echo "Port ${PORT} is busy, trying $((PORT + 1))…"
  PORT=$((PORT + 1))
  URL="http://localhost:${PORT}"
done

echo ""
echo "  Set Theory is running at ${URL}"
echo "  Press Ctrl+C to stop."
echo ""

# Open the browser once the server is actually listening.
( sleep 1; command -v open >/dev/null && open "${URL}" ) &

exec python3 -m http.server "${PORT}"
