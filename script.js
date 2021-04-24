(async () => {
  const fs = require('fs');
  const path = require('path')

  const generateString = async (path) => {
    try {
      console.log('reading file: ', path);
      const data = await fs.promises.readFile(path, 'utf-8');
      const res = JSON.stringify(data);
      const clean = res
        .trim()
        .replace(/\W/g, " ")
        .replace(/\sn\s/g, " ")
      const exclude = [
        'action',
        'application',
        'connect',
        'mapstatetoprops',
        'act',
        'background',
        'boolean',
        'catch',
        'classname',
        'color',
        'common',
        'component',
        'components',
        'const',
        'constants',
        'credits__input',
        'current',
        'date',
        'default',
        'div',
        'expect',
        'export',
        'false',
        'fetch',
        'flex',
        'flexgroup',
        'flexrow',
        'font',
        'fragment',
        'from',
        'h1',
        'h2',
        'h3',
        'id',
        'im',
        'import',
        'json',
        'label',
        'n',
        'nclass',
        'nconst',
        'new',
        'nexport',
        'nfunction',
        'nimport',
        'nlet',
        'ntype',
        'null',
        'number',
        'onchange',
        'p',
        'fc',
        'err',
        'param',
        'display: flex',
        'paper',
        'testrunner',
        'parse',
        'react',
        'recordselector',
        'redux',
        'renderdata',
        'result',
        'result',
        'return',
        'returns',
        'size',
        'state',
        'string',
        'stringify',
        't',
        'tobe',
        'tobe',
        'tojson',
        'true',
        'u',
        'undefined',
        'unknown',
        'url',
        'useeffect',
        'usestate',
        'value',
        'w',
        'will',
      ];
      const output = clean.split(' ')
        .map(x => x.toLowerCase())
        .filter(val => !!val && !exclude.includes(val))
        .join(',');
      return output;
    }
    catch (e) {
      console.error('failed at ' + path)
    }
  }
  const readDir = async(path) => {
    try {
      console.log('reading dir: ', path);
      const bob = await fs.promises.readdir(path);
      let res = [];
      for (const p of bob) {
        if (p.includes('.')) {
          const o = await generateString(path + '/' + p);
          res = [...res, o];
        } else {
          const o = await readDir(path + '/' + p);
          res = [...res, o]
        }
      }
      return res;
    }
    catch {
      console.error('dir failed at', path);
    }

  }

  const start = path.join(__dirname, 'src');
  const result = await(readDir(start));
  await fs.promises.writeFile(__dirname + '/output.csv', result.join('')); 

})();

