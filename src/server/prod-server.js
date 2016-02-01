import express from 'express'
import path from 'path'
import proxy from 'proxy-middleware'
import { API_PORT, PORT } from 'shared/configuration'

const app = express()

app.use(express.static('dist'))
app.use('/api', proxy(`http://localhost:${API_PORT}`))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'))
})

app.listen(PORT, (err) => {
  /* eslint no-console: 0 */

  if (err) {
    console.log(err)
    return
  }

  console.log(`prod-server listening at http://localhost:${PORT}`)
})
