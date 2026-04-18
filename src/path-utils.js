const path = require("node:path");

/**
 * Supported output modes for copied paths.
 *
 * @typedef {"relative" | "absolute"} PathStyle
 */

/**
 * Input values used to build the final copied path string.
 *
 * @typedef {Object} BuildOutputPathOptions
 * @property {PathStyle} pathStyle - Defines whether output is relative or absolute.
 * @property {string} [prefix] - Optional text prepended to the final path.
 * @property {string} workspaceRootPath - Workspace folder path used for relative output.
 * @property {string} targetPath - Selected file or folder path.
 */

/**
 * Normalizes a path string to use forward slashes.
 *
 * This keeps output consistent across operating systems.
 *
 * @param {string} value - Path string to normalize.
 * @returns {string} Normalized path string.
 */
function toForwardSlash(value) {
  return value.replaceAll("\\", "/");
}

/**
 * Returns the selected path relative to a workspace root.
 *
 * @param {string} workspaceRootPath - Absolute workspace folder path.
 * @param {string} targetPath - Absolute path of the selected resource.
 * @returns {string} Relative path, or `.` when both paths are the same.
 */
function getRelativeWorkspacePath(workspaceRootPath, targetPath) {
  const relativePath = path.relative(workspaceRootPath, targetPath);

  if (relativePath.length === 0) {
    return ".";
  }

  return toForwardSlash(relativePath);
}

/**
 * Builds the final path text that will be copied to the clipboard.
 *
 * @param {BuildOutputPathOptions} options - Copy output options and input paths.
 * @returns {string} Path ready to copy, including prefix when configured.
 */
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
