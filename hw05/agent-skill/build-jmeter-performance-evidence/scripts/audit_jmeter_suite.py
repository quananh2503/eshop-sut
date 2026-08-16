#!/usr/bin/env python3
"""Reusable static audit for a JMeter performance-test directory."""

from __future__ import annotations

import argparse
import csv
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path


SCENARIOS = ("Load", "Stress", "Spike")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("root", type=Path)
    parser.add_argument("--student-id", required=True)
    parser.add_argument("--require-results", action="store_true")
    args = parser.parse_args()

    root = args.root.resolve()
    failures: list[str] = []
    listeners: set[str] = set()
    csv_files: set[Path] = set()

    def check(condition: bool, message: str) -> None:
        print(f"[{'OK' if condition else 'FAIL'}] {message}")
        if not condition:
            failures.append(message)

    plans = sorted((root / "test-plans").glob("*.jmx"))
    check(len(plans) >= 3, "at least three JMX plans exist")

    found_scenarios: set[str] = set()
    for plan in plans:
        match = re.fullmatch(
            rf"{re.escape(args.student_id)}_(Load|Stress|Spike)_\d{{8}}\.jmx",
            plan.name,
        )
        if not match:
            continue
        scenario = match.group(1)
        found_scenarios.add(scenario)
        try:
            xml_root = ET.parse(plan).getroot()
        except ET.ParseError as error:
            check(False, f"valid XML {plan.name}: {error}")
            continue

        test_plans = xml_root.findall(".//TestPlan")
        check(len(test_plans) == 1, f"one TestPlan: {plan.name}")
        if test_plans:
            check(test_plans[0].get("testname") == plan.stem, f"name matches file: {plan.name}")

        configs = xml_root.findall(".//CSVDataSet")
        check(bool(configs), f"CSV config: {plan.name}")
        for config in configs:
            nodes = config.findall("./stringProp[@name='filename']")
            if nodes and nodes[0].text:
                csv_files.add(root / "data" / Path(nodes[0].text).name)

        plan_listeners = xml_root.findall(".//ResultCollector")
        check(bool(plan_listeners), f"report view: {plan.name}")
        listeners.update(item.get("guiclass", "") for item in plan_listeners)
        check(len(xml_root.findall(".//ResponseAssertion")) >= 2, f"response assertions: {plan.name}")
        check(bool(xml_root.findall(".//ConstantTimer")), f"pacing timer: {plan.name}")

    check(found_scenarios == set(SCENARIOS), "Load, Stress and Spike filenames are present")
    check(len(listeners) >= 3, "three distinct listener/report view classes")
    check(len(csv_files) >= 3, "at least three endpoint-specific CSV files")

    for data_file in sorted(csv_files):
        check(data_file.is_file(), f"CSV exists: {data_file.name}")
        if not data_file.is_file():
            continue
        with data_file.open(newline="", encoding="utf-8-sig") as handle:
            rows = list(csv.reader(handle))
        check(len(rows) >= 2, f"CSV has data: {data_file.name}")
        check(all(any(cell.strip() for cell in row) for row in rows), f"no blank CSV record: {data_file.name}")

    if args.require_results:
        for scenario in SCENARIOS:
            candidates = list((root / "results" / "jtl").glob(f"{args.student_id}_{scenario}_*.jtl"))
            check(len(candidates) == 1, f"one raw JTL for {scenario}")
            html = list((root / "results" / "html").glob(f"{args.student_id}_{scenario}_*/index.html"))
            check(len(html) == 1, f"one HTML dashboard for {scenario}")
    else:
        print("[NOTE] Results not required; this is a testware audit, not completion proof.")

    print(f"SUMMARY: {len(failures)} failure(s)")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())

