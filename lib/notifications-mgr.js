'use babel';

export default class Notifications {
    errmodal (message, description) {
        atom.notifications.addError(message, {
            description,
            dismissable: true
        });
    }

    warnmodal (message, description) {
        atom.notifications.addWarning(message, {
            description,
            dismissable: true
        });
    }

    errfile () {
        const message = 'Failed to watch file';
        const description = 'It seems there are some errors in the `dw.json` file, or the file in the root of your project is missing. \n\n Reload Atomforce and try again.';

        this.errmodal(message, description);
    }

    errauth () {
        const message = 'Unauthorized';
        const description = 'Unable to establish a connection with the Sandbox. <br /> Make sure that `username` and `password` entered in the `dw.json` file are correct, or check your internet connection.';

        this.errmodal(message, description);
    }

    watchinfo () {
        const message = 'Status Bar';
        const description = 'It\'s necessary first enable the Status Bar to launch the filesystem watcher. \n Enable the Status Bar in the Atom menu in `Packages/Atomforce/Enable Status Bar` or type `shift alt A`';

        this.warnmodal(message, description);
    }
}
