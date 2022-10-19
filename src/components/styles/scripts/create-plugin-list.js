/* eslint-disable no-undef */
import fs from 'fs'
import path from 'path'
import { corePlugins } from '../src/plugin/core-plugins.js'

const corePluginList = Object.keys(corePlugins)

fs.writeFileSync(
  path.join(process.cwd(), 'src', 'plugin', 'core-plugin-list.js'),
  `export default ${JSON.stringify(corePluginList)};`
)
