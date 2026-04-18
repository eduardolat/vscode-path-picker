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

- `Path Picker: Copy Path (File or Folder)`
- `Path Picker: Copy File Path`
- `Path Picker: Copy Folder Path`

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

See [CHANGELOG.md](./CHANGELOG.md) for release history.
