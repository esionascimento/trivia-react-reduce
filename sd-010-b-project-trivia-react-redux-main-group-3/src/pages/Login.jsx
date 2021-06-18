import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import fetchToken from '../services/index';
import { loginAction,
  emailAction, scoreAction, md5Action, nomeAction } from '../actions/index';

import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      redirect: false,
      settings: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyGameLogin = this.verifyGameLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  componentDidMount() {
    const { dispatchScore } = this.props;
    dispatchScore(0);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  verifyGameLogin() {
    const { name, email } = this.state;
    return !(name && email);
  }

  async handleClick() {
    const { email, name } = this.state;
    const { dispatchToken, dispatchEmail, dispatchMd5, dispatchNome } = this.props;
    const token = await fetchToken();
    localStorage.setItem('token', token.token);
    /* const localToken = localStorage.getItem('token'); */
    dispatchToken(token.token);
    dispatchEmail(email);
    const md5Email = md5(email).toString();
    dispatchMd5(md5Email);
    dispatchNome(name);
    this.setState({ redirect: true });
  }

  renderForm() {
    const { name, email } = this.state;
    return (
      <form className="login-form form">
        <h3 className="text-center text-black pt-5">Login</h3>
        <div className="form-group">
          <input
            data-testid="input-player-name"
            name="name"
            value={ name }
            placeholder="Seu Nome"
            onChange={ this.handleChange }
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            placeholder="Seu Email"
            onChange={ this.handleChange }
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.verifyGameLogin() }
            onClick={ this.handleClick }
            className="button btn btn-info btn-md"
          >
            Jogar
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ () => this.setState({ settings: true }) }
            className="button btn btn-info btn-md"
          >
            Settings
          </button>
        </div>
      </form>
    );
  }

  render() {
    const { redirect, settings } = this.state;
    if (redirect) return <Redirect to="/game" />;
    if (settings) return <Redirect to="/settings" />;
    return (
      <div id="login">
        <h3 className="text-center text-white pt-5">Trivia Trybe</h3>
        <div className="container">
          <div className="login-row row justify-content-center align-items-center">
            <div className="login-column col-md-6">
              <div className="login-box col-md-12">
                {this.renderForm()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchToken: PropTypes.func.isRequired,
  dispatchEmail: PropTypes.func.isRequired,
  dispatchMd5: PropTypes.func.isRequired,
  dispatchNome: PropTypes.func.isRequired,
  dispatchScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchToken: (token) => dispatch(loginAction(token)),
  dispatchEmail: (email) => dispatch(emailAction(email)),
  dispatchMd5: (email) => dispatch(md5Action(email)),
  dispatchNome: (nome) => dispatch(nomeAction(nome)),
  dispatchScore: (score) => dispatch(scoreAction(score)),
});

export default connect(null, mapDispatchToProps)(Login);
