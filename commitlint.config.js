module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "recycle",
        "perf",
        "test",
        "rewind",
        "hotfix",
        "initCommit",
        "security",
        "upgradingDep",
        "addingDep",
        "removeDep",
        "adUpRe",
      ],
    ],
  },
};
