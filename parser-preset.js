const emojis = require("./src/emoji");
const list = Object.keys(emojis).map((el) => {
  return `${emojis[el].emoji} ${emojis[el].name}`;
});
module.exports = {
  // parserPreset: {
  //   parserOpts: {
  //     headerPattern: /(\w+)(?:\(([^\)\s]+)\))?: (.+))(?:\n|$)/,
  //     headerCorrespondence: ["type", "subject"],
  //   },
  // },
  rules: {
    "type-enum": [2, "always", list],
  },
};
