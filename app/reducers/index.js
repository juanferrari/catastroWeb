import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import testReducer from './reducer_test';
import mapReducer from './reducer_map';
import parcelasReducer from './reducer_parcelas';

const rootReducer = combineReducers({
  test: testReducer,
  map: mapReducer,
  form: formReducer,
  parcelas: parcelasReducer
});

export default rootReducer;
