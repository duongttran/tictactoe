import React, { Component } from 'react'
import Square from './Square'

export default class Board extends Component {
    renderSquare = (num) => {
        return <Square id={num} boxClick={this.boxClick} value={this.props.squares[num]} />
    }

    boxClick = (id) => {
        // let currentPointer = this.props.current;
        // currentPointer++;

        let squaresFromApp = this.props.squares
        if (this.calculateWinner(squaresFromApp) || squaresFromApp[id]) {
         
            return;
        }

        console.log("before change box clicked is", id)

        console.log("square you got is", squaresFromApp)
        squaresFromApp[id] = this.props.isXNext ? 'X' : 'O'
        console.log("after change", squaresFromApp)

        this.props.setTheState({
            squares: squaresFromApp,
            isXNext: !this.props.isXNext,
            history: [...this.props.history,  //why we don't need [...this.props.history.slice() here? [...] and slice()
            {
                squares: squaresFromApp.slice(),
                isXNext: !this.props.isXNext,
                //current: currentPointer
            }]
        })

        console.log("show this.props.setTheState", this.props.setTheState)

        //this.setState({squares: squaresFromApp, isXNext: !this.props.isXNext}) //why this doens't work?


        // let array = this.props.history
        // array = array.concat({squares:squaresFromApp.slice(), isXNext: !this.props.isXNext})

    }

    calculateWinner = (squares) => {
     
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                console.log("here is the winner", squares[a])
                
                // why winner render twice?
                return squares[a];
            }

        }
        return null;
    };

    

    render() {
        let status = ''
        let winner = this.calculateWinner(this.props.squares)
        let numOfMove = 0;

        for (let i = 0; i < 9; i++) {
            if (this.props.squares[i]) {
                numOfMove++;
            }
        }

        if (winner) {
            status = `The winner is: ${winner}`

        } else if (numOfMove >= 8) {
            status = `Tie game!`
        } else {
            status = `Next player: ${this.props.isXNext ? 'X' : 'O'}`
        }

        return (
            <div>
                <h2>{status}</h2>
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>

            </div>
        )
    }
}
