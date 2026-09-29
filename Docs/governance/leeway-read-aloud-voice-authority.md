# LeeWay Read-Aloud Voice Authority

**Status:** Canonical voice law

## Allowed read-aloud voices

For LeeWay-controlled Agent Lee surfaces:

```
Agent Lee Voice One
```

ChatGPT-native voice is outside the LeeWay runtime dependency chain. It may be used only when the Creator explicitly chooses the ChatGPT application's own voice UI; LeeWay MUST NOT depend on it for speech.

The canonical Creator-facing LeeWay voice is:

```
agent-lee-voice-one
```

## Forbidden fallback behavior

Do not silently substitute:

- Windows System.Speech voices;
- browser SpeechSynthesis default voices;
- arbitrary Chatterbox default profiles;
- OS accessibility voices;
- unrelated provider voices.

If Agent Lee Voice One is unavailable on a LeeWay-owned surface:

```
VOICE_UNAVAILABLE
```

must be reported until Voice One is restored.

## Boundary

LeeWay-owned applications MUST route Creator-facing Agent Lee speech through `agent-lee-voice-one`.

ChatGPT Read Aloud is not a runtime dependency, fallback, or authority for LeeWay.
