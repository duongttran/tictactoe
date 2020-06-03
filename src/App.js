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
      facebookData: null,
      winner: null, 
      dataFromServer: []
    }
    this.getDataFromServer();
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
    const name = this.state.facebookData ? this.state.facebookData.name : "anonymous";
    data.append("player", name);
    data.append("score", 10);
    const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data.toString(),
        json: true
    });
}

getDataFromServer = async () => {
  const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
  const response = await fetch(url, {
      method: "GET"
  });
  const data = await response.json();
console.log("this is data get from server", data)
this.setState({dataFromServer: data});
}



  render() {
    console.log("history is ", this.state.history)


    // If user has loggedin
    if (this.state.login && this.state.facebookData) {
      return (
        <div className="main-stage">
          <div className="board"><Board {...this.state} setTheState={this.setTheState} sendDataFromApp={()=>this.sendDataToServer()} /></div>
          <div className="history">
            <h2>History</h2>
            <div className="history-list">
              {this.state.history.map((item, idx) => <div><button onClick={() => this.timeTravel(idx)}>Move {idx}</button></div>)}
            </div>
          </div>
          <div>
            <h3>Scores from other players</h3>
      {this.state.dataFromServer.items.map(item => <div><h3>{item.player}</h3><p>{item.score}</p></div>)}
          </div>

          <div className="App">

              <div> <h1>{this.state.facebookData.name}</h1><img src={this.state.facebookData.picture.data.url}></img></div>


          </div>

        </div>
      )
          } else {
            return <FacebookLogin
            
              appId={apiKey}
              autoLoad={false}
              fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="my-facebook-button-class"
              icon="fa-facebook"
            />
          }
  }
}
