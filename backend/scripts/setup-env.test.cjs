const assert = require('node:assert/strict');
const { test } = require('node:test');
const { mkdtempSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const { spawnSync } = require('node:child_process');

function withIsolatedBackend(run) {
  const root = mkdtempSync(join(tmpdir(), 'devburger-env-'));
  const backend = join(root, 'backend');
  const scripts = join(backend, 'scripts');
  mkdirSync(scripts, { recursive: true });
  copyFileSync(join(__dirname, 'setup-env.cjs'), join(scripts, 'setup-env.cjs'));
  const envFile = join(backend, '.env');
  const setup = () => spawnSync(process.execPath, [join(scripts, 'setup-env.cjs')], { cwd: backend, encoding: 'utf8' });
  try { run({ backend, envFile, setup }); }
  finally { rmSync(root, { recursive: true, force: true }); }
}

test('gera segredo aleatorio quando nao existe .env', () => {
  withIsolatedBackend(({ envFile, setup }) => {
    const result = setup();
    assert.equal(result.status, 0, result.stderr);
    assert.match(readFileSync(envFile, 'utf8'), /^JWT_SECRET=[a-f0-9]{96}$/m);
  });
});

test('executar outra vez nao substitui o segredo', () => {
  withIsolatedBackend(({ envFile, setup }) => {
    assert.equal(setup().status, 0);
    const first = readFileSync(envFile, 'utf8');
    assert.equal(setup().status, 0);
    assert.equal(readFileSync(envFile, 'utf8'), first);
  });
});

test('preserva outras variaveis do arquivo .env', () => {
  withIsolatedBackend(({ envFile, setup }) => {
    writeFileSync(envFile, 'DB_HOST=localhost\n', 'utf8');
    assert.equal(setup().status, 0);
    const result = readFileSync(envFile, 'utf8');
    assert.match(result, /^DB_HOST=localhost$/m);
    assert.match(result, /^JWT_SECRET=[a-f0-9]{96}$/m);
  });
});

test('Node.js carrega o segredo via --env-file', () => {
  withIsolatedBackend(({ backend, setup }) => {
    assert.equal(setup().status, 0);
    const result = spawnSync(process.execPath, ['--env-file=.env', '-e', "if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length !== 96) process.exit(1)"], { cwd: backend, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
  });
});
