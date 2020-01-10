import React, { Component } from 'react';

class Game extends Component {
  state = {
    playerHand: [],
    dealerHand: [],
    deck: {
      AC: 11,
      '2C': 2,
      '3C': 3,
      '4C': 4,
      '5C': 5,
      '6C': 5,
      '7C': 7,
      '8C': 8,
      '9C': 9,
      '10C': 10,
      JC: 10,
      QC: 10,
      KC: 10,
      AD: 11,
      '2D': 2,
      '3D': 3,
      '4D': 4,
      '5D': 5,
      '6D': 6,
      '7D': 7,
      '8D': 8,
      '9D': 9,
      '10D': 10,
      JD: 10,
      QD: 10,
      KD: 10,
      AH: 11,
      '2H': 2,
      '3H': 3,
      '4H': 4,
      '5H': 5,
      '6H': 6,
      '7H': 7,
      '8H': 8,
      '9H': 9,
      '10H': 10,
      JH: 10,
      QH: 10,
      KH: 10,
      AS: 11,
      '2S': 2,
      '3S': 3,
      '4S': 4,
      '5S': 5,
      '6S': 6,
      '7S': 7,
      '8S': 8,
      '9S': 9,
      '10S': 10,
      JS: 10,
      QS: 10,
      KS: 10
    },
    isPlaying: false,
    playerWins: false
  };

  // componentDidMount() {
  //   deal();
  // }

  deal = () => {
    if (this.state.playerWins) {
      this.setState(currentState => {
        return { playerWins: false };
      });
    }

    const copyDeck = Object.entries(this.state.deck);
    const copyPlayerHand = [];
    const copyDealerHand = [];

    const generateIndex = () => {
      return Math.floor(Math.random() * Math.floor(52));
    };

    const drawCard = hand => {
      const drawnCard = copyDeck[generateIndex()];
      if (
        !this.state.playerHand.includes(drawnCard) &&
        !this.state.dealerHand.includes(drawnCard)
      ) {
        hand.push(drawnCard);
      } else {
        drawCard();
      }
    };

    drawCard(copyPlayerHand);
    drawCard(copyDealerHand);
    drawCard(copyPlayerHand);
    drawCard(copyDealerHand);

    this.setState(
      currentState => {
        return {
          playerHand: copyPlayerHand,
          dealerHand: copyDealerHand
        };
      },
      () => {
        console.log(this.state.playerHand, this.state.dealerHand);
        this.play();
      }
    );
  };

  playerWinsFunc() {
    this.setState(currentState => {
      return { playerWins: !currentState.playerWins };
    });
  }

  play() {
    if (this.state.playerHand[0][1] + this.state.playerHand[1][1] === 21) {
      this.playerWinsFunc();
    } else {
      this.setState(currentState => {
        return { isPlaying: true };
      });
    }
  }

  render() {
    return !this.state.playerWins ? (
      <main>
        <p>
          Dealer hand:
          {this.state.dealerHand.length
            ? `${this.state.dealerHand[0]}, ${this.state.dealerHand[1]}`
            : ''}
        </p>
        <p id="dealersHand">{this.props.dealerHand}</p>
        <p>
          {this.props.playerName}'s hand:
          {this.state.playerHand.length
            ? `${this.state.playerHand[0]}, ${this.state.playerHand[1]}`
            : ''}
        </p>
        <p id="playersHand">{this.props.playerHand}</p>
        {!this.state.isPlaying && <button onClick={this.deal}>Deal</button>}
        {this.state.isPlaying && (
          <section>
            <button onClick={this.hit}>Hit</button>
            <button>Stand</button>
          </section>
        )}
      </main>
    ) : (
      <main>
        <h1>Blackjack!</h1>
        <p>
          {this.props.playerName}'s hand:
          {this.state.playerHand.length
            ? `${this.state.playerHand[0]}, ${this.state.playerHand[1]}`
            : ''}
        </p>
        <p id="playersHand">{this.props.playerHand}</p>
        <button onClick={this.deal}>Deal</button>
      </main>
    );
  }
}

export default Game;
