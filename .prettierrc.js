module.exports = {
  printWidth: 120,
  trailingComma: "es5",
  tabWidth: 2,
  singleQuote: false,
  bracketSameLine: false,
  jsxSingleQuote: false,
  quoteProps: "preserve",
  arrowParens: "always",
  overrides: [
    {
      "files": ["*.md"],
      "options": {
        embeddedLanguageFormatting: "off",
      },
    },
  ],
};
