/**
 * The @collection() decorator is used for retriving records from the DAM and injecting
 * the results into a component.
 *
 *    USAGE:
 *
 *    @collection('someResourceKey')
 *    export default class BasicForm extends Component {
 *      ...
 *    }
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { isEmpty, isEqual, isUndefined } from 'lodash'
import invariant from 'invariant'
import { scrollToTop } from 'client/components/shared/utils/scroll'
import returnQuery from 'client/utils/search/returnQuery'
import returnAction from 'client/actions/resource/utils/returnAction'
import { resourceQuery as buildResourceQuery } from 'client/utils/search/searchApi'

export default function collection(resourceKey) {

  invariant(resourceKey,
    '(decorators/collection.js) \n' +
    'Error decorating member: Cannot find `resourceKey`. Check your @collection ' +
    'implementation.'
  )

  return (Collection) => {

    @connect(state => {
      return {
        collection: state[resourceKey].collection,
        entityType: state[resourceKey].entityType,

        // FIXME: Grab this from this.props.params
        page: Number(state.routing.path.split('/').pop()),
        query: state[resourceKey].query,
        searchText: state[resourceKey].searchText,
        sort: state[resourceKey].sort
      }
    })
    class CollectionDecorator extends Component {

      static propTypes = {
        entityType: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
        collection: PropTypes.shape({
          entities: PropTypes.array.isRequired,
          found: PropTypes.number.isRequired,
          start: PropTypes.number.isRequired
        }),
        page: PropTypes.number.isRequired,
        sort: PropTypes.object.isRequired,
        searchText: PropTypes.string.isRequired,
        query: PropTypes.object
      };

      componentDidMount() {
        this.buildQuery()
      }

      componentDidUpdate(prevProps) {
        const {
          entityType,
          dispatch,
          query,
          page,
          searchText,
          sort,
        } = this.props

        if (
          isUndefined(query) ||
          !isEqual(entityType, prevProps.entityType) ||
          !isEqual(page, prevProps.page) ||
          !isEqual(searchText, prevProps.searchText) ||
          !isEqual(sort, prevProps.sort)
        ) {
          this.buildQuery()
        } else if (!isEqual(query, prevProps.query)) {
          const search = returnAction('search', resourceKey)

          dispatch(search(query))
          scrollToTop()
        }
      }

      buildQuery() {
        const {
          entityType,
          dispatch,
          page,
          sort,
          searchText
        } = this.props

        const executeQuery = returnQuery(
          resourceKey,
          dispatch,
          buildResourceQuery(resourceKey)
        )

        executeQuery({
          options: {
            entityType,
            page,
            sort
          },
          searchText
        })
      }

      render() {
        const { collection } = this.props

        return (
          <div>
            { isEmpty(collection)
              ? <div />
              : <Collection
                  {...this.props}
                  resourceKey={resourceKey}
                  ref='wrappedComponent'
                /> }
          </div>
        )
      }
    }

    return CollectionDecorator
  }
}
