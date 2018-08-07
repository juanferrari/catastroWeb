import _ from 'lodash';
import {
    UPDATE_PARCELA_INFO,
    OPEN_MODAL,
    CLOSE_MODAL

    
} from '../actions/actions_map';

export default function(state = {}, action) {
    switch (action.type) {
        case UPDATE_PARCELA_INFO:
            return { ...state, parcelaInfo:action.payload};
        case OPEN_MODAL:
            return { ...state, showModal:true};
        case CLOSE_MODAL:
            return { ...state, showModal:false};
        default:
            return state;
    }
}