import _ from 'lodash';
import {
    GET_PARCELAS_REQUEST,
    GET_PARCELAS_SUCCESS,
    GET_PARCELAS_FAIL
} from '../actions/actions_parcelas';

export default function(state = {}, action) {
    switch (action.type) {
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