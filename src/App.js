import React from 'react';
import './App.css';
import Intro from './components/Intro';
import Game from './components/Game';

class App extends React.Component {
  state = {
    playerName: '',
    isIntroVisible: true
  };

  getPlayerName = submitEvent => {
    let value = submitEvent.target.elements[0].value;
    if (value !== '') {
      this.setState(
        currentState => {
          return { playerName: value };
        },
        () => {
          console.log(this.state.playerName, '<--playerName');
          this.setState({
            isIntroVisible: false
          });
        }
      );
    }
  };

  render() {
    return (
      <main className="App">
        {this.state.isIntroVisible && (
          <Intro getPlayerName={this.getPlayerName} />
        )}
        {!this.state.isIntroVisible && (
          <Game playerName={this.state.playerName} />
        )}
      </main>
    );
  }
}

export default App;
