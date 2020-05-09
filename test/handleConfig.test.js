const chai = require("chai");

const { assert } = chai;

const handleConfig = require("../src/handleConfig");

const emoji = require("../src/emoji");

const path = require("path");

describe("handleConfig", () => {
  describe("checkPackage", () => {
    it("should return error when path not exist", () => {
      let isError = false;
      try {
        handleConfig().checkPackage("asd.js");
      } catch (error) {
        isError = true;
        console.log(error);
      }
      assert.isTrue(isError);
    });
  });
  describe("checkEmojiConfig", () => {
    const { all, noConfig, noEmojiConfig } = require("./tes.json");

    it("should return Object", () => {
      const result = handleConfig().checkEmojiConfig(all);
      assert.isObject(result);
    });

    it("should return false when emty Object", () => {
      const result = handleConfig().checkEmojiConfig(noConfig);
      assert.isFalse(result);
    });

    it("should return false when not exist emojiConfig", () => {
      const result = handleConfig().checkEmojiConfig(noEmojiConfig);
      assert.isFalse(result);
    });
  });
  describe("handleEmojiPath", () => {
    const { noConfig, noPath, hasEmoji } = require("./tes.json");
    it("should return defalut emojis when emty config", () => {
      const result = handleConfig().handleEmojiPath(noConfig);
      assert.deepEqual(result, emoji);
    });
    it("should return defalut emojis when dost not has path", () => {
      const result = handleConfig().handleEmojiPath(noPath);
      assert.deepEqual(result, emoji);
    });
    it("should return Object", () => {
      const result = handleConfig().handleEmojiPath(hasEmoji);
      assert.isObject(result);
    });
    it("should return new info", () => {
      const result = handleConfig().handleEmojiPath(
        hasEmoji.config.emojiConfig
      );
      assert.notDeepEqual(result, emoji);
    });
  });
  describe("handleEmojiLangue", () => {
    const {
      noConfig,
      noLangue,
      hasLangue,
      langueNotString,
      all,
    } = require("./tes.json");
    it("should return defalut langue when emty config", () => {
      const result = handleConfig().handleEmojiLangue(noConfig);
      assert.strictEqual(result, "en");
    });
    it("should return defalut langue when dost not has langue", () => {
      const result = handleConfig().handleEmojiLangue(noLangue);
      assert.strictEqual(result, "en");
    });
    it("should return String", () => {
      const result = handleConfig().handleEmojiLangue(
        hasLangue.config.emojiConfig
      );
      assert.strictEqual(result, "en");
    });
    it("should return err when langue not string", () => {
      let isError = false;
      try {
        handleConfig().handleEmojiLangue(langueNotString.config.emojiConfig);
      } catch (error) {
        isError = true;
      }
      assert.isTrue(isError);
    });
    it("should return err when langue not include ['en','cn']", () => {
      let isError = false;
      try {
        handleConfig().handleEmojiLangue(all.config.emojiConfig);
      } catch (error) {
        isError = true;
      }
      assert.isTrue(isError);
    });
  });
  describe("handleEmoji", () => {
    it("should return err when emty parameter", () => {
      let isError = false;
      try {
        handleConfig().handleEmoji();
      } catch (error) {
        isError = true;
      }
      assert.isTrue(isError);
    });
    it("should return Object", () => {
      const packagePath = path.resolve(process.cwd(), "./test/tes.json");
      const result = handleConfig().handleEmoji(packagePath);

      assert.isObject(result);
    });
  });
});
