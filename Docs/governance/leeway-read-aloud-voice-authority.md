# LeeWay Read-Aloud Voice Authority

**Status:** Canonical voice law

## Allowed read-aloud voices

For LeeWay-controlled Agent Lee surfaces:

```
Agent Lee Voice One
```

For ChatGPT-native surfaces where the ChatGPT client itself owns speech playback:

```
Native ChatGPT voice selected/provided by the ChatGPT application
```

These are the only approved read-aloud voice classes for the Creator-facing Agent Lee/ChatGPT experience.

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

LeeWay cannot command a proprietary ChatGPT client to start its native Read Aloud function unless that client exposes an authorized control/API for it. Native ChatGPT voice remains owned by the ChatGPT client.

LeeWay-owned applications MUST route Creator-facing Agent Lee speech through `agent-lee-voice-one`.
