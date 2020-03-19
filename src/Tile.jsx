import React, { Component } from 'react';

export default class Tile extends Component {

    tileClick(props) {
        props.gameLoop(props.loc, props.turn)
    }
    render() {
        return (
            <div className={'tile'}  onClick={() => this.tileClick(this.props)}>
                <p>{this.props.value}</p>
            </div>
        )
    }
}