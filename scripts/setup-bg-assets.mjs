#!/usr/bin/env node
/**
 * One-time setup: download AI assets to public/bg-ai for faster local loading.
 * Run: npm run setup:bg-ai
 */
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { pipeline } from "stream/promises";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const VERSION = "1.7.0";
const URL = `https://staticimgly.com/@imgly/background-removal-data/${VERSION}/package.tgz`;
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "bg-ai");
const tgzPath = path.join(root, ".cache", "bg-removal-data.tgz");

async function download() {
  mkdirSync(path.dirname(tgzPath), { recursive: true });
  console.log("Downloading AI assets (~80MB, one time)...");

  const res = await fetch(URL);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  await pipeline(res.body, createWriteStream(tgzPath));
}

function extract() {
  mkdirSync(outDir, { recursive: true });
  console.log("Extracting to public/bg-ai...");
  execSync(`tar -xzf "${tgzPath}" -C "${outDir}" --strip-components=2 package/dist`, {
    stdio: "inherit",
  });
}

async function main() {
  if (existsSync(path.join(outDir, "resources.json"))) {
    console.log("AI assets already installed in public/bg-ai");
    return;
  }

  await download();
  extract();
  console.log("Done! Background removal will load faster from your server.");
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
