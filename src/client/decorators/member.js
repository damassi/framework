/**
 * The @member() decorator is used for retriving individual entities from the DAM and
 * injecting the results into a component for display.
 *
 *    USAGE:
 *
 *    @member('someResourceKey')
 *    export default class BasicForm extends Component {
 *      ...
 *    }
 *
 *    @member('someResourceKey', { fetch: true })
 *    export default class BasicForm extends Component {
 *      ...
 *    }
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { get, isEmpty } from 'lodash'
import invariant from 'invariant'
import { scrollToTop } from 'client/components/shared/utils/scroll'
import returnAction from 'client/actions/resource/utils/returnAction'

export default function member(resourceKey, { fetch = false } = {}) {

  invariant(resourceKey,
    '(decorators/member.js) \n' +
    'Error decorating member: Cannot find `resourceKey`. Check your @member ' +
    'implementation.'
  )

  return (Member) => {

    @connect(state => ({
      member: state[resourceKey].member || {},
      showPreloader: state.app.showPreloader,
      resourceKey
    }))
    class MemberDecorator extends Component {

      static propTypes = {
        dispatch: PropTypes.func.isRequired,
        member: PropTypes.object.isRequired,
        resourceKey: PropTypes.string.isRequired,
        showPreloader: PropTypes.bool.isRequired,

        // FIXME: Why does this prop vanish?
        params: PropTypes.object
      };

      componentDidMount() {
        if (fetch) {
          this.loadPage()
        }

        scrollToTop()
      }

      loadPage() {
        const { dispatch, params } = this.props
        const get = returnAction('get', resourceKey)

        dispatch(get(params.providerId))
      }

      redirectToEdit() {
        const { dispatch, params, resourceKey } = this.props
        const editRoute = `/${resourceKey}/${params.providerId}/edit`

        dispatch(pushPath(editRoute))
      }

      render() {
        const { member, params } = this.props
        const providerId = get(params, 'providerId') || get(member, '$.id')

        return (
          isEmpty(member) ? null :

          <div>
             <Member
                {...this.props}
                providerId={providerId}
                edit={this.redirectToEdit.bind(this)}
                ref='wrappedComponent'
              />
          </div>
        )
      }
    }

    return MemberDecorator
  }
}
