import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import testReducer from './reducer_test';
import mapReducer from './reducer_map';

const rootReducer = combineReducers({
  test: testReducer,
  map: mapReducer
});

export default rootReducer;
