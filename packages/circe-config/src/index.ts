import * as fs from 'fs'
import * as path from 'path'
import * as debug from 'debug'
import * as _ from 'lodash'
import * as requireDir from 'require-dir'

const log = debug('circe-config')

function isDirectory (dir: string) {
  try {
    const stat = fs.statSync(dir)
    return stat.isDirectory()
  } catch (err) {
    return false
  }
}

function requirePath (p: string) {
  if (isDirectory(p)) {
    return requireDir(p, {recurse: true})
  } else {
    return require(p)
  }
}

export function from <T = any> (dir: string): T {
  const NODE_ENV = process.env.NODE_ENV || 'development'
  log(NODE_ENV)

  if (!dir || !isDirectory(dir)) {
    throw new Error('Directory must be specified.')
  }

  const defaultPath = path.join(dir, 'default')
  const envPath = path.join(dir, NODE_ENV)

  const defaultConfig = requirePath(defaultPath)
  const envConfig = requirePath(envPath)

  return _.defaultsDeep({NODE_ENV}, envConfig, defaultConfig)
}
