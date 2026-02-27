#!/usr/bin/env bash
# Az speaks Claude's responses using Piper TTS (Ryan high voice)
# Receives JSON on stdin from Claude Code's Stop hook

set -euo pipefail

VOICE="/home/jay/.claude/piper-voices/en_US-ryan-high.onnx"
MAX_CHARS=500

# Read the hook payload from stdin
payload=$(cat)

# Extract the stop reason - only speak on end_turn (not tool use etc)
stop_reason=$(echo "$payload" | jq -r '.stop_reason // empty' 2>/dev/null)
if [ "$stop_reason" != "end_turn" ]; then
  exit 0
fi

# Extract the last assistant message text from the transcript
transcript=$(echo "$payload" | jq -r '.transcript_path // empty' 2>/dev/null)
if [ -z "$transcript" ] || [ ! -f "$transcript" ]; then
  exit 0
fi

# Get the last assistant message content - strip markdown and tool noise
text=$(tail -c 100000 "$transcript" \
  | jq -r 'select(.type == "assistant") | .message.content[]? | select(.type == "text") | .text' 2>/dev/null \
  | tail -1 \
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
