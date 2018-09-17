import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import testReducer from './reducer_test';
import mapReducer from './reducer_map';
import parcelasReducer from './reducer_parcelas';
import callesReducer from './reducer_calles'

const rootReducer = combineReducers({
  test: testReducer,
  map: mapReducer,
  form: formReducer,
  parcelas: parcelasReducer,
  calles: callesReducer
});

export default rootReducer;
