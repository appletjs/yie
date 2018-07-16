const {resolve} = require('path');
const mkdir = require('mkdirp').sync;
const less = require('less');
const Prefix = require('less-plugin-autoprefix');
const fs = require('fs');

let json = process.argv[2];

if (json && (fs.existsSync(json = resolve(json)))) {
  try {
    const code = fs.readFileSync(json, 'utf8');
    const files = JSON.parse(code);
    const tasks = Object.keys(files).map(id => runTask(id, files[id]));
    Promise.all(tasks).then(done).catch(error);
  } catch (e) {
    console.log(e);
  }
} else {
  json = null;
}

function bold(msg) {
  return '\x1B[1m' + msg + '\x1B[22m';
}

function blue(msg) {
  return '\x1B[34m' + msg + '\x1B[39m';
}

function runTask(output, {code, src}) {
  if (!code.trim().length) {
    return Promise.resolve();
  }

  const now = Date.now();

  if (output.endsWith('yie-style.css')) {
    output = './dist/yie.css';
  }

  // const output = filename.replace(/\.less$/, '.css');
  return less.render(code, {
    filename: resolve(src),
    sourceMap: {},
    plugins: [
      new Prefix({
        browsers: ['last 2 versions']
      })
    ]
  }).then(function ({css, map}) {
    css && fs.writeFileSync(output, css, 'utf8');
    map && fs.writeFileSync(output + '.map', map, 'utf8');
    console.log(blue('created'), bold(output), 'in', bold(Date.now() - now + 'ms'));
  }).catch(error);
}

function done() {
  json && fs.unlinkSync(json);
}

function error(err) {
  done();
  process.emitWarning(err);
  process.exit();
}
