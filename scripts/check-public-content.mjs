import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const projectRoot = process.cwd();
const scanRoots = ["src", "public"];
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".webmanifest",
]);

const rules = [
  {
    label: "denominazione precedente",
    pattern: /Il Giardino delle Esperidi/giu,
  },
  {
    label: "dominio precedente",
    pattern: /giardino-delle-esperidi\.com/giu,
  },
  {
    label: "prodotto escluso",
    pattern: /Amaro del Dottore/giu,
  },
  {
    label: "referenza birra storica",
    pattern: /Maisciuc/giu,
  },
  {
    label: "claim di filiera vietato",
    pattern:
      /senza intermediari|tutto prodotto internamente|interamente in azienda|esclusivamente nei nostri laboratori/giu,
  },
];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath)));
      continue;
    }

    if (entry.isFile() && textExtensions.has(extname(entry.name).toLowerCase())) {
      files.push(absolutePath);
    }
  }

  return files;
}

const files = (
  await Promise.all(scanRoots.map((root) => collectFiles(join(projectRoot, root))))
).flat();
const violations = [];

for (const file of files) {
  const contents = await readFile(file, "utf8");

  for (const rule of rules) {
    rule.pattern.lastIndex = 0;

    for (const match of contents.matchAll(rule.pattern)) {
      const line = contents.slice(0, match.index).split("\n").length;
      violations.push(
        `${relative(projectRoot, file)}:${line} — ${rule.label}: ${JSON.stringify(match[0])}`,
      );
    }
  }
}

if (violations.length > 0) {
  console.error("Audit dei contenuti pubblici non superato:\n");
  console.error(violations.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Audit dei contenuti pubblici superato (${files.length} file testuali).`);
}
