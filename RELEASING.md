# Path Picker VS Code Extension Release Guide

This document describes a professional, repeatable release process for the Path Picker VS Code extension.

The project includes first-class release scripts:

- `npm run package` -> validates, inspects package contents, and builds a `.vsix`
- `npm run package:ls` -> prints exactly what will be included in the VSIX

## Prerequisites

Before starting a release:

- Work from the repository root.
- Ensure your branch is up to date with `main`.
- Ensure you have publisher permissions for:
  - Visual Studio Marketplace
  - Open VSX (optional, if you publish there)
- Ensure local environment is healthy:

  ```bash
  npm ci
  npm run ci
  ```

---

## Phase 1: Prepare Version and Docs

1. **Bump version in `package.json`**
   - Follow Semantic Versioning (`MAJOR.MINOR.PATCH`).
   - Example: `0.1.0` -> `0.1.1`

2. **Update `CHANGELOG.md`**
   - Add a new section at the top.
   - Include version, date, and notable user-facing changes.

3. **Refresh `README.md` if needed**
   - Keep command names and command IDs aligned with `package.json`.
   - Keep settings names aligned with contributed configuration.

4. **Commit release prep**
   - Suggested commit message:

     ```text
     chore(release): prepare vX.Y.Z
     ```

---

## Phase 2: Build the VSIX Artifact

Use the packaged workflow (recommended):

```bash
npm run package
```

What this does:

1. Runs full validation (`npm run ci`).
2. Runs package content inspection (`npm run package:ls`).
3. Produces the VSIX (`vsce package`).

### Optional: Inspect package contents separately

```bash
npm run package:ls
```

Use this to confirm only expected files are included. Packaging content is controlled by `.vscodeignore`.

### Expected output

After successful packaging, a file like this appears in the repository root:

- `vscode-path-picker-X.Y.Z.vsix`

---

## Phase 3: Create GitHub Release

1. **Create and push tag**
   - Tag format: `vX.Y.Z`
   - Example: `v0.1.1`

2. **Draft release on GitHub**
   - Title: `Path Picker vX.Y.Z`
   - Notes: summarize the same highlights from `CHANGELOG.md`.
   - Upload artifact: `vscode-path-picker-X.Y.Z.vsix`

3. **Publish release**
   - Double-check tag, title, notes, and attached VSIX before publishing.

---

## Phase 4: Publish to Marketplaces

### Visual Studio Marketplace

1. Open the [VS Code Marketplace Publisher Management](https://marketplace.visualstudio.com/manage).
2. Select your publisher.
3. Open the `Path Picker` extension entry.
4. Choose **Update** and upload `vscode-path-picker-X.Y.Z.vsix`.
5. Wait for validation and propagation.

### Open VSX (optional)

1. Open [Open VSX extension publishing](https://open-vsx.org/user-settings/extensions).
2. Publish a new version using the same VSIX file.

---

## Phase 5: Post-release Verification

After publication:

- Confirm the new version is visible in marketplace listings.
- Install/update in a clean VS Code profile.
- Smoke test all commands:
  - `Path Picker: Copy Path (File or Folder)` (`pathPicker.copyPath`)
  - `Path Picker: Copy File Path` (`pathPicker.copyFilePath`)
  - `Path Picker: Copy Folder Path` (`pathPicker.copyFolderPath`)
- Validate settings behavior:
  - `pathPicker.pathStyle`
  - `pathPicker.prefix`

Release complete.
