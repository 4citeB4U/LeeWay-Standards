# LeeWay Voice Fabric Standard

**Status:** Canonical architecture law  
**Authority:** LeeWay Standards  
**Service authority:** `4citeB4U/LeeWay-Voice-Fabric`

## Law

Voice is a reusable LeeWay capability fabric, not the property of Agent Lee, an LLM, the Sensory Harness, a browser, an operating system, or a TTS provider.

Any LeeWay agent, worker, application, Harness or external developer MAY consume Voice Fabric independently without adopting the rest of the LeeWay Sensory Harness.

## Separation of authority

```
Text / speech intent producer
        ↓
Voice Fabric contract
        ↓
voicePackageId
        ↓
provider adapter
        ↓
speech stream / playback / interruption
```

The Sensory Harness may consume Voice Fabric, but MUST NOT absorb or duplicate its canonical voice package registry, synthesis routing or interruption authority.

## Agent and worker creation

Every created LeeWay agent or worker MUST have an explicit `voicePackageId`.

- Agent Lee is explicitly bound to `agent-lee-voice-one`.
- Other agents/workers MUST NOT silently inherit Agent Lee's cloned identity.
- The standard shared default is `chatterbox-default-natural` unless creator/policy selects another package.
- A unique cloned/reference voice is optional and explicit.

## Voice package classes

1. `CLONED_REFERENCE` — identity-bearing reference voice package.
2. `CHATTERBOX_DEFAULT_PROFILE` — shared provider voice with governed pace/delivery profile.
3. Future provider profiles MAY be added through the Adapter Fabric without changing the Voice Fabric contract.

## Required capabilities

- `speech.output`
- `speech.stream`
- `speech.cancel`
- `speech.resume`
- `speech.voice_inventory`
- `speech.reference.select`
- `speech.metrics.read`

## Streaming law

The voice system SHOULD begin playback from meaningful complete phrases before the full upstream response is complete. It MUST preserve text order, bound backlog, and reject stale queued/prefetched speech after interruption.

Stopping voice MUST NOT cancel upstream reasoning or work unless a separate cancellation action is issued.

## Persistence law

Versioned packages in GitHub are ecosystem-discoverable. Browser-created packages stored in Voice Fabric IndexedDB are local to that Voice Fabric origin/browser profile until explicitly promoted.

Static GitHub Pages MUST NOT be described as a writable server.

## Provider law

Provider identity is replaceable. Chatterbox is currently an implemented provider, not Voice Fabric authority.

## Formula law

Voice measurements may be mapped through an authorized domain Formula adapter. Voice Fabric MUST NOT fabricate Q69, Formula state or receipts. Numeric Formula execution requires calibrated measurement ranges, 16×6 observations, evaluator execution and Veritas.

## Verification law

A deployed UI, SDK handshake, TTS model load, audio generation, acoustic audibility and human-perceived voice similarity are separate claims and MUST be verified separately.
