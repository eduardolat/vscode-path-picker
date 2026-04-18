# Path Picker VS Code Extension Release Instructions

This document defines the manual release process for the Path Picker VS Code extension.

## Prerequisites

- Ensure you are in the repository root.
- Ensure you have permission to publish on:
  - Visual Studio Marketplace publisher account
  - Open VSX account (if publishing there)
- Ensure your local branch is up to date and CI is passing.

---

## Phase 1: Versioning and Documentation

1. **Update version**
   - Edit `package.json`.
   - Bump `version` using Semantic Versioning (`MAJOR.MINOR.PATCH`).
   - Do not use a `v` prefix in `package.json`.

2. **Update changelog**
   - Edit `CHANGELOG.md`.
   - Add a new section for the release version with date and notable changes.

3. **Review README**
   - Ensure `README.md` reflects current user-facing behavior.
   - Verify command names and settings match `package.json`.

4. **Commit release prep**
   - Commit version and documentation updates.
   - Example: `chore(release): prepare v0.1.1`

---

## Phase 2: Validate and Package

1. **Run release checks**

   ```bash
   npm ci
   npm run ci
   ```

2. **Create VSIX package**

   ```bash
   npx @vscode/vsce package
   ```

3. **Verify artifact**
   - Confirm a file named `vscode-path-picker-X.Y.Z.vsix` was generated.
   - Optionally inspect the package content before publishing:

     ```bash
     npx @vscode/vsce ls
     ```

---

## Phase 3: GitHub Release

1. **Create tag**
   - Use `vX.Y.Z` format (example: `v0.1.0`).

2. **Create GitHub release**
   - Title: `Path Picker vX.Y.Z`
   - Description: copy highlights from `CHANGELOG.md` for that version.
   - Upload the generated `.vsix` as a release asset.

3. **Publish release**
   - Publish the release after confirming tag and assets are correct.

---

## Phase 4: Marketplace Publishing

### Visual Studio Marketplace

1. Go to the [VS Code Marketplace management portal](https://marketplace.visualstudio.com/manage).
2. Open your publisher account.
3. Select the `Path Picker` extension and choose **Update**.
4. Upload the generated `.vsix`.
5. Wait for validation and publication to complete.

### Open VSX

1. Go to [Open VSX extension publishing](https://open-vsx.org/user-settings/extensions).
2. Publish a new version with the same `.vsix`.

---

## Post-release checklist

- Verify the new version is visible in the Marketplace listing.
- Verify installation/update works in a clean VS Code profile.
- Smoke test the three commands:
  - `Path Picker: Copy Path (File or Folder)`
  - `Path Picker: Copy File Path`
  - `Path Picker: Copy Folder Path`
- Confirm settings behavior for:
  - `pathPicker.pathStyle`
  - `pathPicker.prefix`

Release complete.
