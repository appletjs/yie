import {basename, resolve, relative, dirname} from 'path';
import {createFilter} from 'rollup-pluginutils';
import fs from 'fs';
import buble from 'rollup-plugin-buble';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

const depends = new Map();
const resolvedJsxFiles = new Set();
const unlinks = new Set();
const tasks = [];

const external = [
  'preact',
  'preact-router',
  'preact-transition',
  'preact-utils',
  'yie',
];

const globals = {
  'preact': 'preact',
  'preact-router': 'preactRouter',
  'preact-transition': 'preactTransition',
  'preact-utils': 'preactUtils',
  'yie': 'yie',
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
  const isApp = name === 'App';
  const module = isApp ? 'App' : name;

  const dir = isApp ? 'docs' : 'docs/pages';
  const esm = `${dir}/${isApp ? 'app' : name}-esm.js`;
  const amd = `${dir}/${isApp ? 'app' : name}.js`;

  unlinks.add(esm);
  unlinks.add(esm + '.map');

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
        name: 'resolve-yie',
        load(id) {
          const start = resolve('src');
          if (!id.startsWith(start)) return null;
          const url = id.substr(start.length + 1);
          if (url.startsWith('shared')) return null;
          const name = url.split(/[\\\/]/)[0];
          return `import {${name}} from 'yie'; export default ${name};`;
        }
      },
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
    output: createOutputOptions(amd, /*isApp ? 'iife' : */'amd')
  });
}

const components = [];
fs.readdirSync('docs/src/pages').forEach(function (name) {
  const text = name.substring(4).replace(/\.jsx$/i, '');
  components.push({text, name: name.replace(/\.jsx$/i, '')});
  createComponentTask(basename(name, '.jsx'), resolve(`docs/src/pages/${name}`));
});

fs.writeFileSync(
  'docs/src/components.js',
  'export default ' + JSON.stringify(components, null, 2),
  'UTF8'
);

fs.writeFileSync(
  'docs/js/yie.js',
  `define('yie', function(require, exports, module) {
    ${fs.readFileSync('dist/yie-common.js', 'utf8')}
  });`
);

fs.copyFileSync(
  'dist/yie.css',
  `docs/yie.css`
);

createComponentTask('App', resolve('docs/src/App.jsx'));

process.on('exit', function () {
  unlinks.forEach(function (file) {
    fs.unlinkSync(file);
  });

  const src = resolve('docs/src/_.less');
  const codes = [];

  depends.forEach(function (value, input) {
    const lesses = depends.get(input);

    // 没有样式文件
    if (!lesses.size) return;

    [...value].reverse().forEach(function (file) {
      let path = relative(dirname(src), file).replace(/\\/g, '/');
      if (!path.startsWith('.')) path = `./${path}`;
      codes.push(`@import '${path}';`);
    });
  });

  fs.writeFileSync(
    resolve('docs.json'),
    JSON.stringify({
      'docs/app.css': {
        code: codes.join('\n'),
        src
      }
    }, null, 2)
  );
});

export default tasks;
