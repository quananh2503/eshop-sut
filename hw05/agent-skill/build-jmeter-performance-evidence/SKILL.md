---
name: build-jmeter-performance-evidence
description: Design, review, execute, analyse, and audit reproducible JMeter API performance tests with CSV data, raw JTL, HTML dashboards, resource evidence, and human review. Use when Codex must build or inspect Load, Stress, Spike, or Endurance testware; distinguish test defects from SUT defects; calculate metrics from JMeter CSV JTL; or verify a performance-testing submission without fabricating execution evidence.
---

# Build JMeter Performance Evidence

## Establish the test basis

1. Read the assignment, policy, SUT requirements, API contract, source/runtime
   configuration, prior feature allocation, and submission rubric.
2. Record the chosen assignment version. Do not silently combine versions.
3. Map each scenario to an allowed endpoint group and reject convenient but
   false classifications such as calling an import endpoint read-heavy.
4. Treat product code as the SUT. Change testware only unless the user
   explicitly requests a product fix.

## Design each scenario

For every endpoint group:

1. Use its own CSV file and reject blank records or inconsistent columns.
2. Keep credentials/tokens out of committed JMX/CSV when possible. Obtain
   runtime auth before the measured run and exclude setup traffic from the
   scenario JTL.
3. Add HTTP status and minimal response-contract assertions, timeouts,
   connection reuse, pacing/think time, and explicit ramp/duration properties.
4. Use Load for expected sustained demand, Stress for gradual escalation to a
   degradation/breaking point, Spike for a sudden jump plus baseline/recovery,
   and Endurance for sustained load long enough to observe drift/leaks.
5. Parameterize counts and durations so smoke and official runs use the same
   plan without editing the JMX.

## Human-review AI output

Read [references/review-checklist.md](references/review-checklist.md) before
accepting generated testware. In particular:

- Verify endpoint group mapping against the exact assignment version.
- Check CSV EOF/blank behavior, variable interpolation, auth isolation and
  assertion meaning.
- Reject thread counts justified without hardware or baseline evidence.
- Separate HTTP availability from known functional nonconformance.
- Do not treat a short smoke run as performance evidence.

## Validate before measuring

1. Parse every JMX as XML.
2. Run each plan at one or a few users for seconds, saving output outside the
   submission result directories.
3. Inspect every failed and blank-label sample. Fix test/config/data defects
   before blaming the SUT.
4. Re-run smoke validation and require deterministic success for valid input.
5. Run `scripts/audit_jmeter_suite.py <hw05-dir> --student-id <id>`.

## Execute and preserve evidence

1. Back up mutable local data before a SUT reset.
2. Use JMeter non-GUI mode for measured runs and produce raw CSV JTL plus HTML
   dashboard. Preserve the exact command and timestamp.
3. Display JMeter/terminal and the backend resource monitor in the same frame.
4. Never overwrite a previous official run by default. Require an explicit
   overwrite flag after the old evidence is preserved.
5. Keep raw JTL, HTML folder, screenshot, hardware report and video attributable
   to the real machine. Never synthesize these artifacts with AI.

## Analyse and critique

1. Calculate sample count, throughput, error rate, average, p50/p90/p95/p99 and
   max directly from raw JTL using deterministic code.
2. Correlate resource metrics only from real monitor evidence; JTL does not
   contain backend CPU/RAM.
3. Ask AI to analyse the logs, retain the prompt/output, then independently
   recompute claimed values.
4. Record actual misinterpretations with the correct raw value. Do not invent
   an AI error to satisfy a rubric.
5. Check optimization suggestions against source/config and classify them as
   feasible, conditional, unsupported, or hallucinated.

## Final audit

Require the expected JMX/CSV, full raw JTL, HTML dashboards, scenario/resource
screenshots, hardware identity, report Markdown/PDF, AI audit/critique, Git log,
video link and any real issue evidence. Fail the audit when placeholders remain.

Do not declare completion while student-only evidence, signatures, uploads, or
real execution results are missing.

