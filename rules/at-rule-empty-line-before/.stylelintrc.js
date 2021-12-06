/** @type {import('stylelint').Config} */
module.exports = {
  overrides: [
    {
      files: ['always.css'],
      rules: {
        'at-rule-empty-line-before': 'always',
      },
    },
    {
      files: ['never.css'],
      rules: {
        'at-rule-empty-line-before': 'never',
      },
    },
    {
      files: ['always-except-after-same-name.css'],
      rules: {
        'at-rule-empty-line-before': [
          'always',
          {
            except: ['after-same-name'],
          },
        ],
      },
    },
    {
      files: ['never-except-after-same-name.css'],
      rules: {
        'at-rule-empty-line-before': [
          'never',
          {
            except: ['after-same-name'],
          },
        ],
      },
    },
    {
      files: ['always-except-inside-block.css'],
      rules: {
        'at-rule-empty-line-before': [
          'always',
          {
            except: ['inside-block'],
          },
        ],
      },
    },
    {
      files: ['never-except-inside-block.css'],
      rules: {
        'at-rule-empty-line-before': [
          'never',
          {
            except: ['inside-block'],
          },
        ],
      },
    },
    {
      files: ['always-except-blockless-after-same-name-blockless.css'],
      rules: {
        'at-rule-empty-line-before': [
          'always',
          {
            except: ['blockless-after-same-name-blockless'],
          },
        ],
      },
    },
    {
      files: ['never-except-blockless-after-same-name-blockless.css'],
      rules: {
        'at-rule-empty-line-before': [
          'never',
          {
            except: ['blockless-after-same-name-blockless'],
          },
        ],
      },
    },
    {
      files: ['always-except-blockless-after-blockless.css'],
      rules: {
        'at-rule-empty-line-before': [
          'always',
          {
            except: ['blockless-after-blockless'],
          },
        ],
      },
    },
    {
      files: ['never-except-blockless-after-blockless.css'],
      rules: {
        'at-rule-empty-line-before': [
          'never',
          {
            except: ['blockless-after-blockless'],
          },
        ],
      },
    },
    {
      files: ['always-except-first-nested.css'],
      rules: {
        'at-rule-empty-line-before': [
          'always',
          {
            except: ['first-nested'],
          },
        ],
      },
    },
    {
      files: ['never-except-first-nested.css'],
      rules: {
        'at-rule-empty-line-before': [
          'never',
          {
            except: ['first-nested'],
          },
        ],
      },
    },
    {
      files: ['always-ignore-after-comment.css'],
      rules: {
        'at-rule-empty-line-before': [
          'always',
          {
            ignore: ['after-comment'],
          },
        ],
      },
    },
    {
      files: ['never-ignore-after-comment.css'],
      rules: {
        'at-rule-empty-line-before': [
          'never',
          {
            ignore: ['after-comment'],
          },
        ],
      },
    },
    {
      files: ['always-ignore-first-nested.css'],
      rules: {
        'at-rule-empty-line-before': [
          'always',
          {
            ignore: ['first-nested'],
          },
        ],
      },
    },
    {
      files: ['never-ignore-first-nested.css'],
      rules: {
        'at-rule-empty-line-before': [
          'never',
          {
            ignore: ['first-nested'],
          },
        ],
      },
    },
    {
      files: ['always-ignore-inside-block.css'],
      rules: {
        'at-rule-empty-line-before': [
          'always',
          {
            ignore: ['inside-block'],
          },
        ],
      },
    },
    {
      files: ['never-ignore-inside-block.css'],
      rules: {
        'at-rule-empty-line-before': [
          'never',
          {
            ignore: ['inside-block'],
          },
        ],
      },
    },
    {
      files: ['always-ignore-blockless-after-same-name-blockless.css'],
      rules: {
        'at-rule-empty-line-before': [
          'always',
          {
            ignore: ['blockless-after-same-name-blockless'],
          },
        ],
      },
    },
    {
      files: ['never-ignore-blockless-after-same-name-blockless.css'],
      rules: {
        'at-rule-empty-line-before': [
          'never',
          {
            ignore: ['blockless-after-same-name-blockless'],
          },
        ],
      },
    },
    {
      files: ['always-ignore-blockless-after-blockless.css'],
      rules: {
        'at-rule-empty-line-before': [
          'always',
          {
            ignore: ['blockless-after-blockless'],
          },
        ],
      },
    },
    {
      files: ['never-ignore-blockless-after-blockless.css'],
      rules: {
        'at-rule-empty-line-before': [
          'never',
          {
            ignore: ['blockless-after-blockless'],
          },
        ],
      },
    },
    {
      files: ['always-ignore-at-rules.css'],
      rules: {
        'at-rule-empty-line-before': [
          'always',
          {
            ignoreAtRules: ['keyframes'],
          },
        ],
      },
    },
    {
      files: ['never-ignore-at-rules.css'],
      rules: {
        'at-rule-empty-line-before': [
          'never',
          {
            ignoreAtRules: ['keyframes'],
          },
        ],
      },
    },
  ],
}
