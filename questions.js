let questions = [
  {
    numb: 1,
    question: 'Number("1") - 1 == 0; \rWhat is the result?',
    options: ["True", "False", "NaN", "TypeError"],
    answer: "True",
  },
  {
    numb: 2,
    question: "What is the result? \r(true + false) > 2 + true;",
    options: ["true", "false", "TypeError", "NaN"],
    answer: "false",
  },
  {
    numb: 3,
    question: 'What is the result?\r"1" - - "1";',
    options: ["0", "2", "11", '"11"'],
    answer: "2",
  },
  {
    numb: 4,
    question:
      'What is the result? \r new String("This is a string") instanceof String;',
    options: ["true", "false", "TypeError", "NaN"],
    answer: "true",
  },
  {
    numb: 5,
    question: "What is the result? \r[] + [] + 'foo'.split('');        ",
    options: ['"f,o,o"', "TypeError", '["f","o","o"]', '[][]["f","o","o"]'],
    answer: '"f,o,o"',
  },
  {
    numb: 6,
    question: "What is the result? \r[] + [] + 'foo'.split('');",
    options: [
      '"f, o, o"',
      "TypeError",
      '["f", "o", "o"]',
      '[][]["f", "o", "o"]',
    ],
    answer: "TypeError",
  },
  {
    numb: 7,
    question: "What is the result? \rnew Array(5).toString();",
    options: ['",,,,"', "[]", '"[]"', "(empty)"],
    answer: '",,,,"',
  },
  {
    numb: 8,
    question: "What is the result? \rString('Hello') === 'Hello';",
    options: ["true", "false", "TypeError", "NaN"],
    answer: "true",
  },
  {
    numb: 9,
    question: 'What is the result? \r"This is a string" instanceof String;',
    options: ["true", "false", "TypeError", "NaN"],
    answer: "TypeError",
  },
  {
    numb: 10,
    question:
      "What is the result console.log(myArr); ? \rvar myArr = ['foo', 'bar', 'baz']; \rmyArr.length = 0; \r myArr.push('bin');",
    options: [
      "['foo', 'bar', 'baz']",
      "['foo', 'bar', 'baz', 'bin']",
      "['bin', 'foo', 'bar', 'baz']",
      "['bin']",
    ],
    answer: "['bin']",
  },
  {
    numb: 11,
    question: "What is the result? \rString('Hello') === 'Hello';",
    options: ["true", "false", "TypeError", "NaN"],
    answer: "true",
  },
  {
    numb: 12,
    question: "What is the result? \r10 > 9 > 8 === true;",
    options: ["True", "False", "Error", "Other"],
    answer: "False",
  },
  {
    numb: 13,
    question: "What is the result? \rNaN === NaN;",
    options: ["true", "false", "TypeError", "NaN"],
    answer: "false",
  },
];
