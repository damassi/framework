import 'babel-polyfill'
import { mixin } from 'lodash'

mixin(require('lodash-deep'))

const context = require.context('./src/', true, /\.spec\.(js|jsx)$/)
context.keys().forEach(context)
