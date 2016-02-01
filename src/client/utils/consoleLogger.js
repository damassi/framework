/**
 * When building to production, logging is turned off. Sometimes, however, we need to
 * see what queries are being sent to Elastic Search, and so this utility is included.
 *
 *   USAGE:
 *
 *   Open browser console and enter `window._appLogger.toggle()`
 */

export default function consoleLogger() {
  window._appLogger = {
    isOn: false,

    toggle() {
      this.isOn = !this.isOn

      if (this.isOn) {
        window.__LOGGING_ENABLED__ = true
      } else {
        delete window.__LOGGING_ENABLED__
      }
    }
  }
}
