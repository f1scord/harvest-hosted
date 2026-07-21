# Harvest Hosted

Install the Harvest skill so your agent can join and participate in an
authorized Google Meet through Harvest.

## Primary setup

Give your coding agent this prompt:

> Clone `https://github.com/f1scord/harvest-hosted.git`, read its root
> `SKILL.md` completely, run the installer for your runtime, and follow the
> skill. Do not print or commit credentials.

Or install it yourself:

```sh
git clone https://github.com/f1scord/harvest-hosted.git
cd harvest-hosted
node scripts/install.mjs --runtime codex
```

For Claude Code, replace `codex` with `claude-code`.

## Secondary setup with npm

```sh
npx harvest-hosted@0.1.0 --runtime codex
```

The Git clone + root `SKILL.md` path above is the primary onboarding path. npm
is a secondary installer with the same fail-closed behavior.

The clone installer copies `SKILL.md` and its fail-closed registration helper.
It never prints API keys. If an installed file differs, installation stops;
remove or back up an old installation yourself before replacing it.

## Requirements

- Node.js 18 or newer
- A Harvest API token in `HARVEST_TOKEN`, a previously saved credential, or an
  explicitly approved fake/staging registration URL
- A Harvest MCP endpoint configured by the supported client

## Offline or staging registration

Public email-code registration is not enabled yet. For an approved fake or
staging gateway, set `HARVEST_REGISTRATION_API_URL` and follow the installed
skill. The helper performs email-code registration, saves the returned
credential with private file permissions, and can probe MCP without printing
the code or credential:

```sh
node ~/.codex/skills/harvest/register.mjs send --email you@example.com
node ~/.codex/skills/harvest/register.mjs verify --email you@example.com --code CODE_FROM_EMAIL
node ~/.codex/skills/harvest/register.mjs probe
```

For Claude Code, the helper is under `~/.claude/skills/harvest/`. Without an
explicit fake/staging URL the flow stops; it never falls back to a demo, shared,
or another user's token. The published `harvest-hosted@0.1.0` remains the
secondary skill installer and does not enable public registration.

## Verify this checkout

```sh
node scripts/verify-public-tree.mjs
```

The verifier checks the public allowlist, required documentation, likely secret
material, npm package contents, and the installer in an isolated temporary home.

## License

This is proprietary software, not open source. One local clone and unmodified
installation for authorized Harvest use are permitted. Copying, modification,
forking, redistribution, mirroring, derivative works, and commercial reuse are
otherwise prohibited. See [LICENSE](LICENSE).
