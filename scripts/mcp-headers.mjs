#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';

const configPath = process.env.HARVEST_CONFIG_PATH || resolve(homedir(), '.harvest-hosted', 'config.json');
const token = process.env.HARVEST_TOKEN || readSavedToken(configPath);

if (!/^hvst_live_[A-Za-z0-9_-]{43}$/.test(token)) {
  fail('No valid Harvest credential; complete registration first');
}

process.stdout.write(JSON.stringify({ Authorization: `Bearer ${token}` }));

function readSavedToken(path) {
  try {
    const config = JSON.parse(readFileSync(path, 'utf8'));
    return typeof config.token === 'string' ? config.token : '';
  } catch {
    return '';
  }
}

function fail(message) {
  console.error(`harvest-mcp-auth: ${message}`);
  process.exit(1);
}
