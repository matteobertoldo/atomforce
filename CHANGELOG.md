## 0.1.0 - First Release
*   Welcome Atomforce!
*   Atomforce can now intercept if the `dw.json` file exists in the project root, validate the file with the keys and values required for the connection and check if there is only one project connected.

## 0.2.0 - Filesystem Watcher
*   Added filesystem watcher ([chokidar](https://github.com/paulmillr/chokidar)), which allows to intercept all the filesystem events needed to upload files to the WebDAV.
*   Added two configurations necessary for the file system
    -   **An ignored list array** configurable in the `Settings View`
    -   Ability to remain in watch or not in the **Symlinks** files and folders.
*   In future when [Atom Filesystem Watcher](https://github.com/atom/watcher) will be completely stable and the API will be similar to chokidar it will be possible enable events via Atom Filesystem Watcher. Currently chokidar creates a rebuid error in `macOS`.
