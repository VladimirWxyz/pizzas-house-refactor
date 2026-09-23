import { access, readFile } from "node:fs/promises";

const outputDirectory = new URL("../dist/client/", import.meta.url);
const repositoryPath = "/pizzas-house-refactor";
const references = new Set();

function collectReferences(content) {
  for (const match of content.matchAll(/(?:src|href)=["']([^"']+)["']|url\(["']?([^"')]+)["']?\)/g)) {
    const reference = match[1] ?? match[2];
    if (reference?.startsWith(repositoryPath)) references.add(reference);
  }
}

const indexContent = await readFile(new URL("./index.html", outputDirectory), "utf8");
collectReferences(indexContent);

for (const stylesheet of [...references].filter((reference) => reference.endsWith(".css"))) {
  const relativePath = stylesheet.slice(repositoryPath.length + 1);
  collectReferences(await readFile(new URL(`./${relativePath}`, outputDirectory), "utf8"));
}

const missing = [];
for (const reference of references) {
  const relativePath = reference.slice(repositoryPath.length + 1);
  try {
    await access(new URL(`./${relativePath}`, outputDirectory));
  } catch {
    missing.push(reference);
  }
}

if (missing.length > 0) {
  throw new Error(`Missing GitHub Pages assets:\n${missing.join("\n")}`);
}

console.log(`Validated ${references.size} GitHub Pages asset references.`);
