<h1>Atomforce</h1>

<p>
    <a href="https://atom.io/packages/atomforce">
        <img
            src="https://img.shields.io/apm/dm/atomforce.svg"
            alt="Plugin installs"
            style="max-width:100%;"
        />
    </a>
    <a href="https://david-dm.org/matteobertoldo/atomforce">
        <img
            src="https://david-dm.org/matteobertoldo/atomforce/status.svg"
            alt="dependencies Status"
            style="max-width:100%;"
        />
    </a>
    <a href="https://spectrum.chat/atomforce">
        <img
            src="https://withspectrum.github.io/badge/badge.svg"
            alt="Join the community on Spectrum"
            style="max-width:100%;"
        />
    </a>
    <a href="https://github.com/prettier/prettier">
        <img
            src="https://img.shields.io/badge/code_of-conduct-ff69b4.svg"
            alt="code of: conduct"
            style="max-width:100%;"
        />
    </a>
</p>

_Salesforce Commerce Cloud_ (ex Demandware) uploader for Atom. Upload your files and cartridges on SFCC via WebDAV. <br /> Atomforce is a package for [Atom](https://atom.io), that with a simple interface in the Status Bar, helps you upload files and cartridges in your Sandbox.

## Installation (Soon)

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

## dw.json File

Atomforce requires a file called `dw.json` in the `root` of your project, which is needed to connect to **WebDAV**. If it is not present, create one. The mandatory fields for the correct connection are shown below.

| Keyword      | Mandatory |        Type         | Description                                                                                                                         |
| ------------ | :-------: | :-----------------: | ----------------------------------------------------------------------------------------------------------------------------------- |
| `hostname`   |  `true`   |      `string`       | The Hostname of your sandbox without the `https` protocol. The name must end before `/on/demandware.store/`.                        |
| `username`   |  `true`   |      `string`       | The username used to access on your Sandbox. The same value of the field that in "Sandbox Istance" is called `login`.               |
| `password`   |  `true`   |      `string`       | The password used to access on your Sandbox.                                                                                        |
| `version`    |  `true`   |      `string`       | The version of the code active in your Sandbox. You can check the version in `Administration > Site Development > Code Deployment`. |
| `root`       |  `false`  |      `string`       | Root option allows for path resolution of the file to upload _relative_ to a directory.                                             |
| `cartridges` |  `false`  | `string` or `array` | List of cartridges to be uploaded and viewed by the watcher filesystem.                                                             |
| `p12`        |  `false`  |      `string`       | The path of `p12` file necessary for two-factor authentication.                                                                     |
| `passphrase` |  `false`  |      `string`       | The keyword necessary for two-factor authentication. If `p12` is set, `passphrase` become **mandatory**.                            |

A final example of how the file should be structured. <br />

> _Remember to add the `dw.json` file in your `.gitignore` to avoid committing your Sandbox credentials!_.

```json
{
    "hostname": "dev01-eu01-sample.demandware.net",
    "username": "username",
    "password": "mypassword",
    "version": "version1"
}
```

### 2FA (Two-factor Authentication)

Atomforce supports **2FA** (Two-factor Authentication). <br /> The `p12` key can be added to the `dw.json` file, and the path of where the `p12` certificate file is allocated as the value. The `passphrase` key is also required, where the keyword required for authentication is indicated as the value.

```json
{
    "hostname": "cert.staging.eu01.sample.demandware.net",
    "username": "username",
    "password": "mypassword",
    "version": "version1",
    "p12": "absolutepath/to/certificate.p12",
    "passphrase": "keyword"
}
```

The `p12` certificate can be built using:

```sh
openssl pkcs12 -export -in cert.staging.eu01.sample.demandware.net_01.crt -inkey cert.staging.eu01.sample.demandware.net_01.key -out certificate.p12
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
    "version": "version1",
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
    "version": "version1",
    "root": "cartridges",
    "cartridges": ["app_storefront_base", "plugin_ups"]
}
```

The cartridges option can also be referred to as a string. Ex: `"cartridges": "app_storefront_base"`. <br /> In that case the watcher filesystem will listen in all the folders inside the `string` path defined in the `cartridges` key. Final slash is not required.

### Cartridges Definition

By default, if the value of the `cartridges` key is passed as `String` all the content (files and folders) of the path passed as a value will be uploaded to the WebDAV, without however creating the path starting from the defined string.

If you want to upload the entire path defined in the `cartridges` key, just pass the value as an `Array`.

## Additionals Packages

To improve the development workflow in Salesforce Commerce Colud we recommend installing the `.isml` &amp; `.ds` syntax.

-   [language-demandware](https://atom.io/packages/language-demandware)

## Contributing

### Prerequisites

1.  Latest version of [Atom](https://atom.io) installed.
2.  Installed Packages:
    -   [atom-prettier](https://atom.io/packages/prettier-atom) with `ESLint` &amp; `Stylelint` integration enabled.
    -   [editorconfig](https://atom.io/packages/editorconfig)
    -   [linter](https://atom.io/packages/linter)
    -   [linter-eslint](https://atom.io/packages/linter-eslint)
    -   [linter-markdown](https://atom.io/packages/linter-markdown)
    -   [linter-stylelint](https://atom.io/packages/linter-stylelint)

### Getting Started

Before cloning the repository, make sure you have [node.js](https://nodejs.org) installed on your OS.

-   `cd ~/.atom/packages`
-   `git clone https://github.com/matteobertoldo/atomforce.git`
-   `cd atomforce`
-   `apm install`
-   `atom --dev`

### Contributing Details

Please read [CONTRIBUTING.md](https://github.com/matteobertoldo/atomforce/blob/master/CONTRIBUTING.md) for details on code of conduct, and the process for submitting pull requests.

## License

Atomforce is licensed under the MIT License - see the [LICENSE.md](https://github.com/matteobertoldo/atomforce/blob/master/LICENSE.md) file for details.
