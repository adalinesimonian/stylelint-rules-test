/** @type {import('stylelint').Config} */
module.exports = {
  overrides: [
    {
      files: ['array.css'],
      rules: {
        'at-rule-disallowed-list': ['extend', 'keyframes'],
      },
    },
    {
      files: ['string.css'],
      rules: {
        'at-rule-disallowed-list': 'keyframes',
      },
    },
  ],
}
