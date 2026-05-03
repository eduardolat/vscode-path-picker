# Path Picker

Path Picker is a VS Code extension that lets you fuzzy-search any file or folder in your workspace and copy its path to the clipboard.

## Features

- Fuzzy-search **files and folders** together in a single quick pick
- Respects `.gitignore`, `files.exclude`, and `search.exclude`
- Choose between **relative path** (to workspace root) or **absolute path**
- Add an optional prefix to copied paths (default: `@`)

## Command

| Command Palette title                      | Command ID            |
| ------------------------------------------ | --------------------- |
| `Path Picker: Copy Path (Files & Folders)` | `pathPicker.copyPath` |

Run it from the Command Palette (`Cmd/Ctrl + Shift + P`) or assign a custom keyboard shortcut.

## How to use

1. Open the Command Palette (`Cmd/Ctrl + Shift + P`).
2. Run `Path Picker: Copy Path (Files & Folders)`.
3. Typing filters files and folders as you type.
4. Select an item. The path is copied to your clipboard.

## Settings

| Setting                | Values                  | Default    |
| ---------------------- | ----------------------- | ---------- |
| `pathPicker.pathStyle` | `relative` / `absolute` | `relative` |
| `pathPicker.prefix`    | any string              | `@`        |

## Examples

| pathStyle | prefix | Copied text                                       |
| --------- | ------ | ------------------------------------------------- |
| relative  | `@`    | `@src/features/login/index.js`                    |
| relative  | ``     | `src/features/login/index.js`                     |
| absolute  | `@`    | `@/home/user/project/src/features/login/index.js` |

## Notes

- Settings are stored locally (`application` scope with `ignoreSync: true`).
- In remote workflows, configuration remains local to the client side.

## Changelog

Here are the latest versions from the changelog (up to 5). To see all versions, go to [CHANGELOG.md](https://github.com/eduardolat/vscode-path-picker/blob/main/CHANGELOG.md).

- 0.1.0 - 2026-05-03
  - Initial release of Path Picker for VS Code.
  - Added command to pick and copy file or folder paths.
  - Added support for relative and absolute output path styles.
  - Added configurable path prefix with `@` as default.
  - Added local-only configuration behavior for remote workflows.
