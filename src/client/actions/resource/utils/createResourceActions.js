/**
 * All actions used within a resource should be created here. Each action is composed
 * together and namespaced, so that additional resources can be added horizontally.
 */

import init from 'shared/utils/initializeResourceHandlers'
import create from 'client/actions/resource/create'
import edit from 'client/actions/resource/edit'
import filter from 'client/actions/resource/filter'
import initGet from 'client/actions/resource/get'
import invalidateCache from 'client/actions/resource/invalidateCache'
import invalidateQuery from 'client/actions/resource/invalidateQuery'
import query from 'client/actions/resource/query'
import remove from 'client/actions/resource/remove'
import search from 'client/actions/resource/search'
import searchText from 'client/actions/resource/searchText'
import sort from 'client/actions/resource/sort'
import updateEntityType from 'client/actions/resource/updateEntityType'
import updateForm from 'client/actions/resource/updateForm'

export default function initializeResourceActions(...rest) {

  const actions = {
    create,
    edit,
    get: initGet,
    filter,
    invalidateCache,
    invalidateQuery,
    query,
    remove,
    search,
    searchText,
    sort,
    updateEntityType,
    updateForm
  }

  return init(actions, ...rest)
}
