import React, { Component } from 'react'
import './css/numeric-buttons.css'

class NumericButton extends Component {
  getId = (text) => {
    switch (text) {
      case 0: return 'zero'
      case 1: return 'one'
      case 2: return 'two'
      case 3: return 'three'
      case 4: return 'four'
      case 5: return 'five'
      case 6: return 'six'
      case 7: return 'seven'
      case 8: return 'eight'
      case 9: return 'nine'
      case '.': return 'decimal'
      default: return 'id-num'
    }
  }
  render() {
    const { text, numberClick } = this.props
    return (
      <div className="calc-items">
        <button
          onClick={numberClick}
          className='num-button'
          id={this.getId(text)}>
          {text}
        </button>
      </div>
    )
  }
}

export default NumericButton
