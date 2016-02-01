/**
 * Based upon https://github.com/arnaudbenard/redux-mock-store
 *
 */

import { expect } from 'chai'
import mockMiddleware from 'client/utils/helpers/__test__/mock/middleware'
import configureStore from 'client/utils/helpers/mockStore'

const mockStore = configureStore([])

describe('(client/utils/helpers/__test__/mockStore.js)', () => {
  it('throws an error if expectedActions is not an array', () => {
    expect(() => mockStore({}, {})).to.throw(/expectedActions/)
  })

  it('throws an error if done is not a function or undefined', () => {
    expect(() => mockStore({}, [], {})).to.throw(/done/)
  })

  it('returns the store if done is valid', () => {
    const store = mockStore({}, [], () => {})

    expect(store).to.exist
  })

  it('calls getState if it is a function', () => {
    const getState = sinon.spy()
    const store = mockStore(getState, [], () => {})

    store.getState()
    expect(getState.called).to.be.true
  })

  it('returns the initial state', () => {
    const initialState = { items: [], count: 0 }
    const store = mockStore(initialState, [], () => {})

    expect(store.getState()).to.eql(initialState)
  })

  it('should return if the tests is successful', (done) => {
    const action = { type: 'ADD_ITEM' }
    const store = mockStore({}, [action], done)

    store.dispatch(action)
  })

  it('should call the middleware', (done) => {
    const spy = sinon.spy()
    const middlewares = [mockMiddleware(spy)]
    const mockStoreWithMiddleware = configureStore(middlewares)
    const action = { type: 'ADD_ITEM' }

    const store = mockStoreWithMiddleware({}, [action], done)
    store.dispatch(action)
    expect(spy.called).to.be.true
  })
})
