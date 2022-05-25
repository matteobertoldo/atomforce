'use babel';

import fs from 'fs';
import path from 'path';
import globrex from 'globrex';
import request from 'request';

class DWDAV {
  constructor(config) {
    this.config = Object.assign(
      {
        hostname: 'localhost',
        username: 'admin',
        password: 'password',
        root: '.'
      },
      config
    );
  }

  getOpts() {
    const opts = {
      baseUrl: `https://${this.config.hostname}/on/demandware.servlet/webdav/Sites/Cartridges/${
        this.config.version || this.config['code-version']
      }`,
      uri: '/',
      auth: {
        user: this.config.username,
        password: this.config.password
      },
      strictSSL: false
    };

    if (this.config.p12 && this.config.hostname.indexOf('cert') === 0) {
      opts.strictSSL = true;
      opts.pfx = fs.readFileSync(this.config.p12);
      opts.passphrase = this.config.passphrase;
      opts.honorCipherOrder = true;
      opts.securityOptions = 'SSL_OP_NO_SSLv3';
      opts.secureProtocol = 'TLSv1_1_method';
      opts.checkServerIdentity = () => {};

      if (this.config['self-signed']) {
        opts.rejectUnauthorized = false;
      }
    }

    return opts;
  }

  auth() {
    return new Promise((resolve, reject) => {
      request(
        Object.assign(this.getOpts(), {
          method: 'GET'
        }),
        (err, res, body) => {
          if (err) {
            return reject(err);
          }

          if (res.statusCode >= 400) {
            return reject(new Error(res.statusMessage));
          }

          resolve(body);
        }
      );
    });
  }

  post(filePath, root) {
    if (!fs.existsSync(filePath)) {
      return Promise.reject(new Error(`${filePath} does not exist.`));
    }

    const rootFolder = path.join(process.cwd(), root || this.config.root);
    const remotePath = this.getRemoteRelativePath(filePath, rootFolder);

    return new Promise((resolve, reject) => {
      const req = request(
        Object.assign(this.getOpts(), {
          uri: `${remotePath}`,
          method: 'PUT'
        }),
        (err, res, body) => {
          if (err) {
            return reject(err);
          }

          if (res.statusCode >= 400) {
            return reject(new Error(res.statusMessage));
          }

          resolve(body);
        }
      );

      fs.createReadStream(filePath).pipe(req);
    });
  }

  unzip(filePath, root) {
    const rootFolder = path.join(process.cwd(), root || this.config.root);
    const uriPath = path.relative(rootFolder, filePath);

    return new Promise((resolve, reject) => {
      request(
        Object.assign(this.getOpts(), {
          uri: `/${uriPath}`,
          method: 'POST',
          form: {
            method: 'UNZIP'
          }
        }),
        (err, res, body) => {
          if (err) {
            return reject(err);
          }

          if (res.statusCode >= 400) {
            return reject(new Error(res.statusMessage));
          }

          resolve(body);
        }
      );
    });
  }

  async postAndUnzip(filePath, root) {
    return this.post(filePath, root).then(() => this.unzip(filePath, root));
  }

  delete(filePath, root) {
    const rootFolder = path.join(process.cwd(), root || this.config.root);
    const uriPath = path.relative(rootFolder, filePath);

    return new Promise((resolve, reject) => {
      request(
        Object.assign(this.getOpts(), {
          uri: `/${uriPath}`,
          method: 'DELETE'
        }),
        (err, res, body) => {
          if (err) {
            return reject(err);
          }

          if (res.statusCode >= 400 && res.statusCode !== 404) {
            return reject(new Error(res.statusMessage));
          }

          resolve(body);
        }
      );
    });
  }

  getRemoteRelativePath(path, root) {
    // globrex returns a regex with an ending $ which needs to be removed to match the root directory
    const rootPatternObj = globrex(root, { globstar: true });
    const rootPatternStr = rootPatternObj.regex.source;

    let rootPattern = '';
    if (rootPatternStr.endsWith('$')) {
      rootPattern = new RegExp(rootPatternStr.slice(0, -1));
    } else {
      rootPattern = new RegExp(rootPatternStr);
    }

    return path.replace(rootPattern, '');
  }
}

export default (config) => new DWDAV(config);
