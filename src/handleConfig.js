const fs = require("fs");
const path = require("path");


module.exports = () => {
  return {
    checkPackage(packagePath) {
      const hasPackage = fs.existsSync(packagePath);
      if (!hasPackage) {
        throw "must have package.json";
      }
      const package = require(packagePath);
      return package;
    },

    checkEmojiConfig(package) {
      const config = package.hasOwnProperty("config") ? package.config : false;
      if (!config) return false;
      const emojiConfig = config.hasOwnProperty("emojiConfig")
        ? config.emojiConfig
        : false;
      if (!emojiConfig) return false;

      return emojiConfig;
    },

    handleEmojiPath(emojiConfig) {
      if (!emojiConfig || !emojiConfig.hasOwnProperty("path"))
        return require("./emoji.js").emojis;
      return require(path.resolve(process.cwd(), emojiConfig.path));
    },

    handleEmojiLangue(emojiConfig) {

      if (!emojiConfig || !emojiConfig.hasOwnProperty("langue")) return "en";

      const langueList = ["en", "cn"];

      const langue = emojiConfig.langue;

      if (typeof langue !== "string") throw "langue must string";
      if (
        typeof langue === "string" &&
        !langueList.includes(emojiConfig.langue.toLocaleLowerCase())
      )
        throw "langue must support cn or en. default en";

      return langue;
    },

    handleEmoji(path) {

      const package = this.checkPackage(path);

      const emojiConfig = this.checkEmojiConfig(package);

      const types = this.handleEmojiPath(emojiConfig);

      const langue = this.handleEmojiLangue(emojiConfig);

      return { types, langue };
    },
  };
};
