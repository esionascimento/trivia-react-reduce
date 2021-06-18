import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { questionAction, scoreAction, assertionAction } from '../actions';
import './Questions.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
      seconds: 30,
      buttonsDisabled: false,
      questionIndex: 0,
      difficuldade: 0,
      acertos: 0,
    };
    this.multipleQuestion = this.multipleQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.funDificuldade = this.funDificuldade.bind(this);
    this.ranking = this.ranking.bind(this);
  }

  componentDidMount() {
    const { token, dispatchQuestions } = this.props;
    const ONE_SECOND = 1000;
    const FIVE_SECONDS = 5000;
    dispatchQuestions(token);
    this.countdownInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState({ seconds: seconds - 1 });
      }
      if (seconds === 0) {
        this.setState({ buttonsDisabled: true });
        setTimeout(() => { this.setState({ active: true }); }, FIVE_SECONDS);
      }
    }, ONE_SECOND);
    this.ranking();
  }

  funDificuldade() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    if (questions[questionIndex].difficulty === 'hard') {
      this.setState({ difficuldade: 3 });
    } else if (questions[questionIndex].difficulty === 'medium') {
      this.setState({ difficuldade: 2 });
    } else {
      this.setState({ difficuldade: 1 });
    }
  }

  ranking() {
    const { nomeState, tokenState, scoreState, dispatchAssertion } = this.props;
    const { acertos } = this.state;
    const player = {
      player: {
        name: nomeState,
        assertions: acertos,
        score: scoreState,
        gravatarEmail: `https://www.gravatar.com/avatar/${tokenState}`,
      },
    };
    dispatchAssertion(acertos);
    const playerObj = JSON.stringify(player);
    localStorage.setItem('state', playerObj);
  }

  async handleClick(e) {
    const { dispatchScore, scoreState } = this.props;
    const { seconds, difficuldade, acertos } = this.state;
    const acertou = e.target.value;
    this.funDificuldade();
    const SOMA_ACE = 10;
    const resul = scoreState + SOMA_ACE + (seconds * difficuldade);
    if (acertou === 'acertou') {
      console.log(resul);
      await dispatchScore(resul);
      this.setState({ acertos: acertos + 1 });
    }
    this.setState({ active: true });
    this.ranking();
  }

  nextQuestion() {
    const { questions } = this.props;
    const { questionIndex, redirect } = this.state;
    console.log(questionIndex);
    console.log(redirect);
    if (questionIndex === questions.length - 1) {
      this.setState({ redirect: true });
    }
    this.setState({
      questionIndex: questionIndex + 1,
      seconds: 30,
      active: false,
    });
  }

  multipleQuestion(param) {
    const { category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = param;
    const { active, seconds, buttonsDisabled } = this.state;
    return (
      <div className="quizz">
        <h3 data-testid="question-category">{ category }</h3>
        <p data-testid="question-text">{ question }</p>
        <button
          value="acertou"
          onClick={
            this.handleClick
          }
          className={ active ? 'acertou' : null }
          type="button"
          data-testid="correct-answer"
          disabled={ buttonsDisabled }
        >
          { correctAnswer }
        </button>
        { incorrectAnswers.map((item, index) => (
          <button
            value="errou"
            onClick={ this.handleClick }
            className={ active ? 'errou' : null }
            type="button"
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            disabled={ buttonsDisabled }
          >
            { item }
          </button>
        ))}
        <h2>{ seconds }</h2>
      </div>
    );
  }

  renderNextButton() {
    return (
      <div className="button-next">
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.nextQuestion() }
        >
          Próxima
        </button>
      </div>
    );
  }

  render() {
    const { questions } = this.props;
    const { questionIndex, active } = this.state;
    const limit = 5;
    if (questionIndex === limit) return <Redirect to="/feedback" />;
    return (
      <main>
        <div id="login-box" className="login-box col-md-12">
          <div>
            { questions.length > 0 ? this.multipleQuestion(questions[questionIndex])
              : null }
          </div>
          { active ? this.renderNextButton() : null }
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  questions: state.questionsReducer.questions,
  scoreState: state.loginReducer.score,
  nomeState: state.loginReducer.nome,
  tokenState: state.loginReducer.token,
  emailState: state.loginReducer.email,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchQuestions: (questions) => dispatch(questionAction(questions)),
  dispatchScore: (score) => dispatch(scoreAction(score)),
  dispatchAssertion: (score) => dispatch(assertionAction(score)),
});

Questions.propTypes = {
  token: PropTypes.string.isRequired,
  dispatchQuestions: PropTypes.func.isRequired,
  dispatchScore: PropTypes.func.isRequired,
  dispatchAssertion: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(Object).isRequired,
  scoreState: PropTypes.number.isRequired,
  nomeState: PropTypes.string.isRequired,
  tokenState: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
