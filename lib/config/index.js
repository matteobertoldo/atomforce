'use babel';

export default {
    ignoredList: {
        title: 'Ignored watch list',
        description:
            'Array list of global paths to be ignored when enabling the filesystem watcher. \n \n The use of the absolute path is highly recommended ex. `**/path/to/files/**`',
        type: 'array',
        default: [
            '**/dw.json',
            '**/package-lock.json',
            '**/node_modules/**',
            '**/client/**',
            '**/test/**',
            '**/tests/**',
            '**/spec/**'
        ],
        items: {
            type: 'string'
        },
        order: 1
    },
    followDots: {
        title: 'Follow hidden files and paths',
        description: 'Enable or disable filesystem events on `.dot` files and paths.',
        type: 'boolean',
        default: false,
        order: 2
    },
    followSymlinks: {
        title: 'Follow symlinks paths',
        description: 'Enable or disable filesystem events on symlinks paths.',
        type: 'boolean',
        default: true,
        order: 3
    },
    showProgressPercentage: {
        title: 'Progress percentage',
        description: 'Show progress percentage on Status Bar when `Upload All Cartridges` task is triggered.',
        type: 'boolean',
        default: false,
        order: 4
    },
    statusBar: {
        title: 'Status Bar',
        description: 'Enable or disable Atomforce Status Bar on startup. (Need to restart Atom)',
        type: 'boolean',
        default: true,
        order: 5
    }
};
