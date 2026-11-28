<!-- shared-agent:start -->
Read `~/.agents/global-agent-rules/AGENTS.md` before project rules.
Read `PROJECT_STATE.md` first. Update it after each completed task.
This root `AGENTS.md` is the project master agent: the only project rule file.
Shared master SHA256: `414e153ce46e071d2617e4ad4e6c9b2e1a2aa4928f9e4efb45f0b2536b0a1d09`.
<!-- shared-agent:end -->

# MediaHub Superagent (`D:\Projects\MediaHub\Media superagent`)

Single unified Super Agent workspace inside `D:\Projects\MediaHub\` overseeing all three MediaHub apps through the shared `MediaHub` modular plugin gateway (`D:\Projects\MediaHub\MediaHub`).

## Managed Apps & Sub-Repos (Separate `.venv`s & Git Repos)

1. **MediaProcessor (`media_processor`)**: `D:\Projects\MediaHub\MediaProcessor\MediaProcessor`
2. **Media Maker (`media_maker`)**: `D:\Projects\MediaHub\Media Maker\MediaMaker`
3. **Auto Publisher (`auto_publisher`)**: `D:\Projects\MediaHub\Auto Publisher`

## Routing & Rules

- Unified Plugin Gateway: `D:\Projects\MediaHub\MediaHub` (`MediaHub.server`, `MediaHub/plugins.json`).
- Never create separate `*-superagent` copies inside individual MediaHub app folders; all MediaHub superagent work stays here.
- Keep each underlying app's `.venv`, Git repository, and safety rules (Private YouTube uploads only, zero paid promotion, face-free Sahabah visuals, H.264 intermediate / H.265 final) strictly intact.
