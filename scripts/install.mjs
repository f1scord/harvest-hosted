#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = resolve(repositoryRoot, 'SKILL.md');
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log('Usage: node scripts/install.mjs --runtime <codex|claude-code>');
  process.exit(0);
}

const runtimeIndex = args.indexOf('--runtime');
const runtime = runtimeIndex >= 0 ? args[runtimeIndex + 1] : '';
if (!runtime || args.length !== 2 || runtimeIndex !== 0) {
  fail('expected exactly --runtime <codex|claude-code>');
}

const targets = {
  codex: resolve(process.env.CODEX_HOME || resolve(homedir(), '.codex'), 'skills', 'harvest', 'SKILL.md'),
  'claude-code': resolve(homedir(), '.claude', 'skills', 'harvest', 'SKILL.md'),
};
const targetPath = targets[runtime];
if (!targetPath) fail('runtime must be codex or claude-code');

const source = readFileSync(sourcePath, 'utf8');
if (existsSync(targetPath)) {
  const current = readFileSync(targetPath, 'utf8');
  if (current === source) {
    console.log(`Harvest skill already installed for ${runtime}`);
    process.exit(0);
  }
  fail(`existing skill differs: ${targetPath}`);
}

mkdirSync(dirname(targetPath), { recursive: true });
writeFileSync(targetPath, source, { encoding: 'utf8', flag: 'wx' });
console.log(`Harvest skill installed for ${runtime}: ${targetPath}`);

function fail(message) {
  console.error(`harvest-install: ${message}`);
  process.exit(1);
}
