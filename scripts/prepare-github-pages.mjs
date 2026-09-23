import { readFile, readdir, writeFile } from "node:fs/promises";
const outputDirectory = new URL("../dist/client/", import.meta.url);
const repositoryPath = "/pizzas-house-refactor";
const textExtensions = new Set([".css", ".html", ".js", ".json", ".mjs"]);

async function rewriteAssets(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") return;
    throw error;
  }

  for (const entry of entries) {
    const entryUrl = new URL(`./${entry.name}${entry.isDirectory() ? "/" : ""}`, directory);

    if (entry.isDirectory()) {
      await rewriteAssets(entryUrl);
      continue;
    }

    if (!textExtensions.has(entry.name.slice(entry.name.lastIndexOf(".")))) continue;

    let content;
    try {
      content = await readFile(entryUrl, "utf8");
    } catch (error) {
      if (error?.code === "ENOENT") continue;
      throw error;
    }
    const updatedContent = content.replaceAll('"/assets/', `"${repositoryPath}/assets/`).replaceAll("'/assets/", `'${repositoryPath}/assets/`).replaceAll("`/assets/", `\`${repositoryPath}/assets/`).replaceAll("url(/assets/", `url(${repositoryPath}/assets/`).replaceAll("url('/assets/", `url('${repositoryPath}/assets/`).replaceAll('url("/assets/', `url("${repositoryPath}/assets/`).replaceAll('"/favicon.svg"', `"${repositoryPath}/favicon.svg"`);

    if (updatedContent !== content) await writeFile(entryUrl, updatedContent);
  }
}

await rewriteAssets(outputDirectory);
