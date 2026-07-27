#!/bin/bash
# Build, restart, and BLOCK until the server is proven to be serving the new
# CSS. Measuring against a stale `next start` produced three rounds of
# phantom regressions; this makes that failure mode impossible.
#
# Usage: scripts/serve-verified.sh "<string that must appear in the served CSS>"
set -e
MARKER="${1:---campitura-opacity}"

pkill -9 -f "next start" 2>/dev/null || true
pkill -9 -f "next-server" 2>/dev/null || true
sleep 1
lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null || true
sleep 1

npm run build > /tmp/build.log 2>&1 || { echo "BUILD FAILED"; tail -20 /tmp/build.log; exit 1; }

nohup npm run start > /tmp/serve.log 2>&1 &
for _ in $(seq 1 30); do
  sleep 1
  curl -s -o /dev/null http://localhost:3000 && break
done

CSS_PATH=$(curl -s http://localhost:3000 | grep -oE '/_next/static/[a-zA-Z0-9/._-]+\.css' | head -1)
if [ -z "$CSS_PATH" ]; then echo "NO CSS LINK IN HTML"; exit 1; fi

if curl -s "http://localhost:3000$CSS_PATH" | grep -q -- "$MARKER"; then
  echo "server ready · css $CSS_PATH · marker '$MARKER' present"
else
  echo "STALE: marker '$MARKER' missing from $CSS_PATH"; exit 1
fi
