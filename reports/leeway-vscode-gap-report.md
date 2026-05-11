# LeeWay VS Code Documentation Gap Report

**Compared against:** `C:\Users\Leona\.leeway-vscode`  
**Generated from:** LeeWay Standards second-pass alignment  
**Date:** 2026-05-10

## Scope

This report compares the documented LeeWay Standards runtime model against the actual runtime registries and manifests found in `.leeway-vscode`, with emphasis on:

- canonical sovereign agents
- MCP registry entries
- LVIS worker registry entries
- runtime governance domains
- older documentation drift

## Sources Examined

- `.leeway-vscode/agent-lee/mcp/leeway-mcp-registry.json`
- `.leeway-vscode/agent-lee/mcp/mcp-registry.json`
- `.leeway-vscode/agent-lee/visual-intelligence/workers/worker-registry.json`
- `.leeway-vscode/WORKSPACE_MAP.md`
- LeeWay Standards governing docs updated in this pass

## Now Documented In LeeWay Standards

- Canonical runtime identity for LeeWay VS Code
- Canonical LLM stack
- Canonical sovereign agent lineup named by the governing body
- Canonical MCP plane including LVIS and optimization MCPs
- Canonical LVIS worker registry
- Runtime governance domains: `agent-lee`, `safety`, `sandbox`, `workspace`, `knowledge`, `logs`, `memory`, `patches`, `reports`
- Cross-links from primary docs to a single source of truth: `standards/CANONICAL_RUNTIME_STACK.md`

## Remaining Documentation Gaps

### 1. Internal runtime tool verbs are now captured in machine-readable standards

Documented in:

- `standards/runtime-operations-registry.json`
- `schemas/runtime-operations-registry.schema.json`

### 2. Sovereign-agent manifest evidence is now machine-readable

Documented in:

- `standards/sovereign-runtime-registry.json`
- `schemas/sovereign-runtime-registry.schema.json`

### 3. Domain-level governance contracts are now established

Domain laws are now documented for:

- `safety`
- `sandbox`
- `workspace`
- `knowledge`
- `logs`
- `memory`
- `patches`
- `reports`

### 4. Packaged validation governance is now documented

Documented in:

- `Docs/governance/runtime-packaged-validation.md`

### 5. Historical duplicate docs can drift again

The nested `LeeWay-Standards/` duplicate docs were updated in this pass where stale language was obvious, but the duplicated directory remains a future drift risk unless it is intentionally retired or clearly marked as mirrored content.

## Remaining Recommendation Priority

1. Decide whether nested duplicate docs should remain active or become archived mirrors.
2. Add automated validation scripts to assert external runtime registries stay aligned with `standards/sovereign-runtime-registry.json`.