import _ from 'lodash';
import {
    GET_CALLES_REQUEST,
    GET_CALLES_SUCCESS,
    GET_CALLES_FAIL,
    EDIT_CALLE_REQUEST,
    EDIT_CALLE_SUCCESS,
    EDIT_CALLE_FAIL,
    DELETE_CALLE_REQUEST,
    DELETE_CALLE_SUCCESS,
    DELETE_CALLE_FAIL

} from '../actions/actions_calles';

export default function(state = {}, action) {
    switch (action.type) {
        case DELETE_CALLE_REQUEST:
            return { ...state, calleDeleting:true};
        case DELETE_CALLE_SUCCESS:
            return { ...state, calleDeleting:false, actionCalles:{message:'Calle eliminada exitosamente.',action_className:'alert alert-success'}};
        case DELETE_CALLE_FAIL:
            return { ...state, calleDeleting:false, actionCalles:{message:'Error al eliminar calle, verifique que la misma no esté asignada a ninguna parcela.',action_className:'alert alert-danger'}};
        case EDIT_CALLE_REQUEST:
            return { ...state, calleEditing:true};
        case EDIT_CALLE_SUCCESS:
            return { ...state, calleEditing:false, actionCalles:{message:'Adición de calle realizada exitosamente.',action_className:'alert alert-success'}};
        case EDIT_CALLE_FAIL:
            return { ...state, calleEditing:false, actionCalles:{message:'Error al agregar una calle.',action_className:'alert alert-danger'}};
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