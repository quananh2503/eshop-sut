#!/usr/bin/env python3
"""Audit HW05 structure without inventing missing execution evidence."""

from __future__ import annotations

import argparse
import csv
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path


EXPECTED = {
    "23127001_Load_20260816.jmx": {
        "endpoint": "/api/users/me",
        "csv": "profile_data.csv",
        "listener": "ViewResultsFullVisualizer",
    },
    "23127001_Stress_20260816.jmx": {
        "endpoint": "/api/cart",
        "csv": "cart_data.csv",
        "listener": "SummaryReport",
    },
    "23127001_Spike_20260816.jmx": {
        "endpoint": "/api/forgot-password",
        "csv": "forgot_password_data.csv",
        "listener": "StatVisualizer",
    },
}

RESULT_NAMES = (
    "23127001_Load_20260816",
    "23127001_Stress_20260816",
    "23127001_Spike_20260816",
    "23127001_Endurance_20260816",
)


class Audit:
    def __init__(self) -> None:
        self.failures: list[str] = []
        self.notes: list[str] = []

    def require(self, condition: bool, message: str) -> None:
        if condition:
            print(f"[OK] {message}")
        else:
            print(f"[FAIL] {message}")
            self.failures.append(message)

    def note(self, message: str) -> None:
        print(f"[NOTE] {message}")
        self.notes.append(message)


def audit_plan(audit: Audit, hw05: Path, filename: str, expected: dict[str, str]) -> None:
    path = hw05 / "test-plans" / filename
    audit.require(path.is_file(), f"test plan exists: {filename}")
    if not path.is_file():
        return
    try:
        root = ET.parse(path).getroot()
    except ET.ParseError as error:
        audit.require(False, f"valid JMX XML: {filename}: {error}")
        return

    plans = root.findall(".//TestPlan")
    audit.require(len(plans) == 1, f"exactly one TestPlan in {filename}")
    if plans:
        audit.require(plans[0].get("testname") == path.stem, f"TestPlan name matches filename: {filename}")

    endpoints = [node.text or "" for node in root.findall(".//stringProp[@name='HTTPSampler.path']")]
    audit.require(expected["endpoint"] in endpoints, f"expected endpoint in {filename}: {expected['endpoint']}")

    csv_nodes = root.findall(".//CSVDataSet")
    audit.require(len(csv_nodes) == 1, f"one endpoint-specific CSV config in {filename}")
    csv_filenames = [
        node.text or ""
        for csv_node in csv_nodes
        for node in csv_node.findall("./stringProp[@name='filename']")
    ]
    audit.require(any(expected["csv"] in item for item in csv_filenames), f"correct CSV in {filename}")

    listeners = root.findall(".//ResultCollector")
    listener_classes = {node.get("guiclass", "") for node in listeners}
    audit.require(expected["listener"] in listener_classes, f"distinct report view in {filename}")

    assertions = root.findall(".//ResponseAssertion")
    audit.require(len(assertions) >= 2, f"status and response assertions in {filename}")
    timers = root.findall(".//ConstantTimer")
    audit.require(bool(timers), f"think-time timer in {filename}")


def audit_csv(audit: Audit, path: Path) -> None:
    audit.require(path.is_file(), f"CSV exists: {path.name}")
    if not path.is_file():
        return
    with path.open(newline="", encoding="utf-8-sig") as handle:
        rows = list(csv.reader(handle))
    audit.require(len(rows) >= 2, f"CSV has header and data: {path.name}")
    audit.require(all(any(cell.strip() for cell in row) for row in rows), f"CSV has no blank record: {path.name}")
    widths = {len(row) for row in rows}
    audit.require(len(widths) == 1, f"CSV rows have consistent columns: {path.name}")


def audit_jtl(audit: Audit, path: Path) -> None:
    audit.require(path.is_file(), f"raw JTL exists: {path.name}")
    if not path.is_file():
        return
    with path.open(newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        rows = list(reader)
        fields = set(reader.fieldnames or [])
    required = {"timeStamp", "elapsed", "label", "responseCode", "success"}
    audit.require(required <= fields, f"JTL has required raw columns: {path.name}")
    audit.require(bool(rows), f"JTL has real samples: {path.name}")


def audit_final(audit: Audit, hw05: Path) -> None:
    for name in RESULT_NAMES:
        audit_jtl(audit, hw05 / "results" / "jtl" / f"{name}.jtl")
        audit.require(
            (hw05 / "results" / "html" / name / "index.html").is_file(),
            f"HTML dashboard exists: {name}/index.html",
        )

    image_extensions = {".png", ".jpg", ".jpeg"}
    for group in ("load", "stress", "spike", "endurance", "hardware"):
        folder = hw05 / "evidence" / group
        images = [item for item in folder.rglob("*") if item.suffix.lower() in image_extensions]
        audit.require(bool(images), f"real image evidence exists: evidence/{group}")

    required_markdown = (
        hw05 / "report" / "23127001_HW05_AI_Performance_Report.md",
        hw05 / "ai-reports" / "23127001_HW05_AI_Audit_Report.md",
        hw05 / "ai-reports" / "23127001_HW05_AI_Disclosure_Form.md",
        hw05 / "ai-reports" / "23127001_HW05_AI_Privacy_Checklist.md",
        hw05 / "README.md",
    )
    for path in required_markdown:
        audit.require(path.is_file(), f"required Markdown exists: {path.name}")
        if path.is_file():
            content = path.read_text(encoding="utf-8")
            audit.require("PENDING_" not in content, f"no pending marker remains: {path.name}")

    for markdown in required_markdown[:-1]:
        pdf = markdown.with_suffix(".pdf")
        audit.require(pdf.is_file() and pdf.stat().st_size > 0, f"PDF exists: {pdf.name}")

    audit.require((hw05 / "git_commit_log.txt").is_file(), "Git commit log exists")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--phase", choices=("build", "final"), default="build")
    args = parser.parse_args()
    hw05 = args.root.resolve()
    audit = Audit()

    audit.require(hw05.is_dir(), f"HW05 root exists: {hw05}")
    for filename, expected in EXPECTED.items():
        audit_plan(audit, hw05, filename, expected)

    for csv_name in {item["csv"] for item in EXPECTED.values()}:
        audit_csv(audit, hw05 / "data" / csv_name)

    skill = hw05 / "agent-skill" / "build-jmeter-performance-evidence" / "SKILL.md"
    audit.require(skill.is_file(), "Agent Skill is included")

    if args.phase == "final":
        audit_final(audit, hw05)
    else:
        audit.note("Build audit does not accept smoke-test metrics as submission evidence.")
        audit.note("Run --phase final only after real JTL/HTML/screenshots/PDFs are present.")

    print(f"SUMMARY: {len(audit.failures)} failure(s), {len(audit.notes)} note(s)")
    return 1 if audit.failures else 0


if __name__ == "__main__":
    sys.exit(main())

