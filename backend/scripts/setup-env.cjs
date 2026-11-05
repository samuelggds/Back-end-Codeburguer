const { randomBytes } = require('node:crypto');
const { existsSync, readFileSync, writeFileSync, appendFileSync } = require('node:fs');
const { resolve } = require('node:path');

const envPath = resolve(__dirname, '..', '.env');
const secretLine = () => `JWT_SECRET=${randomBytes(48).toString('hex')}\n`;

if (!existsSync(envPath)) {
  writeFileSync(
    envPath,
    `# Configuracao local. Nao envie este arquivo ao GitHub.\n${secretLine()}`,
    { encoding: 'utf8', flag: 'wx', mode: 0o600 },
  );
  console.log('JWT_SECRET gerado com seguranca no backend/.env.');
} else {
  const contents = readFileSync(envPath, 'utf8');
  if (/^\s*(?:export\s+)?JWT_SECRET\s*=/m.test(contents)) {
    console.log('JWT_SECRET ja existe no backend/.env; valor preservado.');
  } else {
    appendFileSync(envPath, `${contents.endsWith('\n') ? '' : '\n'}${secretLine()}`, 'utf8');
    console.log('JWT_SECRET adicionado ao backend/.env sem alterar as outras configuracoes.');
  }
}
