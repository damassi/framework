import ReactTestUtils from 'react-addons-test-utils'
import { get } from 'lodash'
import invariant from 'invariant'

export function shallowRender(element) {
  const renderer = ReactTestUtils.createRenderer()
  renderer.render(element)

  /* eslint no-nested-ternary: 0 */
  const component = renderer.getMountedInstance
    ? renderer.getMountedInstance()
    : (renderer._instance
        ? renderer._instance._instance
        : null)

  return {
    component,
    element: renderer.getRenderOutput()
  }
}

export function renderIntoDocument(element) {
  const component = ReactTestUtils.renderIntoDocument(element)

  return component
}

export function renderDecorator(element) {
  const component = ReactTestUtils.renderIntoDocument(element)
  const wrappedComponent = get(component, 'refs.wrappedInstance.refs.wrappedComponent', false)

  invariant(wrappedComponent,
    '(utils/helpers/testHelpers.js) \n' +
    'Error rendering decorator in test: `wrappedComponent` ref is undefined. Did you ' +
    'remember to add in <MyComponent ref=`wrappedComponent` /> in your @decorator definition?'
  )

  return {
    component: wrappedComponent
  }
}
