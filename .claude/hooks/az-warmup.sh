#!/usr/bin/env bash
# Warm up Piper TTS by running a short synthesis to preload the model into OS cache
# Used on SessionStart and PreCompact so Az is ready to speak without delay

set -euo pipefail

VOICE="/home/jay/.claude/piper-voices/en_US-ryan-high.onnx"

# Synthesise a tiny phrase, discard audio — just loads the model into memory
echo "." | piper -m "$VOICE" --output-raw 2>/dev/null > /dev/null &

exit 0
