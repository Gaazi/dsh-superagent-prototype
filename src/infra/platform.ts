/** Platform-specific names DSH uses for the shell tool a worker runs commands with. */
/** DSH exposes `bash` as a global tool on POSIX systems and `pwsh` on Windows. */
export const shellTool = (platform: NodeJS.Platform): 'bash' | 'pwsh' => platform === 'win32' ? 'pwsh' : 'bash'
/** The shell command line that runs a one-off worker command string on this host. */
export const shellCommand = (command: string): string[] => process.platform === 'win32'
  ? [process.env.ComSpec ?? 'cmd.exe', '/d', '/s', '/c', command]
  : ['sh', '-c', command]
