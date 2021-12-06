/** @type {import('stylelint').Config} */
module.exports = {
  overrides: [
    {
      files: ['lower.css'],
      rules: {
        'at-rule-name-case': 'lower',
      },
    },
    {
      files: ['upper.css'],
      rules: {
        'at-rule-name-case': 'upper',
      },
    },
  ],
}
