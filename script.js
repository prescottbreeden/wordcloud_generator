(async () => {
  const fs = require('fs');
  const path = require('path')
  const exclude = require('./exclude');

  const generateString = async (path) => {
    try {
      console.log('reading file: ', path);
      const data = await fs.promises.readFile(path, 'utf-8');
      const res = JSON.stringify(data);
      const clean = res
        .replace(/_/g, " ")
        .replace(/\W/g, " ");
      const output = clean.split(' ')
        .map(x => x.toLowerCase())
        .filter(val => !!val)
        .filter(val => val.length > 2)
        .filter(val => !(/u00/).test(val))
        .filter(val => !(/^00\w+/).test(val))
        .filter(val => !(/\w+id$/).test(val))
        .filter(val => !(/params?\w+/).test(val))
        .filter(val => !(/upsert?\w+/).test(val))
        .filter(val => !(/base?\w+/).test(val))
        .filter(val => !(/validation?\w+/).test(val))
        .filter(val => !(/\w+offset/).test(val))
        .filter(val => !(/[0-9]+rem$/).test(val))
        .filter(val => !(/[0-9]+px/).test(val))
        .filter(val => !(/^get\w+/).test(val))
        .filter(val => !(/^set\w+/).test(val))
        .filter(val => !(/^is\w+/).test(val))
        .filter(val => !(/^sidenav\w+/).test(val))
        .filter(val => isNaN(val))
        .filter(val => !exclude.includes(val))
        .join(' ');
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
  await fs.promises.writeFile(__dirname + '/output.txt', result.join('')); 

})();

