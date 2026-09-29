# LeeWay Secondary Workstation Plan

**Parent mission:** LEEWAY-ECOSYSTEM-FORMULA-FUNNEL-V1  
**Classification:** BLOCKER-PREVENTION SUBPROJECT  
**Parent cursor:** P1.2 remains frozen until a dependable interactive execution node is available.

## Goal

Bring the phone up as a persistent secondary LeeWay workstation so Agent Lee/Codex-style development is not blocked by loss of the Windows PC.

## Architecture

```
                    RUNTIME FABRIC
                          │
                 Execution Node Registry
                   ┌──────┴──────┐
                   │             │
              PC NODE       PHONE NODE
                   │             │
            Windows tools   Device Bridge
            local Docker    browser/GitHub
            desktop VSCode  cloud dev adapter
                   │             │
                   └──────┬──────┘
                          │
                    shared workId
                    shared receipts
                    shared checkpoints
```

## SW0 — Inventory / current truth

Observed:
- Device Bridge phone-local runtime contract exists.
- Phone-local physical execution has historical verified evidence.
- Remote relay has historical E2E evidence.
- Current v0.7 remote phone connection is still marked pending physical install.
- PC Remote Desktop node is currently offline.
- Persistent workplane contract exists in Runtime Fabric.
- GitHub Codespaces can supply Docker-container Linux development through a browser.

## SW1 — Secondary node identity

Create a durable Runtime Fabric execution-node record:
- nodeId: `leeway-phone-workstation`
- class: `mobile-secondary-workstation`
- provider: Device Bridge
- heartbeat
- platform
- capability advertisement
- authorization state
- load/health
- receipt endpoint
- workplane endpoint

Acceptance: Runtime Fabric can distinguish PC and phone nodes and select neither merely by name.

## SW2 — Phone runtime qualification

Required phone capabilities:
- heartbeat/reconnect
- file read/write
- device.execute
- browser/network access
- local repository/artifact storage where supported
- notifications
- screen/control where authorized
- receipt return
- owner stop

Acceptance: phone is reachable remotely without USB and returns a live governed receipt.

## SW3 — Development plane

Attach:
- GitHub web
- github.dev for lightweight editing
- GitHub Codespaces for containerized development
- repository credentials through supported secure auth
- optional terminal/web IDE

Acceptance: from the phone, edit a LeeWay repo, execute a test in cloud dev compute, commit/push, and return commit evidence.

## SW4 — Runtime Fabric workplane

Bind phone node to:
- workplane.status
- jobs.list
- job.read
- job.enqueue
- job.control

Acceptance: a real workId can be accepted, executed on a phone-supported or cloud-attached capability, checkpointed and inspected.

## SW5 — Cross-node handoff

Test:
1. start work on PC node;
2. checkpoint;
3. make PC unavailable;
4. Runtime Fabric records node loss;
5. re-resolve capabilities;
6. route eligible continuation to phone/cloud node;
7. preserve same parentObjectiveId;
8. execute;
9. receipt;
10. when PC returns, reconcile state.

Acceptance: no duplicate mutation and no loss of work cursor.

## SW6 — Conversation/project continuity

Do not depend on proprietary chat UI history as execution state.

Persist a LeeWay continuity envelope:
- current mission cursor
- conversation-derived approved decisions
- workId/objective
- current blockers
- receipts
- commit references
- artifact references
- context summary

Provider conversation history may be connected only through a supported connector/API/export. Otherwise keep project continuity in LeeWay-owned state.

## SW7 — Failover verification

Simulate:
- PC offline
- phone online
- cloud dev compute available
- current mission remains readable
- next eligible task executes
- unsupported Windows-only task remains BLOCKED with exact capability reason

Acceptance state: FAILOVER_VERIFIED.

## Return rule

When SW7 passes:
- close this blocker-prevention subproject;
- return to frozen parent cursor P1.2;
- rerun P1.2 acceptance gate;
- do not treat secondary workstation completion as Voice Phase completion.
