# LeeWay Adapter Fabric Standard

**Authority:** LeeWay Standards  
**Purpose:** define the single ecosystem law for translating portable LeeWay capabilities into heterogeneous models, devices, operating systems, providers, protocols and physical execution paths.

## Constitutional rule

LeeWay core logic is model-, provider-, device-, operating-system- and path-agnostic. Therefore every non-universal execution surface MUST cross an explicit adapter boundary.

An adapter translates. It does not become authority.

```
Portable intent / capability
        ↓
Adapter contract
        ↓
Qualified implementation binding
        ↓
Execution
        ↓
Measured result
        ↓
Veritas / evidence
```

## Ownership

- **Standards** define adapter law and required evidence.
- **Runtime Fabric** owns the canonical adapter registry, discovery, binding and execution lifecycle.
- **Agent Skills** declare logical capability requirements and consume adapters; skills do not own provider-specific execution.
- **Formula** consumes authorized domain mappings; adapters do not invent Formula state.
- **Harnesses** coordinate domain work and may require specialized adapter classes.
- **Providers/engines** remain replaceable implementations behind adapters.

## Universal adapter identity

Every promoted adapter MUST identify:

- adapter ID and version;
- capability contract(s);
- domain/class;
- provider/runtime binding;
- supported operations;
- input/output schema identity;
- permissions/authorization requirements;
- portability state;
- implementation state;
- tested platform state;
- measurement/evidence schema;
- failure semantics;
- cancellation semantics;
- rollback/fallback route when material;
- Veritas acceptance requirements.

## Three-state portability law

Never collapse these claims:

1. **CONTRACT_PORTABLE** — the logical contract has no fixed provider/path/OS/device identity.
2. **ADAPTER_IMPLEMENTED** — at least one concrete implementation exists.
3. **PLATFORM_TESTED** — that implementation actually passed on a named environment.

## Formula boundary

A domain adapter may collect and normalize measurements, but it MUST NOT fabricate Q69, rankings, scores or Formula receipts.

Formula execution requires:

```
measured observations
    + domain mapping identity/version
    + units/ranges/calibration provenance
    + authorization
    ↓
canonical Formula evaluator
    ↓
Formula state
    ↓
Veritas
```

The domain mapping may output the existing Formula `runtime-state-v1` request. The canonical Formula kernel remains unchanged.

## Adapter classes

The ecosystem SHOULD classify adapters at least as:

- formula-input
- capability/provider
- runtime/execution
- transport/protocol
- device/platform
- model/inference
- speech/audio
- browser/UI
- storage/filesystem
- security/identity
- evidence/Veritas
- legacy/interchange

A single implementation may satisfy multiple contracts, but it MUST expose those contracts explicitly.

## Missing adapter rule

A missing adapter is a first-class dependency state, not a reason to duplicate a subsystem.

When a route is missing:

```
discover → registry lookup → qualified equivalent → compose → extend canonical owner
→ create adapter candidate → test → Veritas → register
```

Only after those routes fail may the parent capability be reported BLOCKED.

## Promotion rule

Generated code, a path, a package, a model, a service endpoint or an MCP schema is not an adapter merely because it exists.

Promotion requires:

```
contract + implementation + test + evidence + registry entry + rollback/failure behavior
```

This standard prevents the recurring LeeWay failure mode where every new domain rediscovered its own one-off integration layer.
