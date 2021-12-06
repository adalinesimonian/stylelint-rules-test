/** @type {import('stylelint').Config} */
module.exports = {
  overrides: [
    {
      files: ['array.css'],
      rules: {
        'at-rule-allowed-list': ['extend', 'keyframes'],
      },
    },
    {
      files: ['string.css'],
      rules: {
        'at-rule-allowed-list': 'keyframes',
      },
    },
  ],
}
