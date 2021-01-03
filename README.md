<p align="center">
    <img
        width="320px"
        src="https://raw.githubusercontent.com/matteobertoldo/atomforce/assets/logos/atomforce.svg?sanitize=true"
        alt="Atomforce"
    />
</p>

<p align="center">Unofficial <i>Salesforce &trade; Commerce Cloud</i> uploader &amp; manager for Atom.</p>

<p align="center">
    <a href="https://travis-ci.com/matteobertoldo/atomforce">
        <img
            src="https://travis-ci.com/matteobertoldo/atomforce.svg?branch=master"
            alt="Build Status"
        />
    </a>
    <a href="https://spectrum.chat/atomforce/general?tab=posts">
        <img
            src="https://withspectrum.github.io/badge/badge.svg"
            alt="Join the community on Spectrum"
        />
    </a>
    <a href="https://github.com/prettier/prettier">
        <img
            src="https://img.shields.io/badge/code_of-conduct-ff69b4.svg"
            alt="Prettier"
        />
    </a>
    <a href="https://atom.io/packages/atomforce">
        <img
            src="https://img.shields.io/apm/v/atomforce.svg"
            alt="Package Version"
        />
    </a>
</p>

---

## Intro

Atomforce is a package for [Atom](https://atom.io), that with a simple interface in the Atom Status Bar, helps you upload files and cartridges in your Sandbox via `WebDAV`.

## Installation

### Command Line

1.  Install the latest version of [Atom](https://atom.io)
2.  In the terminal, install the package via **apm**:

```sh
apm install atomforce
```

### GUI

1.  Install the latest version of [Atom](https://atom.io)
2.  Launch Atom
3.  Open Settings View using <kbd>Cmd+,</kbd> on macOS or <kbd>Ctrl+,</kbd> on other platforms
4.  Click the Install tab on the left side
5.  Enter `atomforce` in the search box and press <kbd>Enter</kbd>
6.  Click the "Install" button that appears

## Configuration

As required by the standard in the various `npm` Salesforce packages eg: ([`dwupload`](https://www.npmjs.com/package/dwupload#config-file) or [`sgmf-scripts`](https://www.npmjs.com/package/sgmf-scripts)), Atomforce also requires a file named `dw.json` in the `root` of the project, which is needed to enable connection to the **WebDAV**. <br /> In the following indexes you can find most of the examples to be able to upload your files and cartridges to Sandbox correctly.

### dw.json

In order to create a connection file to the WebDAV it is available with Atomforce, an integrated provider for the autocompletion of the correct properties. Create a new `dw.json` file in the root of your _SFCC_ project in order to auto-complete the file correctly.

![dw-json-schema](https://user-images.githubusercontent.com/15775323/80418605-fd76f800-88d7-11ea-8e8a-88fa64e861c8.gif)

However, it's possible to consult the attributes of the properties and the _mandatory_ fields for the right connection, here.

| Keyword                     | Mandatory |        Type         | Description                                                                                                                                                                                                                                                                       |
| --------------------------- | :-------: | :-----------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hostname`                  |  `true`   |      `string`       | The Hostname of your sandbox without the `https` protocol. The name must end before `/on/demandware.store/`.                                                                                                                                                                      |
| `username`                  |  `true`   |      `string`       | The username used to access on your Sandbox. The same value of the field that in "Sandbox Istance" is called `login`. In some sandboxes with the _SFRA_ architecture the username, corresponds to the username used in [`account.demandware.com`](https://account.demandware.com) |
| `password`                  |  `true`   |      `string`       | The password used to access on your Sandbox. In some sandboxes with the _SFRA_ architecture the password, corresponds to the password used in [`account.demandware.com`](https://account.demandware.com)                                                                          |
| `code-version` or `version` |  `true`   |      `string`       | The version of the code active in your Sandbox. You can check the version in `Administration > Site Development > Code Deployment`.                                                                                                                                               |
| `root`                      |  `false`  |      `string`       | Root option allows for path resolution of the file to upload _relative_ to a directory.                                                                                                                                                                                           |
| `cartridges`                |  `false`  | `string` or `array` | List of cartridges to be uploaded and viewed by the watcher filesystem.                                                                                                                                                                                                           |
| `p12`                       |  `false`  |      `string`       | The absolute path of `p12` file necessary for two-factor authentication. If `hostname` key contains `cert` initials, this key become **mandatory**.                                                                                                                               |
| `passphrase`                |  `false`  |      `string`       | The keyword necessary for two-factor authentication. If `p12` is set, `passphrase` become **mandatory**.                                                                                                                                                                          |

A final example of how the file should be structured. <br />

> _Remember to add the `dw.json` file in your `.gitignore` to avoid committing your Sandbox credentials!_.

```json
{
    "hostname": "dev01-eu01-sample.demandware.net",
    "username": "username",
    "password": "mypassword",
    "code-version": "version1"
}
```

### 2FA (Two-factor Authentication)

Atomforce supports **2FA** (Two-factor Authentication). <br /> The `p12` key can be added to the `dw.json` file, and the path of where the `p12` certificate file is allocated as the value. The `passphrase` key is also required, where the keyword required for authentication is indicated as the value.

```json
{
    "hostname": "cert.staging.eu01.sample.demandware.net",
    "username": "username",
    "password": "mypassword",
    "code-version": "version1",
    "p12": "absolutepath/to/certificate.p12",
    "passphrase": "keyword"
}
```

### Root

Root option allows for path resolution of the file to upload _relative_ to a directory on WebDAV. <br /> To better understand this option, suppose we have the following structure.

```
cartridges/
├── app_storefront_base/
├── plugin_ups/
├── plugin_wishlist/
└── README.md
```

In this structure in the WebDAV the `cartridges` folder will also be uploaded, to avoid this, just insert the initial path in the value of `root`, where the cartridges are allocated.

```json
{
    "hostname": "dev01-eu01-sample.demandware.net",
    "username": "username",
    "password": "mypassword",
    "code-version": "version1",
    "root": "cartridges"
}
```

If the value of `root` is: `.` the full path will be considered, so the `cartridges` folder will also be uploaded in the WebDAV. If the path of your cartridges is on several levels: `cartridges/src` just indicate the complete path. Final slash is not required.

### Cartridges List

The `cartridges` option allows you to stay in watch on one or more cartridges and upload these accordingly in WebDAV. If this option is not defined in the `dw.json` file, the watcher filesystem will listen all event (add, change and delete) to all files and folders in the project root or path indicated in the `root` option, and all files and folders will be uploaded.

```json
{
    "hostname": "dev01-eu01-sample.demandware.net",
    "username": "username",
    "password": "mypassword",
    "code-version": "version1",
    "root": "cartridges",
    "cartridges": ["app_storefront_base", "plugin_ups"]
}
```

The cartridges option can also be referred to as a string. Ex: `"cartridges": "app_storefront_base"`. <br /> In that case the watcher filesystem will listen in all the folders inside the `string` path defined in the `cartridges` key. Final slash is not required.

### Cartridges Definition

By default, if the value of the `cartridges` key is passed as `String` all the content (files and folders) of the path passed as a value will be uploaded to the WebDAV, **without** however creating the path starting from the defined string.

If you want to upload the entire path defined in the `cartridges` key, just pass the value as an `Array`.

## Additionals Packages

To improve the development workflow in Salesforce Commerce Cloud we recommend installing the `.isml` &amp; `.ds` syntax, snippets and autocompletion package.

-   [language-sfcc](https://github.com/matteobertoldo/language-sfcc)

<img
    width="160px"
    src="https://raw.githubusercontent.com/matteobertoldo/language-sfcc/assets/ui/atom-sfcc.svg?sanitize=true"
    alt="Atom SFCC"
/>

## Contributing

[![Known Vulnerabilities](https://snyk.io/test/github/matteobertoldo/atomforce/badge.svg?targetFile=package.json)](https://snyk.io/test/github/matteobertoldo/atomforce?targetFile=package.json)

### Prerequisites

1.  Latest version of [Atom](https://atom.io) installed.
2.  Recommended Installed Packages:
    -   [editorconfig](https://atom.io/packages/editorconfig)
    -   [prettier-atom](https://atom.io/packages/prettier-atom) (with `Format Files On Save` enabled)

### Getting Started

Before cloning the repository, make sure you have [node.js](https://nodejs.org) installed on your OS.

-   `git clone https://github.com/matteobertoldo/atomforce.git`
-   `cd atomforce`
-   `apm install`
-   `apm link`

### Contributing Details

Please read [CONTRIBUTING.md](https://github.com/matteobertoldo/atomforce/blob/master/CONTRIBUTING.md) for details on code of conduct, and the process for submitting pull requests.

## License

Atomforce is licensed under the MIT License - see the [LICENSE.md](https://github.com/matteobertoldo/atomforce/blob/master/LICENSE.md) file for details.
