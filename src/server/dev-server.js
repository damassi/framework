import express from 'express'
import path from 'path'
import proxy from 'proxy-middleware'
import webpack from 'webpack'
import config from '../../webpack.config.dev'
import { PORT, API_PORT } from 'shared/configuration'

const app = express()
const compiler = webpack(config)

app.use(require('webpack-hot-middleware')(compiler))
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}))

app.set('query parser', 'extended')
app.use(express.static('public'))
app.use('/api', proxy(`http://localhost:${API_PORT}`))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'))
})

app.listen(PORT, (err) => {
  /* eslint no-console: 0 */
  if (err) {
    console.log(err)
    return
  }

  console.log(`dev-server listening at http://localhost:${PORT}`)
})
