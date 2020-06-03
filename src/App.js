import React, { Component } from 'react'
import Board from './components/Board'
import './App.css';


import FacebookLogin from 'react-facebook-login';
const apiKey = process.env.REACT_APP_APIKEY


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
      history: [{ squares: Array(9).fill(null), isXNext: false }], // {square: square at that moment, isXNext....}
      //current: id,
      topRank: [],
      //user: null,
      login: false,
      facebookData:null
    }
  }

  responseFacebook = (response) => {
    console.log(response);
    this.setState({ login: true })
    this.setState({
      facebookData: response
    })

  }

  setTheState = (obj) => {
    this.setState(obj)
  }


  timeTravel(id) {
    let historyCut = this.state.history.slice()
    historyCut.splice(id+1)

    this.setState({
      squares: this.state.history[id].squares.slice(),
      isXNext: this.state.history[id].isXNext,
      history: historyCut
    })
  }

  sendDataToServer = async() => {
    let data = new URLSearchParams();
    data.append("player", this.state.facebookData.name);
    data.append("score", "TIME_ELAPSED_IN_SECONDS");
    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data.toString(),
        json: true
    });
}


  render() {
    console.log("history is ", this.state.history)
    return (
      <div className="main-stage">
        <div className="board"><Board {...this.state} setTheState={this.setTheState} /></div>
        <div className="history">
          <h2>History</h2>
          <div className="history-list">
            {this.state.history.map((item, idx) => <div><button onClick={() => this.timeTravel(idx)}>Move {idx}</button></div>)}
          </div>
        </div>

        <div className="App">

          {
            this.state.facebookData && this.state.login ?<div> <h1>{this.state.facebookData.name}</h1><img src={this.state.facebookData.picture.data.url}></img></div>:
            <FacebookLogin
            
              appId={apiKey}
              autoLoad={false}
              fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="my-facebook-button-class"
              icon="fa-facebook"
            />
          }


        </div>

      </div>
    )
  }
}
