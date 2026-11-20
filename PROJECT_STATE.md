# Project State

## Done

- Native Windows runtime support: `pwsh` shell tool for the main Session, `.cmd` worker shims that strip the shim directory from PATH, `git config --show-origin` path normalization, and Windows drive/UNC `stateDir` validation.
- Cross-platform test suite: POSIX-only integration tests are skipped on Windows; equivalent platform-aware checks were added in `tests/platform-support.spec.ts`.
- Old `D:\Projects\MediaProcessor` data copied to `D:\Projects\Media Processor\MediaProcessor` and the old directory moved to the recoverable `.trash/2026-11-20/MediaProcessor-old`.
- `pnpm check` passes: typecheck, 1176 tests passed, 27 POSIX-only skips, build.
- `.trash/` added to `.gitignore`.
- Fixed the live Windows setup blocker `spawn env ENOENT`: `workerProbe` now passes PATH through the subprocess environment, and prepare commands use the host shell (`cmd /d /s /c` on Windows, `sh -c` on POSIX).
- Live verification passed on profile `media-superagent` (port 3086): runtime `ready`, no setup problem, GitHub Source `ready`.

## Pending

- Push to `origin/dev` is blocked: HTTP 403, the account has no write access to `deepseek-ai/dsh-superagent-prototype.git`; the commit is local on `dev`.
- Delete the recoverable `.trash/2026-11-20/MediaProcessor-old` copy only after the operator confirms the migrated project is stable.

## Next Step

- Give the agent write access to a remote (or a fork) so `dev` can be pushed; the code is otherwise complete and verified.
