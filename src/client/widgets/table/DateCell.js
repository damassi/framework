import React, { Component, PropTypes } from 'react'
import getDate from 'client/components/shared/utils/getDate'

export default class DateCell extends Component {

  static propTypes = {
    date: PropTypes.string
  };

  render() {
    const { date } = this.props

    let formattedDate = date

    try {
      formattedDate = getDate(formattedDate)
    } catch (error) {
      //
    }

    return (
      <div>
        {formattedDate}
      </div>
    )
  }
}
