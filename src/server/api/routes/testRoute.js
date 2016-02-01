import dam from 'ape-dam-entity-client'
import uuid from 'node-uuid'

export default function initializeTest(server) {

  server.post('/create-entity', async (req, res, next) => {
    try {
      const newProps = {
        $description: 'Testing creating new assignment',
        $name: 'Test Assignment',
        $type: [
          {
            $name: 'Photo Assignment',
            $id: 'type/photoAssignment',
          }
        ]
      }

      const response = await dam.updateEntity('dam', uuid.v1(), newProps, 'test_user')

      res.send(response)
    } catch (err) {
      res.log.error({ err })
      return next(err)
    }

    return next()
  })

  server.post('/edit-entity', async (req, res, next) => {
    try {
      const providerId = req.params.providerId
      const name = req.params.name
      const newProps = {
        ...name
      }

      const response = await dam.updateEntity('dam', providerId, newProps, 'test_user')

      res.send({
        response,
        providerId
      })
    } catch (error) {
      /* eslint no-console: 0 */

      console.log(error.stack)
      return next(error)
    }

    return next()
  })

  server.del('/delete-entity', async (req, res, next) => {
    try {
      const providerId = req.params.providerId
      const response = await dam.deleteEntity('dam', providerId, 'test_user')

      res.send({
        response,
        providerId
      })
    } catch (error) {
      console.log(error.stack)
      return next(error)
    }

    return next()
  })
}
