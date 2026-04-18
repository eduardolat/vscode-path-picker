# Path Picker

Path Picker is a VS Code extension that helps you quickly pick a file or folder and copy its path to the clipboard.

## Features

- Pick a **file** and copy its path.
- Pick a **folder** and copy its path.
- Choose between:
  - **relative path** (to the workspace root)
  - **absolute path** (OS path)
- Add an optional prefix to copied paths (default: `@`).

## Commands

Use these command IDs in `keybindings.json` or other command integrations:

| Command Palette title                     | Command ID                  |
| ----------------------------------------- | --------------------------- |
| `Path Picker: Copy Path (File or Folder)` | `pathPicker.copyPath`       |
| `Path Picker: Copy File Path`             | `pathPicker.copyFilePath`   |
| `Path Picker: Copy Folder Path`           | `pathPicker.copyFolderPath` |

You can run these from the Command Palette and assign custom keyboard shortcuts.

## How to use

1. Open the Command Palette (`Cmd/Ctrl + Shift + P`).
2. Run one of the Path Picker commands.
3. Select a file or folder in the native picker.
4. The generated path is copied to your clipboard.

## Settings

Configure in VS Code Settings:

- `pathPicker.pathStyle`
  - `relative` (default)
  - `absolute`
- `pathPicker.prefix`
  - `@` (default)
  - any custom string (including empty)

## Examples

- `pathStyle=relative`, `prefix=@` -> `@src/features/login/index.js`
- `pathStyle=relative`, `prefix=` -> `src/features/login/index.js`
- `pathStyle=absolute`, `prefix=@` -> `@/home/user/project/src/features/login/index.js`

## Notes

- Settings are stored locally (`application` scope with `ignoreSync: true`).
- In remote workflows, configuration remains local to the client side.

## Changelog

Here are the latest versions from the changelog (up to 5). To see all versions, go to [CHANGELOG.md](https://github.com/eduardolat/vscode-path-picker/blob/main/CHANGELOG.md).

- `0.1.0` - 2026-04-18
  - Initial release of Path Picker for VS Code.
  - Added commands to pick and copy file or folder paths.
  - Added support for relative and absolute output path styles.
  - Added configurable path prefix with `@` as default.
  - Added local-only configuration behavior for remote workflows.
