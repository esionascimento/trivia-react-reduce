import {
  REQUEST_TOKEN,
  REQUEST_EMAIL,
  REQUEST_MD5, REQUEST_NOME, REQUEST_SCORE, REQUEST_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  token: '',
  email: '',
  md5: '',
  nome: '',
  score: 0,
  assertions: 0,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  case REQUEST_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  case REQUEST_MD5:
    return {
      ...state,
      md5: action.md5,
    };
  case REQUEST_NOME:
    return {
      ...state,
      nome: action.nome,
    };
  case REQUEST_SCORE:
    return {
      ...state,
      score: action.score,
    };
  case REQUEST_ASSERTIONS:
    return {
      ...state,
      assertions: action.assertions,
    };
  default:
    return state;
  }
};

export default loginReducer;
