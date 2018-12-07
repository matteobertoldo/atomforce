# Atomforce

Salesforce Commerce Cloud (ex Demandware) uploader for Atom. Upload your files and cartridges on SFCC via WebDAV. <br />
Atomforce is a package for Atom that with a simple interface in the Status Bar that helps you upload files and cartridges in your Sandbox.

## Installation (Soon)

### Command Line

1.  Install the latest version of [Atom](https://atom.io)
2.  In the terminal, install the package via **apm**:

```sh
apm install atomforce
```

### GUI

1.  Install the latest version of [Atom](https://atom.io)
1.  Launch Atom
1.  Open Settings View using <kbd>Cmd+,</kbd> on macOS or <kbd>Ctrl+,</kbd> on other platforms
1.  Click the Install tab on the left side
1.  Enter `atomforce` in the search box and press <kbd>Enter</kbd>
1.  Click the "Install" button that appears

## DW File

Atomforce requires a file called `dw.json` in the `root` of your project, which is needed to connect to **WebDAV**. If it is not present, create one. The mandatory fields for the correct connection are shown below.

| Keyword  | Mandatory | Type | Description |
|----------|:---------:|:----:|-------------|
| `hostname` | `true` | `string` | The Hostname of your sandbox without the `https` protocol. The name must end before `/on/demandware.store/`. |
| `username` | `true` | `string` | The username used to access on your Sandbox. The same value of the field that in "Sandbox Istance" is called `login`. |
| `password` | `true` | `string` | The password used to access on your Sandbox. |
| `version` | `true` | `string` | The version of the code active in your Sandbox. You can check the version in `Administration > Site Development > Code Deployment`. |
| `root` | `false` | `string` | Root option allows for path resolution of the file to upload *relative* to a directory. |
| `p12` | `false` | `string` | The path of `p12` file necessary for two-factor authentication. |
| `passphrase` | `true` <br /> (if `p12` is set)  | `string` | The keyword necessary for two-factor authentication. |

A final example of how the file should be structured. **Important note**: remember to ignore the file in your `.gitignore` to avoid committing your Sandbox credentials!.

```json
{
    "hostname": "dev01-eu01-sample.demandware.net",
    "username": "username",
    "password": "mypassword",
    "version": "version1"
}
```

### 2FA (Two-factor Authentication)

Atomforce supports **2FA** (Two-factor Authentication). <br />
The `p12` key can be added to the `dw.json` file and the absolute path of where the `p12file` is allocated as the value. The `passphrase` key is also required, where the keyword required for authentication is indicated as the value.

```json
{
    "hostname": "dev01-eu01-sample.demandware.net",
    "username": "username",
    "password": "mypassword",
    "version": "version1",
    "p12": "path/to/file.p12",
    "passphrase": "keyword"
}
```

## Additionals Packages

To improve the development workflow in Salesforce Commerce Colud we recommend installing the `ISML` syntax.

-   [language-demandware](https://atom.io/packages/language-demandware)

## Contributing

Please read [CONTRIBUTING.md](https://github.com/matteobertoldo/atomforce/blob/master/CONTRIBUTING.md) for details on code of conduct, and the process for submitting pull requests.

## License

Atomforce is licensed under the MIT License - see the [LICENSE.md](https://github.com/matteobertoldo/atomforce/blob/master/LICENSE.md) file for details.