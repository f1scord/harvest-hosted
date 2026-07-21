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

The installer copies only `SKILL.md`. It never reads, writes, or prints API
keys. If a skill already exists, installation stops unless its contents are
already identical. Remove or back up an old installation yourself before
replacing it.

## Requirements

- Node.js 18 or newer
- A Harvest API token in `HARVEST_TOKEN`
- A Harvest MCP endpoint configured by the supported client

Public email-code registration is not enabled yet. Until it is enabled under a
separate production approval, the installer fails closed at credential setup;
it does not borrow a demo, shared, or another user's token.

## Verify this checkout

```sh
node scripts/verify-public-tree.mjs
```

The verifier checks the public allowlist, required documentation, forbidden
names, likely secret material, and the installer in an isolated temporary home.

## License

This is proprietary software, not open source. One local clone and unmodified
installation for authorized Harvest use are permitted. Copying, modification,
forking, redistribution, mirroring, derivative works, and commercial reuse are
otherwise prohibited. See [LICENSE](LICENSE).
