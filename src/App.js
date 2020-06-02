// import React, {Component} from 'react';
// import Board from './components/Board'

// import './App.css';

// function App() {
//   return (
//     <div>

//     </div>
//   );
// }

// export default App;

import React, { Component } from 'react'
import Board from './components/Board'
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
      history: [{ squares: Array(9).fill(null), isXNext: false }] // {square: square at that moment, isXNext....}
    }
  }

  setTheState = (obj) => {
    this.setState(obj)

  }

  timeTravel(id) {
    this.setState({
      squares: this.state.history[id].squares.slice(),
      isXNext: this.state.history[id].isXNext,
    })
  }

  render() {
    console.log("history is ", this.state.history)
    return (
      <div className="main-stage">
        <div className="board"><Board {...this.state} setTheState={this.setTheState}/></div>
        <div className="history">
          <h2>History</h2>
          <div className="history-list">
            {this.state.history.map((item, idx) => <div><button onClick={() => this.timeTravel(idx)}>Move {idx}</button></div>)}
          </div>
        </div>
      </div>
    )
  }
}
