const wrap = require("word-wrap");
const map = require("lodash.map");
const longest = require("longest");
const rightPad = require("right-pad");

module.exports = function (options) {
  const { langue , types } = options;
  const length = longest(Object.keys(types)).length + 1;
  const choices = map(types, function (type, key) {
    return {
      name:
        rightPad(key + ":", length) +
        " " +
        type.emoji +
        "  " +
        type.description,
      value: key,
    };
  });
  let defalutTipList = [];
  if (langue === "en") {
    defalutTipList = [
      {
        type: "list",
        name: "type",
        message: "Select the type of change that you're committing:",
        choices: choices,
      },
      {
        type: "input",
        name: "scope",
        message:
          "Denote the scope of this change ($location, $browser, $compile, etc.):\n",
      },
      {
        type: "input",
        name: "subject",
        message: "Write a short, imperative tense description of the change:\n",
      },
      {
        type: "input",
        name: "body",
        message: "Provide a longer description of the change:\n",
      },
      {
        type: "input",
        name: "footer",
        message: "List any breaking changes or issues closed by this change:\n",
      },
    ];
  } else if (langue === "cn") {
    defalutTipList = [
      {
        type: "list",
        name: "type",
        message: "选择你要提交的commit类型:",
        choices: choices,
      },
      {
        type: "input",
        name: "scope",
        message:
          "请输入change的范围 ($location, $browser, $compile, etc.):\n",
      },
      {
        type: "input",
        name: "subject",
        message: "简要概括change的原因:\n",
      },
      {
        type: "input",
        name: "body",
        message: "详细描述该change:\n",
      },
      {
        type: "input",
        name: "footer",
        message: "列出有关于该change的重大更改或更改后解决的问题:\n",
      },
    ];
  }

  return {
    // When a user runs `git cz`, prompter will
    // be executed. We pass you cz, which currently
    // is just an instance of inquirer.js. Using
    // this you can ask questions and get answers.
    //
    // The commit callback should be executed when
    // you're ready to send back a commit template
    // to git.
    //
    // By default, we'll de-indent your commit
    // template and will keep empty lines.
    prompter: function (cz, commit) {
      if (langue === "en") {
        console.log(
          "\nLine 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.\n"
        );
      }else if (langue === "cn") {
        "\n'简要概括change的原因'限制为50个汉字内. 其他将在50个字符后换行.\n"

      }


      // Let's ask some questions of the user
      // so that we can populate our commit
      // template.
      //
      // See inquirer.js docs for specifics.
      // You can also opt to use another input
      // collection library if you prefer.
      cz.prompt(defalutTipList).then(function (answers) {
        const maxLineWidth = 100;
        const wrapOptions = {
          trim: true,
          newline: "\n",
          indent: "",
          width: maxLineWidth,
        };
        // parentheses are only needed when a scope is present
        let scope = answers.scope.trim();
 
        scope = scope ? "(" + answers.scope.trim() + ")" : "";

        // Set emoji to use

        const emoji = types[answers.type].emoji;
        // Hard limit this line
        const head = (
          emoji +
          answers.type +
          scope +
          ": " +
          answers.subject.trim()
        ).slice(0, maxLineWidth);
console.log(emoji,"type",answers.type,"scope",scope,"subject",answers.subject)
        // Wrap these lines at 100 characters
        const body = wrap(answers.body, wrapOptions);
        const footer = wrap(answers.footer, wrapOptions);

        commit(head + "\n\n" + body + "\n\n" + footer);
      });
    },
  };
};
