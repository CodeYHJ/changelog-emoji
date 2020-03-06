const chai = require("chai");
const { assert } = chai;
const changelog = require("../src/index");

describe("changelog-emoji", () => {
  it("changelog is Object", () => {
    assert.isObject(changelog);
  });
  it("changelog has prompter", () => {
    assert.hasAnyKeys(changelog, ["prompter"]);
  });
  it("prompter is Function", () => {
    assert.isFunction(changelog.prompter);
  });
});
