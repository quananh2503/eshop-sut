const fs = require("fs");
const path = require("path");
const { chromium } = require("@playwright/test");

const [input, htmlOutput, pdfOutput] = process.argv.slice(2);

function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(value) {
  return esc(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function renderTable(lines) {
  const rows = lines
    .filter((line) => !/^\|\s*-+/.test(line))
    .map((line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => inline(cell.trim())));
  const [head, ...body] = rows;
  return [
    "<table>",
    "<thead><tr>" + head.map((cell) => `<th>${cell}</th>`).join("") + "</tr></thead>",
    "<tbody>",
    ...body.map((row) => "<tr>" + row.map((cell) => `<td>${cell}</td>`).join("") + "</tr>"),
    "</tbody></table>"
  ].join("\n");
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const out = [];
  let i = 0;
  let inList = false;
  let inCode = false;
  let code = [];

  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      if (!inCode) {
        closeList();
        inCode = true;
        code = [];
      } else {
        out.push(`<pre><code>${esc(code.join("\n"))}</code></pre>`);
        inCode = false;
      }
      i++;
      continue;
    }
    if (inCode) {
      code.push(line);
      i++;
      continue;
    }
    if (/^\|.*\|$/.test(line.trim())) {
      closeList();
      const tableLines = [];
      while (i < lines.length && /^\|.*\|$/.test(lines[i].trim())) {
        tableLines.push(lines[i]);
        i++;
      }
      out.push(renderTable(tableLines));
      continue;
    }
    if (/^# /.test(line)) {
      closeList();
      out.push(`<h1>${inline(line.replace(/^# /, ""))}</h1>`);
    } else if (/^## /.test(line)) {
      closeList();
      out.push(`<h2>${inline(line.replace(/^## /, ""))}</h2>`);
    } else if (/^### /.test(line)) {
      closeList();
      out.push(`<h3>${inline(line.replace(/^### /, ""))}</h3>`);
    } else if (/^- /.test(line)) {
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(line.replace(/^- /, ""))}</li>`);
    } else if (/^> /.test(line)) {
      closeList();
      out.push(`<blockquote>${inline(line.replace(/^> /, ""))}</blockquote>`);
    } else if (line.trim() === "") {
      closeList();
    } else {
      closeList();
      out.push(`<p>${inline(line)}</p>`);
    }
    i++;
  }
  closeList();
  return out.join("\n");
}

async function main() {
  const body = renderMarkdown(fs.readFileSync(input, "utf8"));
  const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><style>
@page { size: A4; margin: 18mm 14mm; }
body { font-family: Arial, "DejaVu Sans", sans-serif; color: #111827; line-height: 1.45; font-size: 11px; }
h1 { font-size: 24px; margin: 0 0 18px; }
h2 { font-size: 17px; margin: 22px 0 8px; padding-bottom: 4px; border-bottom: 1px solid #d1d5db; }
h3 { font-size: 13px; margin: 14px 0 6px; }
p { margin: 6px 0; }
ul { margin: 6px 0 8px 20px; padding: 0; }
li { margin: 3px 0; }
table { width: 100%; border-collapse: collapse; margin: 8px 0 14px; page-break-inside: avoid; }
th, td { border: 1px solid #d1d5db; padding: 5px 6px; vertical-align: top; }
th { background: #f3f4f6; font-weight: 700; }
code { font-family: "DejaVu Sans Mono", Consolas, monospace; background: #f3f4f6; padding: 1px 3px; border-radius: 3px; }
pre { background: #f3f4f6; padding: 8px; overflow-wrap: break-word; white-space: pre-wrap; border-radius: 4px; }
blockquote { border-left: 3px solid #9ca3af; padding-left: 10px; color: #374151; margin: 8px 0; }
</style></head><body>${body}</body></html>`;

  fs.mkdirSync(path.dirname(htmlOutput), { recursive: true });
  fs.writeFileSync(htmlOutput, html, "utf8");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("file://" + path.resolve(htmlOutput));
  await page.pdf({ path: pdfOutput, format: "A4", printBackground: true });
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
