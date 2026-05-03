const vscode = require("vscode");
const { buildOutputPath } = require("./path-utils");

const EXTENSION_NAMESPACE = "pathPicker";

/**
 * Function signature used by copy flows to select a target URI.
 *
 * @callback UriPicker
 * @returns {Promise<vscode.Uri | undefined>} Selected URI, or `undefined` if cancelled.
 */

/**
 * Reads the configuration section owned by this extension.
 *
 * @returns {vscode.WorkspaceConfiguration} Path Picker configuration object.
 */
function getExtensionConfiguration() {
  return vscode.workspace.getConfiguration(EXTENSION_NAMESPACE);
}

/**
 * Returns the configured output style for copied paths.
 *
 * @returns {"relative" | "absolute"} Path output style.
 */
function getPathStyle() {
  const value = getExtensionConfiguration().get("pathStyle", "relative");
  return value === "absolute" ? "absolute" : "relative";
}

/**
 * Returns the configured prefix to prepend to copied paths.
 *
 * @returns {string} Output prefix.
 */
function getPrefix() {
  return getExtensionConfiguration().get("prefix", "@");
}

/**
 * Builds a glob pattern from VS Code's file/search exclusion settings.
 * This respects .gitignore, node_modules, and other user-configured excludes.
 *
 * @returns {string | undefined} Combined exclude glob pattern, or undefined if none.
 */
function getExcludeGlob() {
  const searchExclude =
    vscode.workspace.getConfiguration("search").get("exclude") || {};
  const filesExclude =
    vscode.workspace.getConfiguration("files").get("exclude") || {};
  const combined = { ...searchExclude, ...filesExclude };
  const patterns = Object.keys(combined).filter(
    (key) => combined[key] === true,
  );

  if (patterns.length === 0) {
    return undefined;
  }

  return `{${patterns.join(",")}}`;
}

/**
 * Resolves the workspace folder that owns a selected URI.
 *
 * @param {vscode.Uri} targetUri - Selected file or folder URI.
 * @returns {vscode.WorkspaceFolder | undefined} Workspace folder for the URI.
 */
function getWorkspaceFolderForUri(targetUri) {
  return vscode.workspace.getWorkspaceFolder(targetUri);
}

/**
 * Copies a selected URI path to the clipboard using extension settings.
 *
 * @param {vscode.Uri} targetUri - Selected file or folder URI.
 * @returns {Promise<void>} Completes after clipboard copy and user feedback.
 * @throws {Error} When the URI is not inside any open workspace folder.
 */
async function copyUriPathToClipboard(targetUri) {
  const workspaceFolder = getWorkspaceFolderForUri(targetUri);

  if (!workspaceFolder) {
    throw new Error(
      "Could not resolve the workspace folder for the selected item.",
    );
  }

  const valueToCopy = buildOutputPath({
    pathStyle: getPathStyle(),
    prefix: getPrefix(),
    workspaceRootPath: workspaceFolder.uri.fsPath,
    targetPath: targetUri.fsPath,
  });

  await vscode.env.clipboard.writeText(valueToCopy);
  await vscode.window.showInformationMessage(`Copied path: ${valueToCopy}`);
}

/**
 * Shows a fuzzy search quick pick with files and folders combined.
 *
 * @returns {Promise<vscode.Uri | undefined>} Selected URI, or `undefined` if cancelled.
 */
async function pickAnyUri() {
  const exclude = getExcludeGlob();

  const files = await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: "Path Picker: Scanning workspace...",
      cancellable: false,
    },
    () => vscode.workspace.findFiles("**/*", exclude),
  );

  if (files.length === 0) {
    await vscode.window.showWarningMessage("No items found in the workspace.");
    return undefined;
  }

  const items = [];
  const folderMap = new Map();

  for (const file of files) {
    const relativePath = vscode.workspace.asRelativePath(file);

    items.push({
      label: `$(file) ${relativePath}`,
      description: "File",
      uri: file,
    });

    const parts = relativePath.split("/");
    let currentPath = "";
    for (let i = 0; i < parts.length - 1; i++) {
      currentPath += (currentPath ? "/" : "") + parts[i];
      if (!folderMap.has(currentPath)) {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(file);
        if (workspaceFolder) {
          folderMap.set(
            currentPath,
            vscode.Uri.joinPath(workspaceFolder.uri, currentPath),
          );
          items.push({
            label: `$(folder) ${currentPath}`,
            description: "Folder",
            uri: folderMap.get(currentPath),
          });
        }
      }
    }
  }

  items.sort((a, b) => a.label.localeCompare(b.label));

  const selection = await vscode.window.showQuickPick(items, {
    title: "Path Picker: Select File or Folder",
    placeHolder: "Type to search anything in the workspace...",
    matchOnDescription: true,
  });

  return selection?.uri;
}

/**
 * Runs the shared command flow for selecting a resource and copying its path.
 *
 * @param {UriPicker} pickUri - Selection strategy used by a command.
 * @returns {Promise<void>} Completes after the command flow finishes.
 */
async function runCopyFlow(pickUri) {
  if (
    !vscode.workspace.workspaceFolders ||
    vscode.workspace.workspaceFolders.length === 0
  ) {
    await vscode.window.showWarningMessage(
      "Path Picker requires at least one open workspace.",
    );
    return;
  }

  const selectedUri = await pickUri();

  if (!selectedUri) {
    return;
  }

  try {
    await copyUriPathToClipboard(selectedUri);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await vscode.window.showErrorMessage(`Could not copy path: ${message}`);
  }
}

/**
 * Activates the extension and registers its commands.
 *
 * @param {vscode.ExtensionContext} context - VS Code extension context.
 * @returns {void}
 */
function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("pathPicker.copyPath", async () => {
      await runCopyFlow(pickAnyUri);
    }),
    vscode.commands.registerCommand("pathPicker.copyFilePath", async () => {
      await runCopyFlow(pickAnyUri);
    }),
    vscode.commands.registerCommand("pathPicker.copyFolderPath", async () => {
      await runCopyFlow(pickAnyUri);
    }),
  );
}

/**
 * Deactivates the extension.
 *
 * @returns {void}
 */
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
