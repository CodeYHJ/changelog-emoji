const engine = require("./engine");
const fs = require("fs");
let conventionalCommitTypes = require("./emoji.js").emojis;
const packagePath = process.cwd() + "package.json";
if (fs.existsSync(packagePath)) {
  const packjson = require(packagePath);
  const config = packjson.config;
  if (config && config.hasOwnProperty("emojiPath")) {
    conventionalCommitTypes = require(packjson.config.emojiPath);
  }
}

module.exports = engine({
  types: conventionalCommitTypes,
});
