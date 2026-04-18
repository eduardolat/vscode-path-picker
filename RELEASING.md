# Releasing Path Picker (VS Code)

This guide is intentionally simple and linear.
Follow each step in order.

## Release scripts

- `npm run build` -> builds production extension output into `dist/`
- `npm run package:ls` -> shows which files will be included in the VSIX
- `npm run package` -> builds and creates `vscode-path-picker-X.Y.Z.vsix`

## 1) Prepare the release

1. Make sure you are on the correct branch and everything is up to date.
2. Install dependencies:

   ```bash
   npm ci
   ```

3. Run quality checks:

   ```bash
   npm run ci
   ```

## 2) Update version and docs

1. Update `version` in `package.json` (SemVer, no `v` prefix).
2. Add a new top section in `CHANGELOG.md` for the new version.
3. Update `README.md` if user-facing behavior changed.
4. Commit these changes.

Recommended commit message:

```text
chore(release): prepare vX.Y.Z
```

## 3) Build and package

1. (Optional but recommended) inspect package contents before packaging:

   ```bash
   npm run package:ls
   ```

2. Build and package:

   ```bash
   npm run package
   ```

3. Verify the artifact exists in the repository root:

- `vscode-path-picker-X.Y.Z.vsix`

## 4) Create GitHub tag and release

1. Create and push a git tag using this format:

```text
vX.Y.Z
```

2. Create a new GitHub Release.
3. Use title:

```text
Path Picker vX.Y.Z
```

4. Paste release notes using the template below.
5. Upload `vscode-path-picker-X.Y.Z.vsix` as a release asset.
6. Publish the release.

### GitHub release notes template

```markdown
## vX.Y.Z - YYYY-MM-DD

- Change 1
- Change 2
- Change 3

**Full Changelog**: https://github.com/eduardolat/vscode-path-picker/compare/vPREVIOUS...vX.Y.Z
```

## 5) Publish the extension

### Visual Studio Marketplace

1. Open https://marketplace.visualstudio.com/manage
2. Go to your publisher account.
3. Select `Path Picker`.
4. Click **Update**.
5. Upload `vscode-path-picker-X.Y.Z.vsix`.
6. Wait for validation and propagation.

### Open VSX (optional)

1. Open https://open-vsx.org/user-settings/extensions
2. Publish a new version using the same VSIX file.

## 6) Post-release checklist

1. Confirm the new version is visible on the marketplace listing.
2. Install/update in a clean VS Code profile.
3. Run smoke test for commands:
   - `pathPicker.copyPath`
   - `pathPicker.copyFilePath`
   - `pathPicker.copyFolderPath`
4. Verify settings still behave correctly:
   - `pathPicker.pathStyle`
   - `pathPicker.prefix`

Release complete.
