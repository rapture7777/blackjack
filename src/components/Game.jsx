import React, { Component } from 'react';
import images from '../img/img';

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
      '6C': 6,
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
    playerLoses: false,
    playerPush: false,
    dealerCardUncovered: false
  };

  deal = () => {
    this.resetPlay();
    const copyDeck = [...Object.entries(this.state.deck)];
    const copyPlayerHand = [];
    const copyDealerHand = [];

    const generateIndex = () => {
      return Math.floor(Math.random() * Math.floor(52));
    };

    const drawCard = hand => {
      const drawnCard = [...copyDeck[generateIndex()]];
      let playerCardDuplicate = false;
      let dealerCardDuplicate = false;
      copyPlayerHand.forEach(function(card) {
        if (card.includes(drawnCard[0])) playerCardDuplicate = true;
      });
      copyDealerHand.forEach(function(card) {
        if (card.includes(drawnCard[0])) dealerCardDuplicate = true;
      });
      if (playerCardDuplicate === false && dealerCardDuplicate === false) {
        hand.push(drawnCard);
      } else {
        drawCard(hand);
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

  resetPlay() {
    this.setState({
      playerWins: false,
      playerLoses: false,
      playerBlackjack: false,
      playerPush: false,
      playerHand: [],
      dealerHand: [],
      dealerCardUncovered: false
    });
  }

  playerBlackjack() {
    this.setState({
      playerBlackjack: true,
      isPlaying: false,
      dealerCardUncovered: true
    });
  }

  playerWins() {
    this.setState({
      playerWins: true,
      isPlaying: false,
      dealerCardUncovered: true
    });
  }

  playerPush() {
    this.setState({
      playerPush: true,
      isPlaying: false,
      dealerCardUncovered: true
    });
  }

  playerLoses() {
    this.setState({
      playerLoses: true,
      isPlaying: false,
      dealerCardUncovered: true
    });
  }

  play() {
    if (this.state.playerHand[0][1] + this.state.playerHand[1][1] === 21) {
      this.playerBlackjack();
    } else if (
      this.state.playerHand[0][1] + this.state.playerHand[1][1] ===
      22
    ) {
      this.setState(() => {
        let copyHand = [...this.state.playerHand];
        copyHand[1][1] = 1;
        return { playerHand: copyHand, isPlaying: true };
      });
    } else {
      this.setState({ isPlaying: true });
    }
  }

  hit = () => {
    const copyDeck = Object.entries(this.state.deck);
    const copyPlayerHand = [...this.state.playerHand];
    const copyDealerHand = [...this.state.dealerHand];

    const generateIndex = () => {
      return Math.floor(Math.random() * Math.floor(52));
    };

    const drawCard = hand => {
      const drawnCard = [...copyDeck[generateIndex()]];
      let playerCardDuplicate = false;
      let dealerCardDuplicate = false;
      copyPlayerHand.forEach(function(card) {
        if (card.includes(drawnCard[0])) playerCardDuplicate = true;
      });
      copyDealerHand.forEach(function(card) {
        if (card.includes(drawnCard[0])) dealerCardDuplicate = true;
      });
      if (playerCardDuplicate === false && dealerCardDuplicate === false) {
        let handValue = hand.reduce((acc, card) => acc + card[1], 0);
        let handAce = hand.filter(card => /A/.test(card[0]));
        if (handAce.length) {
          if (handValue + drawnCard[1] > 21) {
            let handAceIndex;
            hand.forEach(function(card) {
              if (/A/.test(card[0])) {
                handAceIndex = hand.indexOf(card);
              }
            });
            hand[handAceIndex][1] = 1;
          }
          if (drawnCard[1] === 11 && handValue > 10) {
            drawnCard[1] = 1;
            hand.push(drawnCard);
          } else {
            hand.push(drawnCard);
          }
        } else if (!handAce.length) {
          if (drawnCard[1] === 11 && handValue > 10) {
            drawnCard[1] = 1;
            hand.push(drawnCard);
          } else {
            hand.push(drawnCard);
          }
        } else {
          hand.push(drawnCard);
        }
      } else {
        drawCard(hand);
      }
    };

    drawCard(copyPlayerHand);

    this.setState(
      {
        playerHand: copyPlayerHand
      },
      () => {
        let handValue = [...this.state.playerHand].reduce(
          (acc, card) => (acc += card[1]),
          0
        );
        if (handValue === 21) {
          this.playerBlackjack();
        } else if (handValue > 21) {
          this.playerLoses();
        }
      }
    );
  };

  stand = () => {
    let initialHandValue = [...this.state.dealerHand].reduce(
      (acc, card) => (acc += card[1]),
      0
    );
    let playerHandValue = [...this.state.playerHand].reduce(
      (acc, card) => (acc += card[1]),
      0
    );
    const copyDeck = [...Object.entries(this.state.deck)];
    const copyDealerHand = [...this.state.dealerHand];
    const copyPlayerHand = [...this.state.playerHand];

    if (initialHandValue === 21) {
      this.playerLoses();
    } else if (initialHandValue >= 17 && initialHandValue < 21) {
      if (initialHandValue > playerHandValue) this.playerLoses();
      if (initialHandValue === playerHandValue) this.playerPush();
      if (initialHandValue < playerHandValue) this.playerWins();
    } else {
      const generateIndex = () => {
        return Math.floor(Math.random() * Math.floor(52));
      };

      const drawCard = hand => {
        const drawnCard = [...copyDeck[generateIndex()]];
        let playerCardDuplicate = false;
        let dealerCardDuplicate = false;
        copyPlayerHand.forEach(function(card) {
          if (card.includes(drawnCard[0])) playerCardDuplicate = true;
        });
        copyDealerHand.forEach(function(card) {
          if (card.includes(drawnCard[0])) dealerCardDuplicate = true;
        });
        if (playerCardDuplicate === false && dealerCardDuplicate === false) {
          let handValue = hand.reduce((acc, card) => acc + card[1], 0);
          let handAce = hand.filter(card => /A/.test(card[0]));
          if (handAce.length) {
            let handAceIndex;
            hand.forEach(function(card) {
              if (/A/.test(card[0])) {
                handAceIndex = hand.indexOf(card);
              }
            });
            hand[handAceIndex][1] = 1;
            if (drawnCard[1] === 11 && handValue > 10) {
              drawnCard[1] = 1;
              hand.push(drawnCard);
            } else {
              hand.push(drawnCard);
            }
          } else if (!handAce.length) {
            if (drawnCard[1] === 11 && handValue > 10) {
              drawnCard[1] = 1;
              hand.push(drawnCard);
            } else {
              hand.push(drawnCard);
            }
          } else {
            hand.push(drawnCard);
          }
        } else {
          drawCard(hand);
        }
      };

      drawCard(copyDealerHand);

      this.setState(
        {
          dealerHand: copyDealerHand
        },
        () => {
          let hitHandValue = [...this.state.dealerHand].reduce(
            (acc, card) => (acc += card[1]),
            0
          );
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
          {this.state.playerPush && <h1>Push!</h1>}
          {this.state.playerLoses && <h1>You lose!</h1>}
          {!this.state.playerWins &&
            !this.state.playerBlackjack &&
            !this.state.playerLoses &&
            this.state.isPlaying && <h1>Hit or stand?</h1>}
        </header>
        <section className="dealerHand">
          <p>
            {this.state.dealerHand.length
              ? this.state.dealerHand.map(card => (
                  <img
                    key={card[0]}
                    src={
                      this.state.dealerCardUncovered ||
                      card[0] !== this.state.dealerHand[0][0]
                        ? images[card[0]]
                        : images.CB
                    }
                    className="cardImg"
                    alt={card[0]}
                    width="120"
                  ></img>
                ))
              : ''}
          </p>
          <p id="dealersHand">{this.props.dealerHand}</p>
        </section>
        <section className="playerHand">
          <p>
            {this.state.playerHand.length
              ? this.state.playerHand.map(card => (
                  <img
                    key={card[0]}
                    className="cardImg"
                    src={images[card[0]]}
                    alt={card[0]}
                  ></img>
                ))
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
