import React, { Component } from 'react'
import orange from '../orange.gif'
import avocado from '../avocado.gif'

export default class Square extends Component {
    render() {
        let image;
        if(this.props.value === 'X') {
            image = `url(${orange})`
        } else if(this.props.value === 'O') {
            image = `url(${avocado})`
        }
        return (
            <div className="box" style={{backgroundImage: image}} onClick={()=> this.props.boxClick(this.props.id)}>

            </div>
        )
    }
}
