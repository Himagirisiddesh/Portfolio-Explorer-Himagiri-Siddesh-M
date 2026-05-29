const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outPath = path.join(root, 'himagiri-portfolio.zip');

if (fs.existsSync(outPath)) fs.unlinkSync(outPath);

const output = fs.createWriteStream(outPath);
const archive = archiver('zip', { zlib: { level: 6 } });

output.on('close', () => {
  const mb = (archive.pointer() / 1024 / 1024).toFixed(1);
  console.log('Done: ' + mb + ' MB → himagiri-portfolio.zip');
});
archive.on('error', (err) => { throw err; });
archive.pipe(output);

archive.glob('**/*', {
  cwd: root,
  ignore: [
    '**/node_modules/**',
    '**/.git/**',
    '**/dist/**',
    '**/.turbo/**',
    '**/.local/**',
    '**/attached_assets/**',
    '**/*.tsbuildinfo',
    '**/*.tar.gz',
    '**/*.zip',
    'scripts/make-zip.cjs',
  ],
  dot: true,
});

archive.finalize();
