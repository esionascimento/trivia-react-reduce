import { fetchQuestion } from '../services';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_EMAIL = 'REQUEST_EMAIL';
export const REQUEST_MD5 = 'REQUEST_MD5';
export const REQUEST_NOME = 'REQUEST_NOME';
export const ENVIA_DADOS_USUARIO = 'ENVIA_DADOS_USUARIO';
export const REQUEST_SCORE = 'REQUEST_SCORE';
export const REQUEST_ASSERTIONS = 'REQUEST_ASSERTIONS';

export const loginAction = (token) => ({
  type: REQUEST_TOKEN, token,
});

export const enviaDadosUsuario = (payload) => ({
  type: ENVIA_DADOS_USUARIO,
  payload,
});

export const questionAction = (token) => async (dispatch) => {
  const response = await fetchQuestion(token);
  const questions = response.results;
  dispatch({
    type: REQUEST_QUESTIONS, questions,
  });
};

export const emailAction = (email) => ({
  type: REQUEST_EMAIL, email,
});

export const md5Action = (md5) => ({
  type: REQUEST_MD5, md5,
});

export const nomeAction = (nome) => ({
  type: REQUEST_NOME, nome,
});

export const scoreAction = (score) => ({
  type: REQUEST_SCORE, score,
});

export const assertionAction = (assertions) => ({
  type: REQUEST_ASSERTIONS, assertions,
});
