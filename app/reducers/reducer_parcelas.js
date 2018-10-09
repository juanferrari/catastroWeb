import _ from 'lodash';
import {
    GET_PARCELAS_REQUEST,
    GET_PARCELAS_SUCCESS,
    GET_PARCELAS_FAIL,
    GET_PARCELA_REQUEST,
    GET_PARCELA_SUCCESS,
    GET_PARCELA_FAIL,
    EDIT_PARCELA_REQUEST,
    EDIT_PARCELA_SUCCESS,
    EDIT_PARCELA_FAIL,
    UPDATE_FILTER,
    EDIT_CALLES_REQUEST,
    EDIT_CALLES_SUCCESS,
    EDIT_CALLES_FAIL,
    EDIT_NOMENCLATURA_REQUEST,
    EDIT_NOMENCLATURA_SUCCESS,
    EDIT_NOMENCLATURA_FAIL
} from '../actions/actions_parcelas';

var defaultState = {filter:'', tableInfo:{pageSize:10,page:0},actionParcela: {message:'',action_className:'hidden'}}
export default function(state = defaultState, action) {
    switch (action.type) {
        case EDIT_NOMENCLATURA_REQUEST:
            return { ...state, parcelaEditing:true};
        case EDIT_NOMENCLATURA_SUCCESS:
            return { ...state, parcelaEditing:false, actionParcela:{message:'Modificación de nomenclatura realizada exitosamente.',action_className:'alert alert-success'}};
        case EDIT_NOMENCLATURA_FAIL:
            return { ...state, parcelaEditing:false, actionParcela:{message:'Error al modificar la nomenclatura de la parcela.',action_className:'alert alert-danger'}};
        case EDIT_CALLES_REQUEST:
            return { ...state, parcelaEditing:true};
        case EDIT_CALLES_SUCCESS:
            return { ...state, parcelaEditing:false, actionParcela:{message:'Asignación de calles realizada exitosamente.',action_className:'alert alert-success'}};
        case EDIT_CALLES_FAIL:
            return { ...state, parcelaEditing:false, actionParcela:{message:'Error al asignar las calles a la parcela.',action_className:'alert alert-danger'}};
        case UPDATE_FILTER:
            return { ...state, filter:action.filter};
        case EDIT_PARCELA_REQUEST:
            return { ...state, parcelaEditing:true};
        case EDIT_PARCELA_SUCCESS:
            return { ...state, parcelaEditing:false, actionParcela:{message:'Parcela editada correctamente',action_className:'alert alert-success'}};
        case EDIT_PARCELA_FAIL:
            return { ...state, parcelaEditing:false, actionParcela:{message:'Error al editar la parcela',action_className:'alert alert-danger'}};
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