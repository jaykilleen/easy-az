#!/usr/bin/env bash
# Az speaks Claude's responses using Piper TTS (Ryan high voice)
# Receives JSON on stdin from Claude Code's Stop hook

set -euo pipefail

VOICE="/home/jay/.claude/piper-voices/en_US-ryan-high.onnx"
MAX_CHARS=500

# Read the hook payload from stdin
payload=$(cat)

# Only speak when stop hook is not already active (prevents loops)
active=$(echo "$payload" | jq -r '.stop_hook_active // false' 2>/dev/null)
if [ "$active" = "true" ]; then
  exit 0
fi

# Get the last assistant message directly from the payload
text=$(echo "$payload" | jq -r '.last_assistant_message // empty' 2>/dev/null \
  | sed 's/```[^`]*```//g' \
  | sed 's/`[^`]*`//g' \
  | sed 's/\*\*//g' \
  | sed 's/\*//g' \
  | sed 's/^#.*//g' \
  | sed 's/|[^|]*|//g' \
  | sed '/^$/d' \
  | head -c "$MAX_CHARS")

if [ -z "$text" ]; then
  exit 0
fi

# Speak it with Piper, piped to aplay for immediate playback
echo "$text" | piper -m "$VOICE" --output-raw 2>/dev/null | aplay -r 22050 -f S16_LE -t raw -q 2>/dev/null &

exit 0
