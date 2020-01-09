import React, { Component } from 'react';

class Game extends Component {
  render() {
    return (
      <main>
        <p>Dealer hand: </p>
        <p id="dealersHand">{this.props.dealerHand}</p>
        <p>Player hand:</p>
        <p id="playersHand">{this.props.playerHand}</p>
        <button>Deal</button>
      </main>
    );
  }
}

export default Game;
