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
      isXNext: true
    }
  }

  setTheState = (obj) => {
    this.setState(obj)
    
  }


  render() {
    return (
      <div>
        <Board {...this.state} setTheState={this.setTheState} />
      </div>
    )
  }
}
