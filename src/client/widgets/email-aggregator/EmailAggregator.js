import React, { Component, PropTypes } from 'react'
import { createStore } from 'redux'
import { isArray, isEmpty, isString, without, uniq } from 'lodash'
import { validate as emailIsValid } from 'email-validator'
import validateClassNames from 'client/components/shared/utils/validate/validateClassNames'
import validateErrorText from 'client/components/shared/utils/validate/validateErrorText'

const types = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  INPUT: 'INPUT',
  IS_VALID: 'IS_VALID'
}

const initialState = () => ({
  emails: [],
  input: '',
  isValid: true
})

const reducer = (state = initialState(), action) => {
  switch (action.type) {
    case types.ADD:
      const emails = uniq(state.emails.concat([action.payload]))

      if (emails.length === state.emails.length) {
        return state
      }

      return {
        ...state,
        emails,
        input: '',
        isValid: true
      }

    case types.REMOVE:
      return {
        ...state,
        emails: without(state.emails, action.payload)
      }

    case types.INPUT:
      return {
        ...state,
        input: action.payload
      }

    case types.IS_VALID:
      return {
        ...state,
        isValid: action.payload
      }

    default:
      return state
  }
}

export default class EmailAggregator extends Component {

  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  };

  componentWillMount() {
    const { value } = this.props

    const initialRecipients = {
      ...initialState(),
      emails: getEmails(value)
    }

    this.store = createStore(reducer, initialRecipients)
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      const { emails } = this.store.getState()

      this.props.onUpdate(emails)
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleAddClick() {
    const emailAddress = this.refs.emailAddress.value

    if (isEmpty(emailAddress)) {
      return false
    }

    if (emailIsValid(emailAddress)) {
      this.store.dispatch({
        type: types.ADD,
        payload: emailAddress
      })
    } else {
      this.store.dispatch({
        type: types.IS_VALID,
        payload: false
      })
    }
  }

  handleRemoveClick(emailAddress) {
    this.store.dispatch({
      type: types.REMOVE,
      payload: emailAddress
    })
  }

  render() {
    const emails = getEmails(this.props.value)

    const store = this.store
    const handleAddClick = this.handleAddClick.bind(this)

    const {
      input: emailInput,
      isValid
    } = store.getState()

    let formClasses = validateClassNames(this.props) + ' m-a-0'

    if (!isValid) {
      formClasses = formClasses + ' has-error'
    }

    return (
      <div className={formClasses}>
        <div className='input-group'>
          <input
            value={emailInput}
            onChange={(event) => {
              store.dispatch({
                type: types.INPUT,
                payload: event.currentTarget.value
              })
            }}
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                event.preventDefault()
                handleAddClick()
              }
            }}
            ref='emailAddress'
            type='text'
            className='form-control'
            placeholder='Email Address'
            aria-describedby='issueHelpBlock'
          />
          <span className='input-group-btn'>
            <button className='btn btn-default' type='button' onClick={this.handleAddClick.bind(this)}>
              Add Email
            </button>
          </span>
        </div>
        { emails &&
          <ul className='email-aggregator'>
            { emails.map((email, i) =>
              <li key={i}>
                {email}
                <span
                  className='icon icon-cross'
                  onClick={this.handleRemoveClick.bind(this, email)}>
                </span>
              </li>)}
          </ul>}
          <p className='help-block'>
            { !isValid &&
              <span>
                The email you entered is invalid.
                <br />
              </span>}
            {validateErrorText(this.props)}
          </p>
      </div>
    )
  }
}

function getEmails(emails) {

  if (isString(emails)) {
    return emails.split(',')
  }

  if (isArray(emails)) {
    return emails
  }

  return []
}
