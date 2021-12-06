import module from 'module'
import path from 'path'
import url from 'url'
import { execa } from 'execa'
import glob from 'fast-glob'
import stylelint from 'stylelint'

// run stylelint for all test files in rules
// layout:
//   rules/
//     rule-name/
//       test-file.css
//       .stylelintrc.js
//       .stylelintignore

const args = process.argv.slice(2)

const flags = {
  help: ['?', 'h', 'help'],
  cli: ['c', 'cli'],
  editorLinks: ['l', 'links'],
  interactive: ['i', 'interactive'],
  interactivePerFile: ['f', 'file'],
  noop: ['n', 'noop'],
}

const showHelp = () => {
  console.log(`
  \u001b[33mUsage\u001b[0m:
    yarn test [options] [rules]

  \u001b[33mOptions\u001b[0m:
    -?, -h, --help     Show this help message.
    -c, --cli          Use the Stylelint CLI instead of the Node API. Ranges
                       will not be displayed, only starting positions.
    -l, --links        Show links per warning that can be used to open the file
                       at the line and column of the warning's start or end in
                       your editor. Cannot be used with -c/--cli.
    -i, --interactive  Interactive mode; prompts to continue after each rule.
                       Cannot be used with -c/--cli.
    -f, --file         Changes the behavior of interactive mode to prompt after
                       each individual test file.
    -n, --noop         No-op mode; does not lint any files. Only prints which
                       rules would be linted.
    [rules]            The name, or part of the name, of the rule to test. If
                       not specified, all rules will be tested. Matched against
                       the name of the rule's directory. Can be specified
                       multiple times.
  `)
}

/** @type {{[key: string]: keyof flags}} */
const flagMap = Object.keys(flags).reduce((acc, key) => {
  const flag = flags[key]

  flag.forEach(f => {
    acc[f] = key
  })

  return acc
}, {})

/** @type {{[key in keyof flags]: boolean}} */
const activeFlags = Object.keys(flags).reduce((acc, key) => {
  acc[key] = false

  return acc
}, {})

const ruleArgs = []

// parse args, allowing for combined flags (e.g. -c -l === -cl)

for (const arg of args) {
  if (arg.startsWith('--')) {
    const flag = arg.slice(2)

    if (flag in flagMap) {
      activeFlags[flagMap[flag]] = true
    } else {
      console.error(`[\u001b[31merror\u001b[0m]\u001b[33m Unknown flag: ${arg}`)
      showHelp()
      process.exit(1)
    }
  } else if (arg.startsWith('-')) {
    const flags = arg.slice(1)

    for (const flag of flags) {
      if (flag in flagMap) {
        activeFlags[flagMap[flag]] = true
      } else {
        console.error(
          `[\u001b[31merror\u001b[0m]\u001b[33m Unknown flag: -${flag}`
        )
        showHelp()
        process.exit(1)
      }
    }
  } else {
    ruleArgs.push(arg)
  }
}

if (activeFlags.help) {
  showHelp()
  process.exit(0)
}

if (activeFlags.cli && activeFlags.editorLinks) {
  console.error(
    '[\u001b[31merror\u001b[0m]\u001b[33m -l/--links cannot be used with -c/--cli\u001b[0m'
  )
  showHelp()
  process.exit(1)
}

if (activeFlags.cli && activeFlags.interactive) {
  console.error(
    '[\u001b[31merror\u001b[0m]\u001b[33m -i/--interactive cannot be used with -c/--cli\u001b[0m'
  )
  showHelp()
  process.exit(1)
}

if (activeFlags.interactivePerFile && !activeFlags.interactive) {
  console.error(
    '[\u001b[31merror\u001b[0m]\u001b[33m -f/--file can only be used with -i/--interactive\u001b[0m'
  )
  showHelp()
  process.exit(1)
}

const dirname = path.dirname(url.fileURLToPath(import.meta.url))

// filter rules if any rules are specified
const pattern = ruleArgs.length
  ? `rules/${ruleArgs.map(rule => `*${path.basename(rule)}*`).join(',')}`
  : 'rules/*'

