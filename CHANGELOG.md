## 0.6.0 - 2019-02-19
### Added
-   New command "Upload All Cartridges" on menu.
-   New popover info for "Cartridges" mode.
-   New stream `zip` interface task.
-   New "Follow Dots" option on package settings.
-   Added a new utilities for the filesystem watcher.

### Changed
-   New changelog format from [keep-a-changelog](https://github.com/olivierlacan/keep-a-changelog).
-   Filter and updated some values on **ignored list array**.
-   Changed the checked status in the Atomforce status bar to `false`, when user failed the authentication on WebDAV.

### Fixed
-   Fixed a random Atom crash if you trying to quickly enable the file system watcher.

## 0.5.0 - 2018-12-24
### Added
-   New activation commands to enable or disable the watcher filesystem: `atomforce:watch`, `atomforce:disablewatch`.
-   New color management of the status bar.

## 0.4.0 - 2018-12-13
### Added
-   Added *put* & *delete* methods for upload file on WebDAV.
-   Added new `boolean` configuration that allows to display a `cosole.log` of all file events (addition, modification or deletion).
-   Now in the `dw.json` file in the `cartridges` key you can insert arrays or strings.
-   Added `root` option in `dw.json` file.

## 0.3.5 - 2018-12-09
### Fixed
-   Fixed a bug that created multiple filesystem watchers even if you tried to completely disable the package via `Settings View`.

## 0.3.0 - 2018-12-07
### Added
-   Added authentication for the Sandbox (`DWDAV`) with return of the hostname in the status bar tooltip.
-   Modal addition of error in case of non authorization and disabling of events on files.

## 0.2.0 - 2018-12-03
### Added
-   Added filesystem watcher ([chokidar](https://github.com/paulmillr/chokidar)).
-   Added **an ignored list array** configurable in the `Settings View`.
-   Ability to remain in watch or not in the **symlinks** files and folders.

### Know Issue
-   Currently `chokidar` creates a rebuid error in `macOS`.

## 0.1.0 - 2018-11-22
### Added
-   Welcome Atomforce!
-   Atomforce can now intercept if the `dw.json` file exists in the project root, validate the file with the keys and values required for the connection and check if there is only one project connected.
