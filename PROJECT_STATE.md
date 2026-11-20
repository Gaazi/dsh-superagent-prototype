# Project State

## Done

- Native Windows runtime support: `pwsh` shell tool for the main Session, `.cmd` worker shims that strip the shim directory from PATH, `git config --show-origin` path normalization, and Windows drive/UNC `stateDir` validation.
- Cross-platform test suite: POSIX-only integration tests are skipped on Windows; equivalent platform-aware checks were added in `tests/platform-support.spec.ts`.
- Old `D:\Projects\MediaProcessor` data copied to `D:\Projects\Media Processor\MediaProcessor` and the old directory moved to the recoverable `.trash/2026-11-20/MediaProcessor-old`.
- `pnpm check` passes: typecheck, 1176 tests passed, 27 POSIX-only skips, build.
- `.trash/` added to `.gitignore`.
- Fixed the live Windows setup blocker `spawn env ENOENT`: `workerProbe` now passes PATH through the subprocess environment, and prepare commands use the host shell (`cmd /d /s /c` on Windows, `sh -c` on POSIX).
- Live verification passed on profile `media-superagent` (port 3086): runtime `ready`, no setup problem, GitHub Source `ready`.
- Created fork `Gaazi/dsh-superagent-prototype`, added remote `myfork`, and pushed `dev` successfully (verified remote and local at `0076978`). `origin` remains the upstream `deepseek-ai` repo, which has no write access (HTTP 403).

## Pending

- Delete the recoverable `.trash/2026-11-20/MediaProcessor-old` copy only after the operator confirms the migrated project is stable.

## Next Step

- Optional: open a pull request from `myfork/dev` to the upstream `deepseek-ai` repo if these fixes should be contributed back.
