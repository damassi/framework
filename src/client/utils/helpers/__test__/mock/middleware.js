/* eslint no-unused-vars: 0 */
export default spy => store => next => action => {
  spy()
  return next(action)
}
