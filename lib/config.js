'use babel';

export default {
    ignoredList: {
        title: 'Ignored watch list',
        description: 'Array list of global paths to be ignored when enabling the watch state. \n \n The use of the absolute path is highly recommended ex. `**/path/to/files/**`',
        type: 'array',
        default: [
            '**/.git/**',
            '**/.gitignore',
            '**/.editorconfig',
            '**/.project',
            '**/.tern-project',
            '**/.DS_Store',
            '**/package.json',
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
    followSymlinks: {
        title: 'Follow symlinks paths',
        description: 'Enable or disable the watch state on symlinks paths.',
        type: 'boolean',
        default: true,
        order: 2
    },
    statusBar: {
        title: 'Status Bar',
        description: 'Enable or disable Atomforce Status Bar on startup.',
        type: 'boolean',
        default: true,
        order: 3
    },
    log: {
        title: 'Log on events',
        description: 'If `true`, the *log mode* will be enabled, so in the Developer Tools a `console.log` will appear when files are added, modified or deleted.',
        type: 'boolean',
        default: false,
        order: 4
    }
};
