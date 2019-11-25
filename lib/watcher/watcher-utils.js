'use babel';

import path from 'path';

export default {
    watchlist(props) {
        const cartridges = props.dwFileParse.data.cartridges;

        if (cartridges) {
            if (Array.isArray(cartridges)) {
                let arr = [];

                for (let i = 0; i < cartridges.length; i++) {
                    if (cartridges[i].length && cartridges[i].trim() !== '' && cartridges[i].trim() !== '.') {
                        arr.push(`${this.remoteroot(props)}/${cartridges[i]}`);
                    }
                }

                return arr.length > 0 ? arr : this.remoteroot(props);
            } else {
                return `${this.remoteroot(props)}/${cartridges}`;
            }
        } else {
            return this.remoteroot(props);
        }
    },
    remoteroot(props) {
        const dataroot = props.dwFileParse.data.root;

        if (dataroot) {
            return dataroot === '.' ? props.root : `${props.root}/${dataroot}`;
        } else {
            return props.root;
        }
    },
    relativize(p, props) {
        return path.relative(path.join(process.cwd(), props.root), p);
    }
};
