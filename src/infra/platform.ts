/** Platform-specific names DSH uses for the shell tool a worker runs commands with. */
/** DSH exposes `bash` as a global tool on POSIX systems and `pwsh` on Windows. */
export const shellTool = (platform: NodeJS.Platform): 'bash' | 'pwsh' => platform === 'win32' ? 'pwsh' : 'bash'
