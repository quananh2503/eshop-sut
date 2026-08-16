#!/usr/bin/env python3
"""Compare equal steady-state windows in an endurance JMeter CSV JTL."""

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
    parser.add_argument("--ramp-seconds", type=float, default=60.0)
    parser.add_argument("--duration-seconds", type=float, required=True)
    parser.add_argument("--windows", type=int, default=3)
    parser.add_argument("--markdown", type=Path)
    parser.add_argument("--json", dest="json_path", type=Path)
    args = parser.parse_args()

    if args.windows < 2 or args.duration_seconds <= args.ramp_seconds:
        raise ValueError("Need at least two windows and duration greater than ramp")

    with args.jtl.open(newline="", encoding="utf-8-sig") as handle:
        rows = list(csv.DictReader(handle))

    width = (args.duration_seconds - args.ramp_seconds) / args.windows
    result: dict[str, object] = {
        "origin_ms": args.origin_ms,
        "ramp_seconds_excluded": args.ramp_seconds,
        "phase_rule": "Equal steady windows by sample start timestamp; ramp excluded.",
        "windows": {},
    }
    for index in range(args.windows):
        start = args.ramp_seconds + index * width
        end = args.ramp_seconds + (index + 1) * width
        selected = [
            row
            for row in rows
            if start <= (int(row["timeStamp"]) - args.origin_ms) / 1000.0 < end
        ]
        summary = summarize_rows(selected)["overall"]
        summary["window_start_seconds"] = round(start, 3)
        summary["window_end_seconds"] = round(end, 3)
        summary["window_throughput_rps"] = round(len(selected) / width, 3)
        result["windows"][f"steady_{index + 1}"] = summary

    lines = [
        f"# Endurance steady-window summary — {args.jtl.name}",
        "",
        "> Generated deterministically by sample start timestamp; the configured ramp is excluded.",
        "",
        "| Window | Range | Samples | Errors | Throughput | Average | p95 | p99 | Max |",
        "|---|---:|---:|---:|---:|---:|---:|---:|---:|",
    ]
    for name, summary in result["windows"].items():
        lines.append(
            f"| {name} | {summary['window_start_seconds']:.0f}–{summary['window_end_seconds']:.0f} s | "
            f"{summary['samples']} | {summary['failures']} | {summary['window_throughput_rps']} req/s | "
            f"{summary['average_ms']} ms | {summary['p95_ms']} ms | "
            f"{summary['p99_ms']} ms | {summary['max_ms']} ms |"
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
