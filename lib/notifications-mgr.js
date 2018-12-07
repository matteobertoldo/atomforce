'use babel';

export default class Notifications {
    errmodal (message, description) {
        atom.notifications.addError(message, {
            description,
            dismissable: true
        });
    }

    errfile () {
        const message = 'Failed to watch file';
        const description = 'It seems there are some errors in the <code>dw.json</code> file, or the file in the root of your project is missing. \n\n Reload Atomforce and try again.';

        this.errmodal(message, description);
    }

    errauth () {
        const message = 'Unauthorized';
        const description = 'Unable to establish a connection with the Sandbox. <br /> Make sure that <code>username</code> and <code>password</code> entered in the <code>dw.json</code> file are correct.';

        this.errmodal(message, description);
    }
}
