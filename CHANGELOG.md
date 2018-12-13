## 0.1.0 - First Release
*   Welcome Atomforce!
*   Atomforce can now intercept if the `dw.json` file exists in the project root, validate the file with the keys and values required for the connection and check if there is only one project connected.

## 0.2.0 - Filesystem Watcher
*   Added filesystem watcher ([chokidar](https://github.com/paulmillr/chokidar)), which allows to intercept all the filesystem events needed to upload files to the WebDAV.
*   Added two configurations necessary for the file system
    -   **An ignored list array** configurable in the `Settings View`
    -   Ability to remain in watch or not in the **Symlinks** files and folders.
*   In future when [Atom Filesystem Watcher](https://github.com/atom/watcher) will be completely stable and the API will be similar to chokidar it will be possible enable events via Atom Filesystem Watcher. Currently chokidar creates a rebuid error in `macOS`.

## 0.3.0 - Authentication for Sandbox

*   Added authentication for the Sandbox (`DWDAV`) with return of the hostname in the status bar tooltip.
*   Modal addition of error in case of non authorization and disabling of events on files.

## 0.3.5 - Disable Watcher

*   Fixed a bug that created multiple filesystem watchers even if you tried to completely disable the package via settings view.
*   Now, if the filesystem watcher is initially activated and the user attempts to disable Atomforce, it is immediately closed and prevents the user from making changes to the files and consequently they are not uploaded to the Sandbox.

## 0.4.0 - Put/Delete on WebDAV

*   Added *put* & *delete* methods for upload file on WebDAV. Currently uploading file is reported as `console.log` in the Developer Tools.
*   Added new `boolean` configuration that allows to display a `cosole.log` of all file events (addition, modification or deletion).
*   Now in the `dw.json` file in the `cartridges` key you can insert arrays or strings.
*   Added `root` option in `dw.json` file.
