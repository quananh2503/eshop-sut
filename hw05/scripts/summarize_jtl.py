#!/usr/bin/env python3
"""Summarize a JMeter CSV JTL without third-party packages."""

from __future__ import annotations

import argparse
import csv
import json
import math
from collections import defaultdict
from pathlib import Path


def percentile(values: list[float], percentile_value: float) -> float:
    if not values:
        return 0.0
    ordered = sorted(values)
    rank = (len(ordered) - 1) * percentile_value
    lower = math.floor(rank)
    upper = math.ceil(rank)
    if lower == upper:
        return ordered[lower]
    return ordered[lower] + (ordered[upper] - ordered[lower]) * (rank - lower)


def parse_success(value: str) -> bool:
    return value.strip().lower() == "true"


def summarize_rows(rows: list[dict[str, str]]) -> dict[str, object]:
    if not rows:
        raise ValueError("JTL contains no samples")

    required = {"timeStamp", "elapsed", "label", "success"}
    missing = required - rows[0].keys()
    if missing:
        raise ValueError(f"JTL missing required columns: {sorted(missing)}")

    timestamps = [int(row["timeStamp"]) for row in rows]
    duration_seconds = max((max(timestamps) - min(timestamps)) / 1000.0, 0.001)

    def summarize_group(group_rows: list[dict[str, str]]) -> dict[str, object]:
        elapsed = [float(row["elapsed"]) for row in group_rows]
        failures = sum(not parse_success(row["success"]) for row in group_rows)
        return {
            "samples": len(group_rows),
            "failures": failures,
            "error_rate_percent": round(failures * 100.0 / len(group_rows), 4),
            "average_ms": round(sum(elapsed) / len(elapsed), 3),
            "min_ms": round(min(elapsed), 3),
            "p50_ms": round(percentile(elapsed, 0.50), 3),
            "p90_ms": round(percentile(elapsed, 0.90), 3),
            "p95_ms": round(percentile(elapsed, 0.95), 3),
            "p99_ms": round(percentile(elapsed, 0.99), 3),
            "max_ms": round(max(elapsed), 3),
        }

    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in rows:
        grouped[row["label"]].append(row)

    overall = summarize_group(rows)
    overall["duration_seconds"] = round(duration_seconds, 3)
    overall["throughput_rps"] = round(len(rows) / duration_seconds, 3)

    return {
        "overall": overall,
        "by_label": {label: summarize_group(items) for label, items in sorted(grouped.items())},
    }


def render_markdown(source: Path, summary: dict[str, object]) -> str:
    overall = summary["overall"]
    lines = [
        f"# JTL summary — {source.name}",
        "",
        "> Generated deterministically from the attached raw JTL. Resource metrics must be read from real monitoring evidence.",
        "",
        "## Overall",
        "",
        "| Samples | Failures | Error rate | Throughput | Average | p95 | p99 | Max | Duration |",
        "|---:|---:|---:|---:|---:|---:|---:|---:|---:|",
        (
            f"| {overall['samples']} | {overall['failures']} | "
            f"{overall['error_rate_percent']}% | {overall['throughput_rps']} req/s | "
            f"{overall['average_ms']} ms | {overall['p95_ms']} ms | "
            f"{overall['p99_ms']} ms | {overall['max_ms']} ms | "
            f"{overall['duration_seconds']} s |"
        ),
        "",
        "## By label",
        "",
        "| Label | Samples | Failures | Error rate | Average | p95 | p99 | Max |",
        "|---|---:|---:|---:|---:|---:|---:|---:|",
    ]
    for label, values in summary["by_label"].items():
        safe_label = label.replace("|", "\\|")
        lines.append(
            f"| {safe_label} | {values['samples']} | {values['failures']} | "
            f"{values['error_rate_percent']}% | {values['average_ms']} ms | "
            f"{values['p95_ms']} ms | {values['p99_ms']} ms | {values['max_ms']} ms |"
        )
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("jtl", type=Path)
    parser.add_argument("--markdown", type=Path)
    parser.add_argument("--json", dest="json_path", type=Path)
    args = parser.parse_args()

    with args.jtl.open(newline="", encoding="utf-8-sig") as handle:
        rows = list(csv.DictReader(handle))
    summary = summarize_rows(rows)

    markdown = render_markdown(args.jtl, summary)
    if args.markdown:
        args.markdown.parent.mkdir(parents=True, exist_ok=True)
        args.markdown.write_text(markdown, encoding="utf-8")
    else:
        print(markdown)

    if args.json_path:
        args.json_path.parent.mkdir(parents=True, exist_ok=True)
        args.json_path.write_text(
            json.dumps(summary, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )


if __name__ == "__main__":
    main()

