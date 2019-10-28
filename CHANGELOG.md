### 0.8.0 - 2019-10-28

### Added

-   New _ui_ for `tab` area and new file component for `etch JSX DOM`.
-   New list for files Uploaded on WebDAV with a new icons to highlights the events triggered via filesystem watcher.
-   New mini actions, with Electron API for file list view, as "Show file size".
-   New activity status on status bar.
-   New badge for [`spectrum`](https://spectrum.chat) chat.

### Changed

-   Changed "Upload all cartridges" callback. Now when all the cartridges have been loaded, the filesystem watcher is kept active automatically, without re-enabling it later.
-   Updated most of `devDepencies` & `depencies` to the latest version.

### Fixed

-   Fixed a bug that allowed you to upload files and cartridges equally, even without hanging the status bar (if in the preferences of the package it is set to `false` for `Status Bar` setting).

### 0.7.4 - 2019-09-16

### Changed

-   Added new progress _ui_ indication for `Upload All Cartridges` task.
-   Added "Getting Started" section for contributing guidelines.
-   Updated `CODE_OF_CONDUCT.md` file with remark-lint.
-   Minor fixes on styles.

### 0.7.3 - 2019-08-26

### Changed

-   Changed `.eslintrc` file extension with the [recommended](https://eslint.org/docs/user-guide/configuring#configuration-file-formats) `json` format.
-   Added new `eslint plugin:react/recommended` for write correct `jsx` syntax.
-   Updated all `depencies` to the latest version.
-   Minor fixes on styles.

### 0.7.2 - 2019-04-07

### Changed

-   Changed "Upload All Cartridges" task with new queue function with `Array.prototype.reduce()`.
-   Changed the `atomforce.less` file with all styles to improve performance.
-   Updated all the `devDepencies` & `depencies` to the latest version.

### Fixed

-   Fixed editorconfig warnings.

### Removed

-   Removed `p-queue` as depencies.
-   Removed `log` option on filesystem events in package settings.

### Added

-   New `husky's` hook for parse all files before committing.

### 0.7.1 - 2019-03-18

### Changed

-   Updated all the `devDepencies` & `depencies` to the latest version.
-   Modified the `DWDAV` class without the lodash `_.extend` method and replaced with the default `Object.assign` javascript method

### Removed

-   Removed `lodash` as depencies.

## 0.7.0 - 2019-02-22

### Added

-   New tab for showing file and cartridges uploaded on WebDAV.

### Changed

-   Modified the folder tree and create folders for component types.
-   New code style with [prettier](https://github.com/prettier/prettier)

### Fixed

-   Fixed a watch state bug in the switcher label after authentication in WebDAV and starting the cartridges task.
-   Fixed a bug that did not allow the watcher filesystem to be properly enabled/disabled via the Atomforce menu command, after the WebDAV authorization failed.

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

-   Fixed a random Atom crash if you trying to quickly enable the filesystem watcher.

## 0.5.0 - 2018-12-24

### Added

-   New activation commands to enable or disable the watcher filesystem: `atomforce:watch`, `atomforce:disablewatch`.
-   New color management of the status bar.

## 0.4.0 - 2018-12-13

### Added

-   Added _put_ & _delete_ methods for upload file on WebDAV.
-   Added new `boolean` configuration that allows to display a `cosole.log` of all file events (addition, modification or deletion).
-   Now in the `dw.json` file in the `cartridges` key you can insert arrays or strings.
-   Added `root` option in `dw.json` file.

### 0.3.5 - 2018-12-09

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

-   Welcome **Atomforce**!
-   Atomforce can now intercept if the `dw.json` file exists in the project root, validate the file with the keys and values required for the connection and check if there is only one project connected.
