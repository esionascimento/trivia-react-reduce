import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedBackHeader from './FeedBackHeader';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rankingOn: false };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { nome, score, md5 } = this.props;

    const gravatarEmail = `https://www.gravatar.com/avatar/${md5}`;
    if (localStorage.ranking) {
      const filteredRanking = JSON.parse(localStorage.ranking);
      const aux = [...filteredRanking, { gravatarEmail, nome, score }];
      localStorage.ranking = JSON.stringify(aux);
      return aux;
    }
    localStorage.ranking = JSON.stringify([{ gravatarEmail, nome, score }]);
  }

  handleClick() {
    this.setState({ rankingOn: true });
  }

  render() {
    const { rankingOn } = this.state;
    const { assertions, score } = this.props;
    const assert = 3;
    if (rankingOn) return <Redirect to="/ranking" />;
    return (
      <main>
        <FeedBackHeader />
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-text">
          { assertions >= assert
            ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
        <Link
          data-testid="btn-play-again"
          to="/"
        >
          Jogar novamente
        </Link>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-ranking"
        >
          Ver Ranking
        </button>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.loginReducer.assertions,
  score: state.loginReducer.score,
  md5: state.loginReducer.md5,
  nome: state.loginReducer.nome,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  md5: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
