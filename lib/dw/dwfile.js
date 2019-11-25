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
            const props = ['hostname', 'username', 'password'].every(prop => data.hasOwnProperty(prop));
            const watchlist = data.cartridges
                ? Array.isArray(data.cartridges) || typeof data.cartridges === 'string'
                : true;

            if (props) {
                parse =
                    Object.keys(data).some(k => {
                        return new RegExp(/^(code-)?(version)+$/g).test(k);
                    }) &&
                    Object.keys(data).every(k => (typeof data[k] === 'string' || watchlist) && data[k].length > 0);
            }
        }

        return { data, parse };
    }
};
