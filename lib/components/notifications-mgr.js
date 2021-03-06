'use babel';

export default class Notifications {
  autherr() {
    const message = 'Unauthorized';
    const description =
      "Unable to establish a connection with the Sandbox. <br /> Make sure that `username` and `password` entered in the `dw.json` file are correct, check if the `version` is active or present in Sandbox, it's status or your internet connection. \n \n If the problem persists, contact your Salesforce Administrator.";

    Notifications.modalerr(message, description);
  }

  cartridgeserr(report) {
    const message = 'Failed to upload cartridges';
    const description = `Attempting to upload cartridges failed with error: <code>${
      report.message.trim() === '' ? 'ETIMEDOUT' : report.message
    }</code>. \n \n Please try again in a few minutes or restart the task from the Atomforce menu in <code>Packages/Atomforce/Upload All Cartridges</code>.`;

    Notifications.modalerr(message, description);
  }

  cartridges(hostname) {
    const message = 'Successfully upload cartridges';
    const description = `Successfully upload all cartridges on: <code>${hostname}</code>.`;

    Notifications.modalinfo(message, description);
  }

  fileerr() {
    const message = 'Failed to watch files';
    const description =
      'It seems there are some errors in the `dw.json` file, or the file in the root of your project is missing. \n \n Reload Atomforce and try again.';

    Notifications.modalerr(message, description);
  }

  uploading() {
    const message = 'Uploading in progress';
    const description = 'Uploading cartridges in progress. Wait until the process is finished.';

    Notifications.modalwarn(message, description);
  }

  watchinfo() {
    const message = 'Atomforce Status Bar';
    const description =
      "It's necessary first enable the Status Bar to launch the filesystem watcher. \n Enable the Status Bar in the Atom menu in `Packages/Atomforce/Enable Status Bar`";

    Notifications.modalwarn(message, description);
  }

  statusbar() {
    const message = 'Atomforce Status Bar';
    const description =
      'The Status Bar is already activate! <br /> Click on the "cloud" icon in the status bar and follow the instructions on the tooltip.';

    Notifications.modalsuccess(message, description);
  }

  static modalerr(message, description) {
    atom.notifications.addError(message, {
      description,
      dismissable: true
    });
  }

  static modalinfo(message, description) {
    atom.notifications.addInfo(message, {
      description,
      dismissable: false
    });
  }

  static modalwarn(message, description) {
    atom.notifications.addWarning(message, {
      description,
      dismissable: false
    });
  }

  static modalsuccess(message, description) {
    atom.notifications.addSuccess(message, {
      description,
      dismissable: false
    });
  }
}
