import _ from 'lodash';
import {
    GET_CALLES_REQUEST,
    GET_CALLES_SUCCESS,
    GET_CALLES_FAIL,

} from '../actions/actions_calles';

export default function(state = {}, action) {
    switch (action.type) {
        case GET_CALLES_REQUEST:
            return { ...state, callesFetching:true};
        case GET_CALLES_SUCCESS:
            return { ...state, callesFetching:false, calles:action.payload.data};
        case GET_CALLES_FAIL:
            return { ...state, callesFetching:false};
        default:
            return state;
    }
}