const path = require("node:path");

function toForwardSlash(value) {
  return value.replaceAll("\\", "/");
}

function getRelativeWorkspacePath(workspaceRootPath, targetPath) {
  const relativePath = path.relative(workspaceRootPath, targetPath);

  if (relativePath.length === 0) {
    return ".";
  }

  return toForwardSlash(relativePath);
}

function buildOutputPath(options) {
  const prefix = typeof options.prefix === "string" ? options.prefix : "";

  if (options.pathStyle === "absolute") {
    return `${prefix}${options.targetPath}`;
  }

  const relativePath = getRelativeWorkspacePath(
    options.workspaceRootPath,
    options.targetPath,
  );

  return `${prefix}${relativePath}`;
}

module.exports = {
  buildOutputPath,
  getRelativeWorkspacePath,
  toForwardSlash,
};
