import { exec } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Config } from '../src/deployment.ts'
import { gitOriginPath, workerBin, writeEnvironment } from '../src/infra/environment.ts'
import { shellTool } from '../src/infra/platform.ts'
import { testDeployment } from './fixtures/deployment.ts'

let dir: string
beforeEach(() => { dir = mkdtempSync(join(tmpdir(), 'platform-support-')); mkdirSync(workerBin(dir), { recursive: true }) })
afterEach(() => { rmSync(dir, { recursive: true, force: true }) })

describe('state directories', () => {
  it('accepts Windows drive and UNC paths as well as POSIX paths', () => {
    for (const path of ['/srv/state', 'D:/dsh-state/media-superagent', 'D:\\dsh-state\\media-superagent', '\\\\server\\share\\state']) {
      expect(() => Config({ stateDir: path }), path).not.toThrow()
    }
    expect(() => Config({ stateDir: 'relative/dir' })).toThrow()
  })
})

describe('the DSH shell tool', () => {
  it('is bash on POSIX and pwsh on Windows, so the main Session never restricts an unknown tool', () => {
    expect(shellTool('linux')).toBe('bash')
    expect(shellTool('darwin')).toBe('bash')
    expect(shellTool('win32')).toBe('pwsh')
  })
})

describe('worker shims', () => {
  it('are files the worker shell on this platform can resolve', async () => {
    await writeEnvironment(testDeployment({ stateDir: dir, feishu: undefined }), ['old-cli'])
    const files = readdirSync(workerBin(dir))
    if (process.platform === 'win32') {
      expect(files).toEqual(expect.arrayContaining(['gh.cmd', 'lark-cli.cmd', 'old-cli.cmd']))
      const body = readFileSync(join(workerBin(dir), 'gh.cmd'), 'utf8')
      expect(body).toContain('REM # Written by dsh-superagent')
      expect(body).toContain('call "')
      expect(body).toContain('exit /b %ERRORLEVEL%')
    } else {
      expect(files).toEqual(expect.arrayContaining(['gh', 'lark-cli', 'old-cli']))
      const body = readFileSync(join(workerBin(dir), 'gh'), 'utf8')
      expect(body).toContain('#!/bin/sh\n# Written by dsh-superagent')
      expect(body).toContain('exec ')
    }
  })

  it.runIf(process.platform === 'win32')('reaches the configured program through a Windows command shim', async () => {
    const comspec = process.env.ComSpec ?? 'cmd.exe'
    await writeEnvironment(testDeployment({ stateDir: dir, github: { ...testDeployment().github, cli: comspec }, feishu: undefined }), [])
    const shim = join(workerBin(dir), 'gh.cmd')
    const { stdout } = await promisify(exec)(`"${shim}" /c echo dsh-shim-ok`, {
      env: { ...process.env, PATH: `${workerBin(dir)};${process.env.PATH}` },
    })
    expect(stdout).toContain('dsh-shim-ok')
  })
})

describe('git config origins', () => {
  it('compares POSIX, quoted Windows and forward-slash spellings of the same path', () => {
    const quoted = gitOriginPath('"C:\\\\state\\\\worker-gitconfig"')
    expect(quoted).toBe(gitOriginPath('C:/state/worker-gitconfig'))
    expect(gitOriginPath('file:/srv/state/worker-gitconfig'.slice(5))).toBe(gitOriginPath('/srv/state/worker-gitconfig'))
  })
})
