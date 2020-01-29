import React, { Component } from 'react'
import './css/numeric-buttons.css'

class OperatorButton extends Component {
  getId = (text) => {
    switch (text) {
      case '=': return 'equals'
      case '+': return 'add'
      case '-': return 'subtract'
      case '*': return 'multiply'
      case '/': return 'divide'
      case 'C': return 'clear'
      default: return 'id-op'
    }
  }
  render() {
    const { text, operatorClick } = this.props
    return (
      <div className="calc-items">
        <button
          text={text}
          onClick={operatorClick}
          className='num-button'
          id={this.getId(text)}>
          {text}
        </button>
      </div>
    )
  }
}

export default OperatorButton
