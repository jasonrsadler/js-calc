import React, { Component } from 'react';
import './css/App.css'
import CalcButtons from './calc-buttons';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayText: '0',
      buttons: [1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', 0, 'C', '=', '/', '.'],
      operationsMem: [],
      equalsPushed: false
    }
  }

  operations = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
    '*': function (x, y) { return x * y },
    '/': function (x, y) { return x / y }
  }

  negative = false;

  numberClick = (e) => {
    let num = e.target.innerText
    if (this.negative) {
      num *= -1
      this.negative = false
    }
    if (num === '.' && this.state.displayText.includes('.')) {
      return
    }
    if (!isNaN(this.state.displayText) && this.state.displayText !== '0' && !this.state.equalsPushed) {
      num = this.state.displayText + num.toString()
    }
    if (this.state.equalsPushed) {
      this.setState({
        displayText: num,
        equalsPushed: false
      })
    }
    this.setState({
      displayText: num,
      equalsPushed: false
    })
  }

  operatorClick = (e) => {
    if (e.target.innerText === 'C') {
      const clear = {
        displayText: '0',
        operationsMem: [],
        equalsPushed: false
      }
      this.setState(clear)
      return
    }

    if (!isNaN(this.state.displayText) && !this.state.equalsPushed) {
      this.state.operationsMem.push(this.state.displayText)
      if (e.target.innerText !== '=') {
        if (e.target.innerText === '-' && isNaN(this.state.operationsMem[this.state.operationsMem.length - 1])) {
          this.negative = true
        } else {
          this.state.operationsMem.push(e.target.innerText)
        }
      }
    } else if (e.target.innerText !== '=') {
      if (e.target.innerText === '-' && isNaN(this.state.operationsMem[this.state.operationsMem.length - 1])) {
        this.negative = true
      } else {
        this.negative = false
        this.state.operationsMem.push(e.target.innerText)
      }
    }

    if (e.target.innerText === '=') {
      const result = this.runMath()
      const answer = []
      answer.push(result)
      this.setState({
        equalsPushed: true,
        displayText: result,
        operationsMem: answer
      })
      return
    }

    this.setState({
      displayText: e.target.innerText
    })
  }

  runMath = () => {
    let op
    if (this.state.operationsMem.length < 3) {
      return
    }

    const result = this.state.operationsMem.reduce((acc, current, ix) => {
      if (ix === 0) {
        return current
      } else if (isNaN(current)) {
        op = current
        return acc
      }
      return this.operations[op](Number(acc), Number(current))
    }, 0)
    return result
  }

  render() {
    return (
      <div className="calc">
        <div className="calc-display">
          <span className="display-text" id="display">
            {this.state.displayText}
          </span>
        </div>
        <div>
          <CalcButtons
            buttons={this.state.buttons}
            numberClick={this.numberClick}
            operatorClick={this.operatorClick} />
        </div>
      </div>
    );
  }
}

export default App;
