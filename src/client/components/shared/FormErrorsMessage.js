import React, { Component, PropTypes } from 'react'
import { keysIn } from 'lodash'

export default class FormErrorsMessage extends Component {
  static propTypes = {
    formErrors: PropTypes.object.isRequired
  };

  handleClick(e) {
    e.preventDefault()
    const a = e.target
    const href = a.getAttribute('href').slice(1)
    const el = document.getElementById(href)
    scrollTo(el)
  }

  render() {
    const { formErrors } = this.props
    const numOfErrors = keysIn(formErrors).length

    return (
      <div className='alert alert-danger form-errors-message'>
        <strong>
          Error Submitting Form:
        </strong>

        { numOfErrors === 1
          ? ' 1 required field is empty '
          : ` ${numOfErrors} required fields are empty `}

          <ul className='p-l'>
            { Object.keys(formErrors).map((error, i) => {
              const id = error
              let labelText = ''

              try {
                const $label = document.querySelector(`[for="${id}"]`)
                labelText = ($label.textContent || $label.innerText).replace(/\W+/g, ' ')
              } catch (error) {
                labelText = `Need .form-control or id for ${id}`
              }

              return (
                <li key={i}>
                  <a href={'#' + id} onClick={this.handleClick.bind(this)}>
                    {labelText}
                  </a>
                </li>
              )
            })}
          </ul>
      </div>
    )
  }
}

function scrollTo(element) {
  const bodyRect = document.body.getBoundingClientRect()
  const elemRect = element.getBoundingClientRect()
  const offset = Math.round(elemRect.top - bodyRect.top)

  window.scrollTo(0, offset - 60)
}
