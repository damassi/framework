import { each, first } from 'lodash'

export default function getInitialState(state) {
  const out = {
    ...first(state)
  }

  each(out, (value, key) => {
    if (key !== '__panelId') {
      out[key] = ''
    }
  })

  return [out]
}
