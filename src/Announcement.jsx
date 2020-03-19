import React, { Component } from 'react';
import './Announcement.css';
export default class Announcement extends Component {
    render() {
        return (
            <div className={this.props.winner ? 'visible' : 'hidden'}>
                {this.props.winner === 'x' || this.props.winner === 'o' ?  <h2>Winner :  {this.props.winner}</h2> : <h2>Winner No One</h2>}
            </div>
        )
    }
}