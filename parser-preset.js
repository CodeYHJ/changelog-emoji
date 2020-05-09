const emojis = require("./src/emoji");

const list = Object.keys(emojis).map((el) => {
  return `${emojis[el].emoji} ${emojis[el].name}`;
});
module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^(.*)(\w*)\((\W*)\):\s(.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject']
    },
  },
  rules: {
    "type-enum": [2, "always", list],
  },
};
