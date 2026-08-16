#!/usr/bin/env python3
"""Summarize baseline, spike, and recovery windows from a JMeter CSV JTL."""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path

from summarize_jtl import summarize_rows


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("jtl", type=Path)
    parser.add_argument("--origin-ms", type=int, required=True)
    parser.add_argument("--baseline-start-seconds", type=float, default=0.0)
    parser.add_argument("--baseline-end-seconds", type=float)
    parser.add_argument("--spike-start-seconds", type=float, default=60.0)
    parser.add_argument("--spike-end-seconds", type=float, default=90.0)
    parser.add_argument("--recovery-start-seconds", type=float)
    parser.add_argument("--recovery-end-seconds", type=float)
    parser.add_argument("--test-end-seconds", type=float, default=150.0)
    parser.add_argument("--markdown", type=Path)
    parser.add_argument("--json", dest="json_path", type=Path)
    args = parser.parse_args()

    with args.jtl.open(newline="", encoding="utf-8-sig") as handle:
        rows = list(csv.DictReader(handle))

    baseline_end = args.baseline_end_seconds or args.spike_start_seconds
    recovery_start = args.recovery_start_seconds or args.spike_end_seconds
    recovery_end = args.recovery_end_seconds or args.test_end_seconds
    windows = {
        "baseline": (args.baseline_start_seconds, baseline_end),
        "spike": (args.spike_start_seconds, args.spike_end_seconds),
        "recovery": (recovery_start, recovery_end),
    }
    result: dict[str, object] = {
        "origin_ms": args.origin_ms,
        "phase_rule": "Phase is assigned by sample start timestamp relative to JMeter test start; optional guard bands exclude ramp and queue-drain transitions.",
        "phases": {},
    }

    for name, (start, end) in windows.items():
        phase_rows = [
            row
            for row in rows
            if start <= (int(row["timeStamp"]) - args.origin_ms) / 1000.0 < end
        ]
        phase = summarize_rows(phase_rows)["overall"]
        phase["window_start_seconds"] = start
        phase["window_end_seconds"] = end
        phase["window_throughput_rps"] = round(len(phase_rows) / (end - start), 3)
        result["phases"][name] = phase

    lines = [
        f"# Spike phase summary — {args.jtl.name}",
        "",
        "> Generated deterministically by sample start timestamp relative to the recorded JMeter test start.",
        "",
        "| Phase | Window | Samples | Errors | Window throughput | Average | p95 | p99 | Max |",
        "|---|---:|---:|---:|---:|---:|---:|---:|---:|",
    ]
    for name, phase in result["phases"].items():
        lines.append(
            f"| {name.title()} | {phase['window_start_seconds']:.0f}–{phase['window_end_seconds']:.0f} s | "
            f"{phase['samples']} | {phase['failures']} | {phase['window_throughput_rps']} req/s | "
            f"{phase['average_ms']} ms | {phase['p95_ms']} ms | {phase['p99_ms']} ms | {phase['max_ms']} ms |"
        )
    markdown = "\n".join(lines) + "\n"

    if args.markdown:
        args.markdown.parent.mkdir(parents=True, exist_ok=True)
        args.markdown.write_text(markdown, encoding="utf-8")
    else:
        print(markdown)
    if args.json_path:
        args.json_path.parent.mkdir(parents=True, exist_ok=True)
        args.json_path.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
