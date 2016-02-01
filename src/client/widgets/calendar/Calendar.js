import React, { Component, PropTypes } from 'react'
import DayPicker from 'react-day-picker'
import closeOnClickOutside from 'react-click-outside'
import moment from 'moment'
import { get, isEmpty, isDate, isString, memoize } from 'lodash'
import { addDayToRange, isDayInRange, isSameDay } from 'client/widgets/calendar/utils/calendarUtils'

@closeOnClickOutside
export default class Calendar extends Component {
  /* eslint react/prop-types: 0 */

  static propTypes = {
    value: PropTypes.any.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    disabled: false,
    numberOfMonths: 1,
    showIcon: true,
    value: ''
  };

  state = {
    showCalendar: false
  };

  onCalendarChange(day) {
    const {
      onChange,
      onInputChange
    } = this.props

    onChange(day)

    if (onInputChange) {
      setTimeout(() => {
        onInputChange(day)
      })
    }
  }

  handleDayClick(event, day) {
    this.refs.input.focus()

    const { numberOfMonths, value } = this.props

    const calendarValue = numberOfMonths > 1
      ? addDayToRange(day, value)
      : day

    this.onCalendarChange(calendarValue)

    if (numberOfMonths === 1) {
      this.setState({
        showCalendar: false
      })
    }
  }

  handleToggleClick() {
    const { showCalendar } = this.state

    if (this.props.disabled) {
      return false
    }

    this.setState({
      showCalendar: !showCalendar
    })
  }

  handleClickOutside() {
    this.setState({
      showCalendar: false
    })
  }

  handleBlur() {
    this.props.onBlur(this.props.value)
  }

  handleChange(inputValue) {
    const value = isEmpty(inputValue)
      ? inputValue
      : this.props.value

    this.onCalendarChange(value)
  }

  handleBackspaceKey(event) {
    if (event.keyCode === 8) {
      this.handleChange('')
    }
  }

  render() {
    const { showCalendar } = this.state

    const {
      children,
      disabled,
      numberOfMonths,
      showIcon,
      value
    } = this.props

    // Add the `selected` modifier to the cell corresponding to the day that
    // has been clicked. The cell will have a `DayPicker-Day--selected` CSS class.
    const modifiers = {
      selected: numberOfMonths === 1
        ? memoize((day) => isSameDay(value, day))
        : memoize((day) => isDayInRange(day, value))
    }

    return (
      <div className='input-group' style={{ width: '100%' }}>
        { showIcon &&
          <div className='input-group-addon' onClick={this.handleToggleClick.bind(this)}>
            <span className='icon icon-calendar'></span>
          </div> }

        { React.Children.map(children, (DateInput, index) => {
          let day = value

          if (numberOfMonths > 1) {
            day = getRange(day)
          } else {
            if (isDate(day)) {
              day = day.toLocaleDateString()
            } else if (isString(day) && day.length) {
              day = new Date(day).toLocaleDateString()
            }
          }

          // Render <input> element child that captures date range
          return (
            React.cloneElement(DateInput, {
              ...DateInput.props,
              disabled,
              ref: 'input',
              value: day,
              key: `calendar-${index}`,
              onClick: this.handleToggleClick.bind(this),
              onBlur: this.handleBlur.bind(this),
              onFocus: this.handleBlur.bind(this),
              onChange: this.props.onInputChange || this.props.onChange,
              onKeyDown: this.handleBackspaceKey.bind(this)
            })
          )
        })}

        { showCalendar &&
          <DayPicker
            enableOutsideDays
            numberOfMonths={numberOfMonths}
            modifiers={modifiers}
            onDayClick={this.handleDayClick.bind(this)}
          /> }
      </div>
    )
  }
}

function getRange(days) {
  const fromDate = getDate(get(days, 'from', ''))
  const toDate = getDate(get(days, 'to', ''))
  const invalid = [fromDate, toDate].some(day => day.includes('Invalid'))

  if (invalid) {
    return ''
  }

  return `${fromDate} - ${toDate}`
}

function getDate(date, dateFormat = 'MM/DD/YYYY') {
  return moment(date).format(dateFormat)
}
