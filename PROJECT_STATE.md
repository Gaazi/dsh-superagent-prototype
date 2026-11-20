# Project State

## Done

- Native Windows runtime support: `pwsh` shell tool for the main Session, `.cmd` worker shims that strip the shim directory from PATH, `git config --show-origin` path normalization, and Windows drive/UNC `stateDir` validation.
- Cross-platform test suite: POSIX-only integration tests are skipped on Windows; equivalent platform-aware checks were added in `tests/platform-support.spec.ts`.
- Old `D:\Projects\MediaProcessor` data copied to `D:\Projects\Media Processor\MediaProcessor` and the old directory moved to the recoverable `.trash/2026-11-20/MediaProcessor-old`.
- `pnpm check` passes: typecheck, 1176 tests passed, 27 POSIX-only skips, build.
- `.trash/` added to `.gitignore`.

## Pending

- Push to `origin/dev` is blocked: HTTP 403, the account has no write access to `deepseek-ai/dsh-superagent-prototype.git`; the commit is local on `dev`.
- Live verification with DSH on Windows after restart (profile `media-superagent`, port 3086, state `D:/dsh-state/media-superagent`).
- Delete the recoverable `.trash/2026-11-20/MediaProcessor-old` copy only after the operator confirms the migrated project is stable.

## Next Step

- Start DeepSeek Harness with the `media-superagent` profile and check that the orchestrator Session and GitHub Source report healthy.
