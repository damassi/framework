import { pushPath } from 'redux-simple-router'
import invariant from 'invariant'
import * as url from 'shared/utils/url'

export default function rowSelector(resourceKey) {
  invariant(resourceKey,
    '(client/widgets/table/utils/rowSelector.js) \n' +
    'Error creating rowSelector: `resourceKey` is undefined.'
  )

  return ({ row, dispatch }) => {
    return {
      onClick: (event) => {
        if (event.target.tagName !== 'A') {
          dispatch(pushPath(url.member(resourceKey, row.$.id)))
        }
      }
    }
  }
}
