const engine = require("./engine");

const handleConfig = require("./handleConfig");

const path = require('path')

const packagePath = path.resolve(process.cwd() ,"./package.json");

const options = handleConfig().handleEmoji(packagePath)

module.exports = engine(options);
