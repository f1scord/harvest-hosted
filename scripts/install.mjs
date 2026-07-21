#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = resolve(repositoryRoot, 'SKILL.md');
const registrationSourcePath = resolve(repositoryRoot, 'scripts', 'register.mjs');
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

const targetDirectories = {
  codex: resolve(process.env.CODEX_HOME || resolve(homedir(), '.codex'), 'skills', 'harvest'),
  'claude-code': resolve(homedir(), '.claude', 'skills', 'harvest'),
};
const targetDirectory = targetDirectories[runtime];
if (!targetDirectory) fail('runtime must be codex or claude-code');

const source = readFileSync(sourcePath, 'utf8');
const registrationSource = readFileSync(registrationSourcePath, 'utf8');
const targetPath = resolve(targetDirectory, 'SKILL.md');
const registrationTargetPath = resolve(targetDirectory, 'register.mjs');
assertCompatible(targetPath, source);
assertCompatible(registrationTargetPath, registrationSource);

mkdirSync(targetDirectory, { recursive: true, mode: 0o700 });
writeIfMissing(targetPath, source);
writeIfMissing(registrationTargetPath, registrationSource);
console.log(`Harvest skill installed for ${runtime}: ${targetPath}`);

function assertCompatible(path, expected) {
  if (existsSync(path) && readFileSync(path, 'utf8') !== expected) fail(`existing skill file differs: ${path}`);
}

function writeIfMissing(path, content) {
  if (!existsSync(path)) writeFileSync(path, content, { encoding: 'utf8', flag: 'wx' });
}

function fail(message) {
  console.error(`harvest-install: ${message}`);
  process.exit(1);
}
