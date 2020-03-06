var engine = require("./engine");
var conventionalCommitTypes = require("./emoji.js");

module.exports = engine({
  types: conventionalCommitTypes.emojis
});
