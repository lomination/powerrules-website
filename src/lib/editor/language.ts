import * as monaco from "monaco-editor";

export function registerPowerRulesLanguage(): void {
  monaco.languages.register({ id: "powerrules" });


  monaco.editor.defineTheme("powerrules-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "section", foreground: "C586C0" } // purple
    ],
    colors: {}
  });

  monaco.languages.setLanguageConfiguration("powerrules", {
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\#\$\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/']
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
      ['<', '>']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '<', close: '>' },
      { open: "'", close: "'", notIn: ['string', 'comment'] },
      { open: '"', close: '"', notIn: ['string', 'comment'] }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '<', close: '>' },
      { open: "'", close: "'" },
      { open: '"', close: '"' }
    ],
    folding: {
      markers: {
        start: new RegExp('^def\\b'),
        end: new RegExp('^end\\b')
      }
    }
  });


  monaco.languages.setMonarchTokensProvider("powerrules", <monaco.languages.IMonarchLanguage>{
    defaultToken: 'invalid',
    tokenPostfix: ".powerrules",

    brackets: [
      { open: '{', close: '}', token: 'delimiter.curly' },
      { open: '[', close: ']', token: 'delimiter.square' },
      { open: '(', close: ')', token: 'delimiter.parenthesis' },
      { open: '<', close: '>', token: 'delimiter.angle' }
    ],

    tokenizer: {
      root: [
        { include: "@whitespace" },
        { include: "@comment" },
        [/^::config::/i, { token: "type.identifier.config", switchTo: "@config_section" }],
        [/^::macros?::/i, { token: "type.identifier.macro", switchTo: "@macro_section" }],
        [/^::rules?::/i, { token: "type.identifier.rule", switchTo: "@rule_section" }],
        [/./, { token: "", switchTo: "@rule_section", goBack: 1 }]
      ],
      // Configuration section
      config_section: [
        { include: "@whitespace" },
        { include: "@comment" },
        [/^::macros?::/i, { token: "type.identifier.macro", switchTo: "@macro_section" }],
        [/^::rules?::/i, { token: "type.identifier.rule", switchTo: "@rule_section" }],
        [/\b(?:yes|no|true|false|ui)\b/i, "keyword.bool"],
        [/\b(?:least|less|normal|more|most)\b/, "keyword.level"],
        { include: "@identifier" },
        { include: "@number" },
        [/[.=+-]/, "operators"]
      ],
      // Macro section
      macro_section: [
        { include: "@whitespace" },
        { include: "@comment" },
        [/^::rules?::/i, { token: "type.identifier.rule", switchTo: "@rule_section" }],
        [/\bdef\b/i, { token: "keyword.flow", next: "@expect_function" }],
        [/\bend\b/i, "keyword.flow"],
        { include: "@identifier" },
        { include: "@allow_macro_call" },
        [/</, { token: "delimiter.angle", bracket: "@open" }],
        [/>/, { token: "delimiter.angle", bracket: "@close" }],
      ],
      expect_function: [
        { include: "@whitespace" },
        { include: "@comment" },
        [/\b[a-zA-Z_]\w*\b/, "function"],
        [/./, { token: "", goBack: 1, next: "@pop" }]
      ],
      // Rule section
      rule_section: [
        { include: "@whitespace" },
        { include: "@comment" },
        [/^(?:replace|re|shadow|sd|shape|sh)\b/, "keyword.command"],
        [/\b(?:with|withinternal|withexternal|if|random|rotate|apply|on|using|neutral|mode|is|are|not|there|full|empty|normal)\b/, "keyword.flow"],
        [/^\[/, { token: "delimiter.square", bracket: "@open", next: "@title" }],
        [/^\s*#.*$/, "string"],
        [/#.*$/, "invalid"],
        { include: "@number" },
        { include: "@allow_macro_call" },
        [/[+-]/, "operators"]
      ],
      title: [
        [/\\\]/, { cases: { "@eos": { token: "invalid", next: "@pop" }, "@default": { token: "string" } } }],
        [/\]/, { token: "delimiter.square", bracket: "@close", next: "@pop" }],
        [/./, { cases: { "@eos": { token: "invalid", next: "@pop" }, "@default": { token: "string" } } }]
      ],
      // Utility
      identifier: [
        [/\b[a-zA-Z_]\w*\b/, "variable"],
      ],
      number: [
        [/\b(?:0|[1-9][0-9]*)\b/, "number"],
        [/\b0[bB](?:0|1[01]*)\b/, "number"],
        [/\b0[xX](?:0|[a-fA-F1-9][a-fA-F0-9]*)\b/, "number"],
        [/\b[0-9]\w*\b/, "invalid"],
      ],
      whitespace: [
        [/\s+/, "white"],
      ],
      comment: [
        [/\/\/.*$/, "comment"],
        [/\/\*/, "comment", "@multi_comment"]
      ],
      multi_comment: [
        [/\*\//, { token: "comment", next: "@pop" }],
        [/[\S\s]/, "comment"]
      ],
      allow_macro_call: [
        [/\$[a-zA-Z_]\w*/, "function"],
        [/\${[a-zA-Z_]\w*}/, "function"]
      ]
    }
  });

}
