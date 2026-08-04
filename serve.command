#!/usr/bin/env bash
# Double-clickable wrapper for serve.sh (macOS opens .command files in Terminal).
exec "$(dirname "$0")/serve.sh"
