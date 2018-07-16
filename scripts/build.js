import {extname, relative, resolve, dirname} from 'path';
import {createFilter} from 'rollup-pluginutils';
import fs from 'fs';
import buble from 'rollup-plugin-buble';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

const depends = new Map();
const resolvedJsxFiles = new Set();
const inputMap = Object.create(null);
const cmds = [];
const tasks = [];

const external = [
  'preact',
  'preact-router',
  'preact-transition',
  'preact-utils',
];

const globals = {
  'preact': 'preact',
  'preact-router': 'preactRouter',
  'preact-transition': 'preactTransition',
  'preact-utils': 'preactUtils',
};

const filter = createFilter([
  '**/*.less',
  '**/*.css'
], 'node_modules/**');

function resolveId(importee, importer) {
  // ignore IDs with null character, these belong to other plugins
  if (/\0/.test(importee)) return null;
  // disregard entry module
  if (!importer) return null;

  const parts = importee.split(/[/\\]/);
  let id = parts.shift();

  if (id[0] === '@' && parts.length) {
    // scoped packages
    id += `/${parts.shift()}`;
  } else if (id[0] === '.') {
    // an import relative to the parent dir of the importer
    id = resolve(importer, '..', importee);
  }

  return id;
}

function createComponentTask(name, input) {
  const isYie = name === 'yie';
  const module = isYie ? 'yie' : `yie${name}`;
  const dirname = isYie ? 'yie-' : `${name}/`;

  const esm = `dist/${dirname}esm.js`;
  const cjs = `dist/${dirname}common.js`;
  const umd = `dist/${dirname}umd.js`;
  const cmd = `dist/${dirname}cmd.js`;

  cmds.push({
    cjs,
    cmd
  });

  inputMap[input] = {
    name,
    dir: 'dist/' + dirname
  };

  const dep = new Set();
  depends.set(input, dep);

  function createOutputOptions(file, format) {
    return {
      file,
      format,
      sourcemap: true,
      name: module,
      globals
    };
  }

  tasks.push({
    input,
    external,
    plugins: [
      {
        name: 'resolve-jsx',
        resolveId(importee, importer) {
          const id = resolveId(importee, importer);
          return (id && resolvedJsxFiles.has(id)) ? id + '.jsx' : null;
        }
      },
      {
        name: 'resolve-less',
        resolveId(importee, importer) {
          const id = resolveId(importee, importer);
          if (!id || !filter(id)) return null;
          dep.add(id);
          return id;
        },
        transform(code, id) {
          if (!filter(id)) return;
          return {code: '', map: {mapping: ''}};
        }
      },
      nodeResolve({extensions: ['.js', '.jsx']}),
      babel({exclude: 'node_modules/**'}),
      buble()
    ],
    output: {
      ...createOutputOptions(esm, 'esm'),
      banner: `import {h as jsx} from 'preact';`
    },
  });

  tasks.push({
    input: esm,
    external,
    output: createOutputOptions(cjs, 'cjs'),
  });

  tasks.push({
    input: esm,
    external,
    output: createOutputOptions(umd, 'umd'),
  });
}

const sources = [];
fs.readdirSync('src').forEach(function (name) {
  if (extname(name) || name === 'shared' || name === 'docs') return;
  if (!fs.existsSync(`src/${name}/index.js`)) return;
  if (!fs.existsSync(`src/${name}/${name}.jsx`)) return;
  sources.push(`export {default as ${name}} from './${name}';`);
  resolvedJsxFiles.add(resolve(`src/${name}/${name}`));
  createComponentTask(name, resolve(`src/${name}/index.js`));
});

const source = sources.join('\n');
fs.writeFileSync('src/index.js', source, 'UTF-8');
fs.writeFileSync('src/index.d.ts', source, 'UTF-8');
createComponentTask('yie', resolve('src/index.js'));

process.on('exit', function () {
  cmds.forEach(function ({cjs, cmd}) {
    let code = fs.readFileSync(cjs, 'utf8');
    const parts = code.split('//# sourceMappingURL=');
    const end = parts.pop();
    code = `define(function(require, exports, module) {${parts.join('//# sourceMappingURL=')}});//# sourceMappingURL=` + end;
    fs.writeFileSync(cmd, code);
  });

  const styles = {};

  depends.forEach(function (value, input) {
    const {name, dir} = inputMap[input];
    const dest = resolve(dir + 'style.css');
    const src = resolve('src/' + name + '.less');
    const codes = [];

    [...value].reverse().forEach(function (file) {
      let path = relative(dirname(src), file).replace(/\\/g, '/');
      if (!path.startsWith('.')) path = `./${path}`;
      codes.push(`@import '${path}';`);
    });

    let key = 'dist' + dest.split('dist', 2).pop();
    styles[key] = {
      code: codes.join('\n'),
      src
    };
  });

  fs.writeFileSync(
    resolve('temp.json'),
    JSON.stringify(styles, null, 2)
  );
});

export default tasks;
