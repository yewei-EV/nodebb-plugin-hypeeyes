// tslint:disable-next-line:no-var-requires
const Module = require('module');

const originalRequire = Module.prototype.require;
Module.prototype.require = function requireFunc(path: string) {
  if (path.indexOf('@bbs/') === 0) {
    const newPath = path.replace('@bbs/', './src/');
    return require.main.require(newPath);
  }
  return originalRequire.call(this, path);
};
