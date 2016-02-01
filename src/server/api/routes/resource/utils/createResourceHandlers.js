import create from 'server/api/routes/resource/create'
import edit from 'server/api/routes/resource/edit'
import initGet from 'server/api/routes/resource/get'
import remove from 'server/api/routes/resource/remove'
import init from 'shared/utils/initializeResourceHandlers'

export default function createResourceHandlers(...rest) {
  const handlers = {
    create,
    edit,
    get: initGet,
    remove
  }

  return init(handlers, ...rest)
}
