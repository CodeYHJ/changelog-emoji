var engine = require("./engine");
var conventionalCommitTypes = require("./emoji.js/index.js");

module.exports = engine({
  types: conventionalCommitTypes.emojis
});
