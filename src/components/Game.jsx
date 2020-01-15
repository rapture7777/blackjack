import React, { Component } from 'react';
import images from '../img/img';

class Game extends Component {
  state = {
    playerHand: [],
    dealerHand: [],
    deck: {
      AC: {
        value: 11,
        img: '../img/clubA.png'
      },
      '2C': {
        value: 2,
        img: '../img/club2.png'
      },
      '3C': {
        value: 3,
        img: '../img/club3.png'
      },
      '4C': {
        value: 4,
        img: '../img/club4.png'
      },
      '5C': {
        value: 5,
        img: '../img/club5.png'
      },
      '6C': {
        value: 6,
        img: '../img/club6.png'
      },
      '7C': {
        value: 7,
        img: '../img/club7.png'
      },
      '8C': {
        value: 8,
        img: '../img/club8.png'
      },
      '9C': {
        value: 9,
        img: '../img/club9.png'
      },
      '10C': {
        value: 10,
        img: '../img/club10.png'
      },
      JC: {
        value: 10,
        img: '../img/clubJ.png'
      },
      QC: {
        value: 10,
        img: '../img/clubQ.png'
      },
      KC: {
        value: 10,
        img: '../img/clubK.png'
      },
      AD: {
        value: 11,
        img: '../img/diamondA.png'
      },
      '2D': {
        value: 2,
        img: '../img/diamond2.png'
      },
      '3D': {
        value: 3,
        img: '../img/diamond3.png'
      },
      '4D': {
        value: 4,
        img: '../img/diamond4.png'
      },
      '5D': {
        value: 5,
        img: '../img/diamond5.png'
      },
      '6D': {
        value: 6,
        img: '../img/diamond6.png'
      },
      '7D': {
        value: 7,
        img: '../img/diamond7.png'
      },
      '8D': {
        value: 8,
        img: '../img/diamond8.png'
      },
      '9D': {
        value: 9,
        img: '../img/diamond9.png'
      },
      '10D': {
        value: 10,
        img: '../img/diamond10.png'
      },
      JD: {
        value: 10,
        img: '../img/diamondJ.png'
      },
      QD: {
        value: 10,
        img: '../img/diamondQ.png'
      },
      KD: {
        value: 10,
        img: '../img/diamondK.png'
      },
      AH: {
        value: 11,
        img: '../img/heartA.png'
      },
      '2H': {
        value: 2,
        img: '../img/heart2.png'
      },
      '3H': {
        value: 3,
        img: '../img/heart3.png'
      },
      '4H': {
        value: 4,
        img: '../img/heart4.png'
      },
      '5H': {
        value: 5,
        img: '../img/heart5.png'
      },
      '6H': {
        value: 6,
        img: '../img/heart6.png'
      },
      '7H': {
        value: 7,
        img: '../img/heart7.png'
      },
      '8H': {
        value: 8,
        img: '../img/heart8.png'
      },
      '9H': {
        value: 9,
        img: '../img/heart9.png'
      },
      '10H': {
        value: 10,
        img: '../img/heart10.png'
      },
      JH: {
        value: 10,
        img: '../img/heartJ.png'
      },
      QH: {
        value: 10,
        img: '../img/heartQ.png'
      },
      KH: {
        value: 10,
        img: '../img/heartK.png'
      },
      AS: {
        value: 11,
        img: '../img/spadeA.png'
      },
      '2S': {
        value: 2,
        img: '../img/spade2.png'
      },
      '3S': {
        value: 3,
        img: '../img/spade3.png'
      },
      '4S': {
        value: 4,
        img: '../img/spade4.png'
      },
      '5S': {
        value: 5,
        img: '../img/spade5.png'
      },
      '6S': {
        value: 6,
        img: '../img/spade6.png'
      },
      '7S': {
        value: 7,
        img: '../img/spade7.png'
      },
      '8S': {
        value: 8,
        img: '../img/spade8.png'
      },
      '9S': {
        value: 9,
        img: '../img/spade9.png'
      },
      '10S': {
        value: 10,
        img: '../img/spade10.png'
      },
      JS: {
        value: 10,
        img: '../img/spadeJ.png'
      },
      QS: {
        value: 10,
        img: '../img/spadeQ.png'
      },
      KS: {
        value: 10,
        img: '../img/spadeK.png'
      }
    },
    isPlaying: false,
    playerBlackjack: false,
    playerWins: false,
    playerLoses: false,
    playerPush: false
  };

