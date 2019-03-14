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
            '**/specs/**'
        ],
        items: {
            type: 'string'
        },
        order: 1
    },
    followDots: {
        title: 'Follow dots file',
        description: 'Enable or disable filesystem events on dots file and paths.',
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
    statusBar: {
        title: 'Status Bar',
        description: 'Enable or disable Atomforce Status Bar on startup.',
        type: 'boolean',
        default: true,
        order: 4
    },
    log: {
        title: 'Log on events',
        description:
            'If `true`, the *log mode* will be enabled, so in the Developer Tools a `console.log` will appear when files are added, modified or deleted.',
        type: 'boolean',
        default: false,
        order: 5
    }
};
