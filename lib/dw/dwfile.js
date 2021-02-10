'use babel';

import fs from 'fs';
import path from 'path';

export default {
  exists(rpath, file) {
    return fs.existsSync(path.join(rpath, file));
  },
  parse(file) {
    let data;
    let parse = false;

    try {
      data = JSON.parse(String(fs.readFileSync(file)));
    } catch (err) {
      data = false;
    }

    if (data) {
      const props = ['hostname', 'username', 'password'].every((prop) =>
        Object.prototype.hasOwnProperty.call(data, prop)
      );

      if (props) {
        parse =
          Object.keys(data).some((key) => {
            return /^(code-)?(version)+$/g.test(key);
          }) &&
          Object.keys(data).every((key) =>
            typeof data[key] === 'string' && data[key].length > 0 && data.cartridges
              ? Array.isArray(data.cartridges)
              : true
          );
      }
    }

    return { data, parse };
  }
};
