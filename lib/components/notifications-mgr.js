'use babel';

export default class Notifications {
    modalerr (message, description) {
        atom.notifications.addError(message, {
            description,
            dismissable: true
        });
    }

    modalinfo (message, description) {
        atom.notifications.addInfo(message, {
            description,
            dismissable: false
        });
    }

    modalwarn (message, description) {
        atom.notifications.addWarning(message, {
            description,
            dismissable: false
        });
    }

    autherr () {
        const message = 'Unauthorized';
        const description = 'Unable to establish a connection with the Sandbox. <br /> Make sure that `username` and `password` entered in the `dw.json` file are correct, or check your internet connection.';

        this.modalerr(message, description);
    }

    cartridgeserr (report) {
        const message = 'Failed to upload cartridges';
        const description = `Attempting to upload cartridges failed with error: <code>${report.message}</code>. \n \n Please try again in a few minutes or restart the task from the Atomforce menu in <code>Packages/Atomforce/Upload All Cartridges</code>.`;

        this.modalerr(message, description);
    }

    cartridges (hostname) {
        const message = 'Successfully upload cartridges';
        const description = `Successfully upload all cartridges on: <code>${hostname}</code>.`;

        this.modalinfo(message, description);
    }

    fileerr () {
        const message = 'Failed to watch file';
        const description = 'It seems there are some errors in the `dw.json` file, or the file in the root of your project is missing. \n\n Reload Atomforce and try again.';

        this.modalerr(message, description);
    }

    uploading () {
        const message = 'Uploading in progress';
        const description = 'Uploading cartridges in progress. Wait until the process is finished.';

        this.modalwarn(message, description);
    }

    watchinfo () {
        const message = 'Status Bar';
        const description = 'It\'s necessary first enable the Status Bar to launch the filesystem watcher. \n Enable the Status Bar in the Atom menu in `Packages/Atomforce/Enable Status Bar` or type `shift alt A`';

        this.modalwarn(message, description);
    }
}
