<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: CORE.GOVERNANCE.STANDARDS
TAG: CORE.GOVERNANCE.VOICE.AUTHORITY
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHAT = Defines the allowable voice identity and fallback policy
WHY = Preserve the existing canonical LeeWay Read-Aloud Voice Authority without a competing authority
WHO = LeeWay Standards / Creator Authority
WHERE = Docs/governance/leeway-read-aloud-voice-authority.md
WHEN = 2026-10-14 (governance header review)
HOW = Markdown governing document, no executable change
AGENTS:
AUDIT
LICENSE:
MIT
-->

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
