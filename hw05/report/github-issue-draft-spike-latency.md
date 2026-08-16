# Performance: forgot-password latency increases ~30x during 100-user spike

## Environment

- EShop backend local on WSL2, Node.js 18.19.1, SQLite, 2 logical CPUs and
  7.7 GiB RAM visible to WSL.
- Test: Apache JMeter 5.6.3, non-GUI.
- Endpoint: `POST /api/forgot-password`.
- Shape: 5-user baseline; 100-user spike ramped in 1 second at t=60 s and held
  for 30 seconds; recovery observed until t=150 s.

## Reproduction

1. Start a clean backend and prepare valid demo users.
2. Run `hw05/test-plans/23127001_Spike_20260816.jmx` with its default values.
3. Compare steady windows by sample start timestamp: baseline 5–50 s, spike
   60–90 s, and recovery 100–145 s.

## Actual result

| Phase | Samples | Average | p95 | p99 | Max | Errors |
|---|---:|---:|---:|---:|---:|---:|
| Baseline | 200 | 28.1 ms | 49 ms | 66 ms | 102 ms | 0 |
| Spike | 2,114 | 1,163.789 ms | 1,497 ms | 1,703.87 ms | 8,539 ms | 0 |
| Recovery | 195 | 26.862 ms | 56.6 ms | 111.78 ms | 138 ms | 0 |

Spike p95 is approximately 30.6 times baseline. The service returns HTTP 200
and recovers, but latency degrades substantially during the burst.

## Evidence

- Raw JTL: `hw05/results/jtl/23127001_Spike_20260816.jtl`
- HTML report: `hw05/results/html/23127001_Spike_20260816/`
- Deterministic phase analysis: `hw05/results/analysis/spike-phases.md`
- Resource screenshot: `hw05/evidence/spike/spike_runtime_peak.png`

## Source-informed hypothesis

The handler performs a `SELECT` followed by an `UPDATE users` for every
request through one SQLite database handle. Writer serialization/queueing is a
plausible cause, but database profiling is required before treating it as the
root cause. Candidate experiments include an index on `users(email)`, WAL plus
busy-timeout configuration, and endpoint rate limiting; each requires a
before/after benchmark.