  deal = () => {
    this.resetPlay();
    const copyDeck = Object.entries(this.state.deck);
    const copyPlayerHand = [];
    const copyDealerHand = [];

    const generateIndex = () => {
      return Math.floor(Math.random() * Math.floor(52));
    };

    const drawCard = hand => {
      const drawnCard = copyDeck[generateIndex()];
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
      dealerHand: []
    });
  }

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

  playerPush() {
    this.setState({ playerPush: true, isPlaying: false });
  }

  playerLoses() {
    this.setState({
      playerLoses: true,
      isPlaying: false
    });
  }

  play() {
    if (
      this.state.playerHand[0][1].value + this.state.playerHand[1][1].value ===
      21
    ) {
      this.playerBlackjack();
    } else if (
      this.state.playerHand[0][1].value + this.state.playerHand[1][1].value ===
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
      const drawnCard = copyDeck[generateIndex()];
      let playerCardDuplicate = false;
      let dealerCardDuplicate = false;
      copyPlayerHand.forEach(function(card) {
        if (card.includes(drawnCard[0])) playerCardDuplicate = true;
      });
      copyDealerHand.forEach(function(card) {
        if (card.includes(drawnCard[0])) dealerCardDuplicate = true;
      });
      if (playerCardDuplicate === false && dealerCardDuplicate === false) {
        let handValue = hand.reduce((acc, card) => acc + card[1].value, 0);
        let handAce = hand.filter(card => /A/.test(card[0]));
        if (handAce.length && handValue > 10) {
          let handAceIndex;
          hand.forEach(function(card) {
            if (/A/.test(card[0])) {
              handAceIndex = hand.indexOf(card);
            }
          });
          hand[handAceIndex][1].value = 1;
          if (drawnCard[0][1].value === 11 && handValue > 10) {
            drawnCard[0][1].value = 1;
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
          (acc, card) => (acc += card[1].value),
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
    let initialHandValue = 0;
    let playerHandValue = 0;
    [...this.state.dealerHand].forEach(
      card => (initialHandValue += card[1].value)
    );
    [...this.state.playerHand].forEach(
      card => (playerHandValue += card[1].value)
    );
    if (initialHandValue === 21) {
      this.playerLoses();
    } else if (initialHandValue >= 17) {
      if (initialHandValue > playerHandValue) this.playerLoses();
      else if (initialHandValue === playerHandValue) this.playerPush();
      else if (initialHandValue < playerHandValue) this.playerWins();
    } else {
      const copyDeck = Object.entries(this.state.deck);
      const copyDealerHand = [...this.state.dealerHand];
      const copyPlayerHand = [...this.state.playerHand];

      const generateIndex = () => {
        return Math.floor(Math.random() * Math.floor(52));
      };

      // const drawCard = hand => {
      //   const drawnCard = copyDeck[generateIndex()];
      //   let playerCardDuplicate = false;
      //   let dealerCardDuplicate = false;
      //   copyPlayerHand.forEach(function(card) {
      //     if (card.includes(drawnCard[0])) playerCardDuplicate = true;
      //   });
      //   copyDealerHand.forEach(function(card) {
      //     if (card.includes(drawnCard[0])) dealerCardDuplicate = true;
      //   });
      //   if (playerCardDuplicate === false && dealerCardDuplicate === false) {
      //     hand.push(drawnCard);
      //   } else {
      //     drawCard(hand);
      //   }
      // };

      const drawCard = hand => {
        const drawnCard = copyDeck[generateIndex()];
        let playerCardDuplicate = false;
        let dealerCardDuplicate = false;
        copyPlayerHand.forEach(function(card) {
          if (card.includes(drawnCard[0])) playerCardDuplicate = true;
        });
        copyDealerHand.forEach(function(card) {
          if (card.includes(drawnCard[0])) dealerCardDuplicate = true;
        });
        if (playerCardDuplicate === false && dealerCardDuplicate === false) {
          let handValue = hand.reduce((acc, card) => acc + card[1].value, 0);
          let handAce = hand.filter(card => /A/.test(card[0]));
          if (handAce.length && handValue > 10) {
            let handAceIndex;
            hand.forEach(function(card) {
              if (/A/.test(card[0])) {
                handAceIndex = hand.indexOf(card);
              }
            });
            hand[handAceIndex][1].value = 1;
            if (drawnCard[0][1].value === 11 && handValue > 10) {
              drawnCard[0][1].value = 1;
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
          let hitHandValue = 0;
          [...this.state.dealerHand].forEach(
            card => (hitHandValue += card[1].value)
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
                    src={images[card[0]]}
                    className="cardImg"
                    alt={card[0]}
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
