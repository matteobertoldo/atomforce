# Atomforce

Salesforce Commerce Cloud uploader for Atom. Upload your files and cartridges on SFCC via WebDAV.

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

### DW File

Atomforce requires a file called `dw.json` in the `root` of your project, which is needed to connect to **WebDAV**. If it is not present, create one. The mandatory fields for the correct connection are shown below.

| Keyword  | Mandatory | Type | Description |
|----------|:---------:|:----:|-------------|
| `hostname` | `true` | `string` | The Hostname of your sandbox without the `https` protocol. The name must end before `/on/demandware.store/` |
| `username` | `true` | `string` | The username used to access on your Sandbox. The same value of the field that in "Sandbox Istance" is called `login` |
| `password` | `true` | `string` | The password used to access on your Sandbox. |
| `version` | `true` | `string` | The version of the code active in your Sandbox. You can check the version in `Administration > Site Development > Code Deployment` |
| `root` | `false` | `string` | The entry point to view files and cartridges to upload |

A final example of how the file should be structured. **Important note**: remember to ignore the file in your `.gitignore` to avoid committing your Sandbox credentials!.

```json
{
    "hostname": "dev01-eu01-sample.demandware.net",
    "username": "username",
    "password": "mypassword",
    "version": "version1"
}
```

## License

Atomforce is licensed under the MIT License - see the [LICENSE.md](https://github.com/matteobertoldo/atomforce/blob/master/LICENSE.md) file for details.
