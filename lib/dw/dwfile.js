'use babel';

import fs from 'fs';
import path from 'path';

export default {
    exists (rpath, file) {
        return fs.existsSync(path.join(rpath, file));
    },
    parse (file) {
        let data;
        let parse = false;

        try {
            data = JSON.parse(String(fs.readFileSync(file)));
        } catch (err) {
            data = false;
        }

        if (data) {
            const props = ['hostname', 'username', 'password', 'version'].every(prop => data.hasOwnProperty(prop));

            if (props) {
                const watchlist = data.cartridges
                    ? Array.isArray(data.cartridges) || typeof data.cartridges === 'string'
                    : true;
                parse = Object.keys(data).every(
                    prop => (typeof data[prop] === 'string' || watchlist) && data[prop].length > 0
                );
            }
        }

        return { data, parse };
    }
};