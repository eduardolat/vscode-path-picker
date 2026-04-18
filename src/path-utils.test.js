const test = require("node:test");
const assert = require("node:assert/strict");

const { buildOutputPath, getRelativeWorkspacePath } = require("./path-utils");

test("getRelativeWorkspacePath returns forward-slash path", () => {
  const workspaceRootPath = "/project";
  const targetPath = "/project/src/utils/file.js";

  const result = getRelativeWorkspacePath(workspaceRootPath, targetPath);

  assert.equal(result, "src/utils/file.js");
});

test("getRelativeWorkspacePath returns dot for workspace root", () => {
  const workspaceRootPath = "/project";
  const targetPath = "/project";

  const result = getRelativeWorkspacePath(workspaceRootPath, targetPath);

  assert.equal(result, ".");
});

test("buildOutputPath returns prefixed relative path by default", () => {
  const result = buildOutputPath({
    pathStyle: "relative",
    prefix: "@",
    workspaceRootPath: "/project",
    targetPath: "/project/src/index.js",
  });

  assert.equal(result, "@src/index.js");
});

test("buildOutputPath returns prefixed absolute path", () => {
  const result = buildOutputPath({
    pathStyle: "absolute",
    prefix: "@",
    workspaceRootPath: "/project",
    targetPath: "/project/src/index.js",
  });

  assert.equal(result, "@/project/src/index.js");
});

test("buildOutputPath supports empty prefix", () => {
  const result = buildOutputPath({
    pathStyle: "relative",
    prefix: "",
    workspaceRootPath: "/project",
    targetPath: "/project/src/index.js",
  });

  assert.equal(result, "src/index.js");
});
