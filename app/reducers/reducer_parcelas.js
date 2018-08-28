import _ from 'lodash';
import {
    GET_PARCELAS_REQUEST,
    GET_PARCELAS_SUCCESS,
    GET_PARCELAS_FAIL,
    GET_PARCELA_REQUEST,
    GET_PARCELA_SUCCESS,
    GET_PARCELA_FAIL,
    UPDATE_FILTER
} from '../actions/actions_parcelas';

var defaultState = {filter:'', tableInfo:{pageSize:10,page:0}}
export default function(state = defaultState, action) {
    switch (action.type) {
        case UPDATE_FILTER:
            return { ...state, filter:action.filter};
        case GET_PARCELA_REQUEST:
            return { ...state, parcelaFetching:true};
        case GET_PARCELA_SUCCESS:
            return { ...state, parcelaFetching:false, parcela:action.payload.data};
        case GET_PARCELA_FAIL:
            return { ...state, parcelaFetching:false};
        case GET_PARCELAS_REQUEST:
            return { ...state, parcelasFetching:true};
        case GET_PARCELAS_SUCCESS:
            return { ...state, parcelasFetching:false, tableInfo:action.tableInfo, parcelas:action.payload.data};
        case GET_PARCELAS_FAIL:
            return { ...state, parcelasFetching:false};
        default:
            return state;
    }
}