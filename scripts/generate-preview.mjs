import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const sourcePath = join(projectRoot, "public", "wedding-preview-source.svg");
const outputPath = join(projectRoot, "public", "wedding-preview.png");

const browserCandidates = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);

const browserPath = browserCandidates.find(existsSync);

if (!browserPath) {
  throw new Error(
    "Chrome or Edge was not found. Set CHROME_PATH to a Chromium-based browser executable."
  );
}

if (!existsSync(sourcePath)) {
  throw new Error(`Preview source not found: ${sourcePath}`);
}

const result = spawnSync(
  browserPath,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=1200,630",
    `--screenshot=${outputPath}`,
    pathToFileURL(sourcePath).href,
  ],
  { encoding: "utf8" }
);

if (result.status !== 0) {
  throw new Error(result.stderr || result.stdout || "Preview rendering failed.");
}

const png = readFileSync(outputPath);
const signature = png.subarray(0, 8).toString("hex");
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);

if (signature !== "89504e470d0a1a0a" || width !== 1200 || height !== 630) {
  throw new Error(
    `Unexpected preview output: signature=${signature}, dimensions=${width}x${height}`
  );
}

console.log(
  `Generated public/wedding-preview.png (${width}x${height}, ${png.length} bytes).`
);
