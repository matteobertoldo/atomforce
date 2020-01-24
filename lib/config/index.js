'use babel';

export default {
    statusBar: {
        title: 'Status Bar',
        description: 'Enable or disable Atomforce Status Bar on startup. (Need to restart Atom)',
        type: 'boolean',
        default: true,
        order: 1
    },
    filesInTab: {
        title: 'Maxium files show on tab',
        description:
            'Choose from the following values, the maximum display in the tab of the files uploaded to the WedDAV.',
        type: 'integer',
        default: 30,
        enum: [
            { value: 30, description: '30 files' },
            { value: 50, description: '50 files' },
            { value: 80, description: '80 files' }
        ],
        order: 2
    },
    watcherOptions: {
        title: 'Filesystem Watcher',
        description:
            "Changes to the following options take effect each time the `Enable Watch Files` task is executed. \n \n Restarting Atom it's not necessary.",
        type: 'object',
        order: 3,
        properties: {
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
                }
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
            }
        }
    },
    cartridgesOptions: {
        title: 'Cartridges Task',
        description:
            "Changes to the following options take effect each time the `Upload All Cartridges` task is executed. \n \n Restarting Atom it's not necessary.",
        type: 'object',
        order: 4,
        properties: {
            cleanWebDAV: {
                title: 'Clean WebDAV',
                description:
                    'Enable or disable the ability to remotely delete the removal of files and cartridges in the WebDAV. If this option is disabled, the files will be **merged** remotely and not **replaced** with the new ones. It is highly recommended to enable this option in `staging` or `production` environments.',
                type: 'boolean',
                default: true,
                order: 1
            },
            showProgressPercentage: {
                title: 'Progress percentage',
                description: 'Show progress percentage on Status Bar.',
                type: 'boolean',
                default: false,
                order: 2
            }
        }
    }
};
