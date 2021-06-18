import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedBackHeader extends React.Component {
  render() {
    const { getMd5, getNome, score } = this.props;
    const url = `https://www.gravatar.com/avatar/${getMd5}`;
    return (
      <header>
        <img
          src={ url }
          data-testid="header-profile-picture"
          alt="avatar do usuário"
        />
        <p data-testid="header-player-name">
          {getNome}
        </p>
        <h2 data-testid="header-score">
          {score}
        </h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  getNome: state.loginReducer.nome,
  getMd5: state.loginReducer.getMd5,
  score: state.loginReducer.score,
});

FeedBackHeader.propTypes = {
  getMd5: PropTypes.string.isRequired,
  getNome: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedBackHeader);
