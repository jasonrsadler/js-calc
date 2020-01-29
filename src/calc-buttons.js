import React, { Component } from "react";
import NumericButton from "./numeric-button";
import OperatorButton from './operator-button';
import './css/calc-buttons.css'

class CalcButtons extends Component {
  renderButtons = () => {
    const { buttons, numberClick, operatorClick } = this.props
    return buttons.map((button, ix) => {
      return (
        !isNaN(button) || button === '.' ?
          <NumericButton key={button + '_' + ix} text={button} numberClick={numberClick} />
          :
          <OperatorButton key={button + '_' + ix} text={button} operatorClick={operatorClick} />
      )
    })
  }

  render() {
    return (
      <div className="calc-box">
        {this.renderButtons()}
      </div>
    )
  }
}

export default CalcButtons