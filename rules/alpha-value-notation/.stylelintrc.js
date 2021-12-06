/** @type {import('stylelint').Config} */
module.exports = {
  overrides: [
    {
      files: ['number.css'],
      rules: {
        'alpha-value-notation': 'number',
      },
    },
    {
      files: ['percentage.css'],
      rules: {
        'alpha-value-notation': 'percentage',
      },
    },
    {
      files: ['except-properties.css'],
      rules: {
        'alpha-value-notation': [
          'percentage',
          {
            exceptProperties: [
              'opacity',
              '/shape-image-threshold/',
              /background-color/,
            ],
          },
        ],
      },
    },
  ],
}
