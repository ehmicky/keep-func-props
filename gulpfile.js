'use strict'

const { appendFile } = require('fs')
const { promisify } = require('util')

const { series } = require('gulp')
const tasks = require('gulp-shared-tasks')
// eslint-disable-next-line import/no-internal-modules
const { exec } = require('gulp-shared-tasks/build/src/exec')
// const isCi = require('is-ci')
// const PluginError = require('plugin-error')

const NPMRC_FILE = '.npmrc'

const pAppendFile = promisify(appendFile)

// The release process has two steps:
//   - `gulp release` is performed locally. It tags the commit and create a
//     GitHub release.
//   - `gulp publish` is performed on CI if `gulp release` was used, and after
//     all tests have passed. It publishes to npm.
const npmPublish = async function() {
  // if (!isCi) {
  //   throw new PluginError(
  //     'gulp-publish',
  //     'This can only be performed in CI. Use `gulp release` instead.',
  //   )
  // }

  await pAppendFile(NPMRC_FILE, NPMRC_CONTENT)
  await exec('npm publish')
}

// The NPM_TOKEN environment variable is sensitive, i.e. encrypted in CI.
// `${NPM_TOKEN}` is expansed by npm. We avoid doing it outselves so the token
// does not get leaked in CI logs.
// eslint-disable-next-line no-template-curly-in-string
const NPMRC_CONTENT = '//registry.npmjs.org/:_authToken=${NPM_TOKEN}\n'

// We do not need to run tests since they were performed in previous stages.
const publish = series(tasks.build, npmPublish)

module.exports = {
  ...tasks,
  publish,
}
