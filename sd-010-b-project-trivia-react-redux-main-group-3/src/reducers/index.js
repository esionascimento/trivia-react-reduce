import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import questionsReducer from './questionsReducer';
// import player from './player';

const rootReducer = combineReducers({
  loginReducer,
  questionsReducer,
  // player,
});

export default rootReducer;
