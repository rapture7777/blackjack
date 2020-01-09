import React, { Component } from 'react';

class Intro extends Component {
  handleSubmit = submitEvent => {
    submitEvent.preventDefault();
    this.props.getPlayerName(submitEvent);
  };
  render() {
    return (
      <header>
        <h1>Welcome to Blackjack!</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              name="playerNameInput"
              className="input"
              placeholder="Please enter your name..."
            />
            <button>Submit</button>
          </label>
        </form>
      </header>
    );
  }
}

export default Intro;