const rules = await glob(pattern, {
  onlyDirectories: true,
  absolute: true,
  cwd: dirname,
})

if (activeFlags.noop) {
  console.log(
    `\u001b[33mWould test ${rules.length} rule${rules.length === 1 ? '' : 's'}${
      rules.length === 0 ? '.' : ':'
    }\u001b[0m\n`
  )

  for (const rule of rules) {
    console.log(`  ${path.basename(rule)}`)
  }

  process.exit(0)
}

if (activeFlags.cli) {
  const require = module.createRequire(import.meta.url)
  const stylelintBinPath = require.resolve('stylelint/bin/stylelint.js')

  for (const rule of rules) {
    const ruleName = path.basename(rule)

    console.log(`\u001b[36m${ruleName}\u001b[0m:`)

    await execa(stylelintBinPath, ['**/*.css'], {
      stdio: 'inherit',
      cwd: rule,
      reject: false,
    })
  }

  process.exit(0)
}

/**
 * @param {string} str
 * @param {number} length
 * @param {boolean} [padLeft=false]
 */
const padString = (str, length, padLeft = false) => {
  const pad = ' '.repeat(length - str.length)

  return padLeft ? `${pad}${str}` : `${str}${pad}`
}

const pause = async () => {
  process.stdout.write(
    '  \u001b[34m⌨️\u001b[0m  Press \u001b[32mEnter\u001b[0m or \u001b[32mSpace\u001b[0m to continue'
  )

  process.stdin.setRawMode(true)
  process.stdin.resume()

  while (true) {
    const key = await new Promise(resolve => {
      process.stdin.once('data', data => resolve(data.toString()))
    })

    // allow ctrl-c or ctrl-d to exit
    if (key === '\u0003' || key === '\u0004') {
      process.exit(1)
    }

    if (key === '\r' || key === ' ') {
      break
    }
  }

  process.stdin.pause()
  process.stdin.setRawMode(false)
  process.stdout.write('\u001b[0G\u001b[K')
}

for (const [ruleIndex, rule] of rules.entries()) {
  const ruleName = path.basename(rule)

  console.log(`\u001b[36m${ruleName}\u001b[0m:\n`)

  /** @type {stylelint.LinterOptions} */
  const config = { cwd: rule, files: '**/*.css' }

  try {
    const result = await stylelint.lint(config)

    for (const [fileIndex, { warnings, source }] of result.results.entries()) {
      console.log(`\u001b[33m${path.relative(rule, source)}\u001b[0m:`)

      if (!warnings.length) {
        console.log('  \u001b[33m⚠\u001b[0m  No errors reported\n')
        continue
      }

      for (const warning of warnings) {
        const severity =
          warning.severity === 'warning'
            ? '\u001b[33m⚠\u001b[0m'
            : '\u001b[31m✖\u001b[0m'

        const position = padString(
          warning.endLine === warning.line
            ? `${warning.line}:${warning.column}-${warning.endColumn}`
            : `${warning.line}:${warning.column}-${warning.endLine}:${warning.endColumn}`,
          12
        )

        const suffix = activeFlags.editorLinks
          ? `\u001b[30m
     start: ${path.relative(dirname, source)}:${warning.line}:${warning.column}
     end:   ${path.relative(dirname, source)}:${warning.endLine}:${
              warning.endColumn
            }\u001b[0m`
          : ''

        const text = `${warning.text.replace(
          new RegExp(`\\s*\\(${ruleName}\\)$`),
          ''
        )}${suffix}`

        console.log(`  ${severity}  ${position} ${text}`)
      }

      console.log()

      if (
        activeFlags.interactive &&
        activeFlags.interactivePerFile &&
        fileIndex < result.results.length - 1
      ) {
        // wait until user presses enter or space to continue to the next file
        await pause()
      }
    }

    if (
      activeFlags.interactive &&
      !activeFlags.interactivePerFile &&
      ruleIndex < rules.length - 1
    ) {
      // wait until user presses enter or space to continue to the next rule
      await pause()
    }
  } catch (error) {
    console.error(error)
  }
}

process.exit(0)
