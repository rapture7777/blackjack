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
    playerBlackjack: false,
    playerWins: false,
    playerLoses: false
  };

  deal = () => {
    if (
      this.state.playerWins ||
      this.state.playerLoses ||
      this.state.playerBlackjack
    ) {
      this.setState({
        playerWins: false,
        playerLoses: false,
        playerBlackjack: false
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
      {
        playerHand: copyPlayerHand,
        dealerHand: copyDealerHand
      },
      () => {
        console.log(this.state.playerHand, this.state.dealerHand);
        this.play();
      }
    );
  };

  playerBlackjack() {
    this.setState({
      playerBlackjack: true,
      isPlaying: false
    });
  }

  playerWins() {
    this.setState({
      playerWins: true,
      isPlaying: false
    });
  }

  playerLoses() {
    this.setState({
      playerLoses: true,
      isPlaying: false
    });
  }

  play() {
    if (this.state.playerHand[0][1] + this.state.playerHand[1][1] === 21) {
      this.playerBlackjack();
    } else {
      this.setState({ isPlaying: true });
    }
  }

  hit = () => {
    const copyDeck = Object.entries(this.state.deck);
    const copyPlayerHand = [...this.state.playerHand];

    const generateIndex = () => {
      return Math.floor(Math.random() * Math.floor(52));
    };

    const drawCard = hand => {
      const drawnCard = copyDeck[generateIndex()];
      if (
        !copyPlayerHand.includes(drawnCard) &&
        !this.state.dealerHand.includes(drawnCard)
      ) {
        hand.push(drawnCard);
      } else {
        drawCard();
      }
    };

    drawCard(copyPlayerHand);

    this.setState(
      {
        playerHand: copyPlayerHand
      },
      () => {
        let handValue = 0;
        [...this.state.playerHand].forEach(card => (handValue += card[1]));
        if (handValue === 21) {
          this.playerBlackjack();
        } else if (handValue > 21) {
          this.playerLoses();
        }
      }
    );
  };

  stand = () => {
    let initialHandValue = 0;
    let playerHandValue = 0;
    [...this.state.dealerHand].forEach(card => (initialHandValue += card[1]));
    [...this.state.playerHand].forEach(card => (playerHandValue += card[1]));
    if (initialHandValue === 21) {
      this.playerLoses();
    } else if (initialHandValue > 17) {
      return initialHandValue > playerHandValue
        ? this.playerLoses()
        : this.playerWins();
    } else {
      const copyDeck = Object.entries(this.state.deck);
      const copyDealerHand = [...this.state.dealerHand];

      const generateIndex = () => {
        return Math.floor(Math.random() * Math.floor(52));
      };

      const drawCard = () => {
        const drawnCard = copyDeck[generateIndex()];
        if (
          !copyDealerHand.includes(drawnCard) &&
          !this.state.playerHand.includes(drawnCard)
        ) {
          copyDealerHand.push(drawnCard);
        } else {
          drawCard();
        }
      };

      drawCard(copyDealerHand);

      this.setState(
        {
          dealerHand: copyDealerHand
        },
        () => {
          let hitHandValue = 0;
          [...this.state.dealerHand].forEach(card => (hitHandValue += card[1]));
          if (hitHandValue === 21) {
            this.playerLoses();
          } else if (hitHandValue > 21) {
            this.playerWins();
          } else if (hitHandValue < 21 && hitHandValue > 17) {
            return hitHandValue > playerHandValue
              ? this.playerLoses()
              : this.playerWins();
          } else {
            this.stand();
          }
          console.log(this.state.playerHand, this.state.dealerHand);
        }
      );
    }
  };

  render() {
    return (
      <main>
        <header>
          {this.state.playerWins && <h1>You win!</h1>}
          {this.state.playerBlackjack && <h1>Blackjack!</h1>}
          {this.state.playerLoses && <h1>You lose!</h1>}
        </header>
        <section className="dealerHand">
          <p>
            Dealer hand:
            {this.state.dealerHand.length
              ? this.state.dealerHand.map(card => card[0])
              : ''}
          </p>
          <p id="dealersHand">{this.props.dealerHand}</p>
        </section>
        <section className="playerHand">
          <p>
            {this.props.playerName}'s hand:
            {this.state.playerHand.length
              ? this.state.playerHand.map(card => card[0])
              : ''}
          </p>
          <p id="playersHand">{this.props.playerHand}</p>
          {!this.state.isPlaying && <button onClick={this.deal}>Deal</button>}
          {this.state.isPlaying && (
            <section>
              <button onClick={this.hit}>Hit</button>
              <button onClick={this.stand}>Stand</button>
            </section>
          )}
        </section>
      </main>
    );
  }
}

export default Game;
