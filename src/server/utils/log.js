import config from 'ape-config'
import bunyan from 'bunyan'

const logName = config.get('LOG_NAME', 'edit-rights-www')
const logLevel = config.get('LOG_LEVEL', bunyan.INFO)

const logConfiguration = {
  name: logName,
  streams: [
    {
      name: 'console',
      type: 'stream',
      stream: process.stdout,
      level: logLevel
    }
  ],
  serializers: {
    ...bunyan.stdSerializers
  }
}

const log = bunyan.createLogger(logConfiguration)

export default log
