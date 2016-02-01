import ReactDOM from 'react-dom'

export default function isMounted(component) {
  // Exceptions for flow control :(
  try {
    ReactDOM.findDOMNode(component)
    return true
  } catch (error) {
    // Error: Invariant Violation: Component (with keys: props,context,state,refs,_reactInternalInstance) contains `render` method but is not mounted in the DOM
    return false
  }
}
