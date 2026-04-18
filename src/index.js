const vscode = require("vscode");
const { buildOutputPath } = require("./path-utils");

const EXTENSION_NAMESPACE = "pathPicker";

function getExtensionConfiguration() {
  return vscode.workspace.getConfiguration(EXTENSION_NAMESPACE);
}

function getPathStyle() {
  const value = getExtensionConfiguration().get("pathStyle", "relative");
  return value === "absolute" ? "absolute" : "relative";
}

function getPrefix() {
  return getExtensionConfiguration().get("prefix", "@");
}

function getWorkspaceFolderForUri(targetUri) {
  return vscode.workspace.getWorkspaceFolder(targetUri);
}

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

async function pickFileUri() {
  const pickedUri = await vscode.window.showOpenDialog({
    canSelectFiles: true,
    canSelectFolders: false,
    canSelectMany: false,
    openLabel: "Copy path",
  });

  if (!pickedUri || pickedUri.length === 0) {
    return undefined;
  }

  return pickedUri[0];
}

async function pickFolderUri() {
  const pickedUri = await vscode.window.showOpenDialog({
    canSelectFiles: false,
    canSelectFolders: true,
    canSelectMany: false,
    openLabel: "Copy path",
  });

  if (!pickedUri || pickedUri.length === 0) {
    return undefined;
  }

  return pickedUri[0];
}

async function pickPathUri() {
  const quickPick = await vscode.window.showQuickPick(
    [
      {
        label: "$(file) File",
        value: "file",
      },
      {
        label: "$(folder) Folder",
        value: "folder",
      },
    ],
    {
      title: "Path Picker",
      placeHolder: "Choose what you want to search",
    },
  );

  if (!quickPick) {
    return undefined;
  }

  if (quickPick.value === "folder") {
    return pickFolderUri();
  }

  return pickFileUri();
}

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

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("pathPicker.copyFilePath", async () => {
      await runCopyFlow(pickFileUri);
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("pathPicker.copyFolderPath", async () => {
      await runCopyFlow(pickFolderUri);
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("pathPicker.copyPath", async () => {
      await runCopyFlow(pickPathUri);
    }),
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
