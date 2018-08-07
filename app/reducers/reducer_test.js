import _ from 'lodash';
import {
    TEST_ACTION,

    
} from '../actions/actions_test';

export default function(state = {}, action) {
    switch (action.type) {
        case TEST_ACTION:
            return { ...state, test:action.payload};
        default:
            return state;
    }
}