import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Questions from '../components/Questions';

class Game extends Component {
  render() {
    const { getNome, getMd5, score } = this.props;
    const url = `https://www.gravatar.com/avatar/${getMd5}`;
    const rem = 8;
    return (
      <div className="login">
        <header className="card p-2 bd-highlight" style={ { width: `${rem}rem` } }>
          <img
            data-testid="header-profile-picture"
            className="card-img-top"
            src={ url }
            alt="ls"
          />
          <div className="card-body">
            <p className="card-text" data-testid="header-player-name">
              { getNome }
            </p>
            <p className="card-text" data-testid="header-score">{ score }</p>
          </div>
        </header>
        <div className="questions p-2 flex-grow-1 bd-highlight">
          <Questions />
        </div>
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
