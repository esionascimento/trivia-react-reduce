import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Questions from '../components/Questions';

class Game extends Component {
  render() {
    const { getNome, getMd5, score } = this.props;
    const url = `https://www.gravatar.com/avatar/${getMd5}`;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ url }
            alt="ls"
          />
          <p data-testid="header-player-name">
            { getNome }
          </p>
          <p data-testid="header-score">{ score }</p>
        </header>
        <Questions />
      </div>
    );
  }
}

Game.propTypes = {
  getNome: PropTypes.string.isRequired,
  getMd5: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  getNome: state.loginReducer.nome,
  getMd5: state.loginReducer.md5,
  score: state.loginReducer.score,
});

export default connect(mapStateToProps)(Game);
