import _ from 'lodash';
import {
    GET_PARCELAS_REQUEST,
    GET_PARCELAS_SUCCESS,
    GET_PARCELAS_FAIL,
    UPDATE_FILTER
} from '../actions/actions_parcelas';

var defaultState = {filter:''}
export default function(state = defaultState, action) {
    switch (action.type) {
        case UPDATE_FILTER:
            return { ...state, filter:action.filter};
        case GET_PARCELAS_REQUEST:
            return { ...state, parcelasFetching:true};
        case GET_PARCELAS_SUCCESS:
            return { ...state, parcelasFetching:false, parcelas:action.payload.data};
        case GET_PARCELAS_FAIL:
            return { ...state, parcelasFetching:false};
        default:
            return state;
    }
}