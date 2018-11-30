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
    EDIT_NOMENCLATURA_FAIL,
    UPLOAD_PLANO_REQUEST,
    UPLOAD_PLANO_SUCCESS,
    UPLOAD_PLANO_FAIL,
    EDIT_INDICADORES_REQUEST,
    EDIT_INDICADORES_SUCCESS,
    EDIT_INDICADORES_FAIL,
    EDIT_EXP_MENSURA_REQUEST,
    EDIT_EXP_MENSURA_SUCCESS,
    EDIT_EXP_MENSURA_FAIL,
    GET_EXPEDIENTE_MENSURA_REQUEST,
    GET_EXPEDIENTE_MENSURA_SUCCESS,
    GET_EXPEDIENTE_MENSURA_FAIL,
    DELETE_PLANO_REQUEST,
    DELETE_PLANO_SUCCESS,
    DELETE_PLANO_FAIL,
    SUBDIVIDIR_PARCELA_REQUEST,
    SUBDIVIDIR_PARCELA_SUCCESS,
    SUBDIVIDIR_PARCELA_FAIL

} from '../actions/actions_parcelas';

var defaultState = {filter:'', tableInfo:{pageSize:10,page:0},actionParcela: {message:'',action_className:'hidden'}}
export default function(state = defaultState, action) {
    switch (action.type) {
        case SUBDIVIDIR_PARCELA_REQUEST:
            return { ...state, planoSplitting:true};
        case SUBDIVIDIR_PARCELA_SUCCESS:
            return { ...state, planoSplitting:false, actionParcela:{message:'Parcela subdividida correctamente.',action_className:'alert alert-success'}};
        case SUBDIVIDIR_PARCELA_FAIL:
            return { ...state, planoSplitting:false, actionParcela:{message:'Error al subdividir la parcela.',action_className:'alert alert-danger'}};
        case GET_EXPEDIENTE_MENSURA_REQUEST:
            return { ...state, expedienteFetching:true};
        case GET_EXPEDIENTE_MENSURA_SUCCESS:
            return { ...state, expedienteFetching:false, expedienteMensura:action.payload.data};
        case GET_EXPEDIENTE_MENSURA_FAIL:
            return { ...state, expedienteFetching:false};
        case DELETE_PLANO_REQUEST:
            return { ...state, expMensuraDeleting:true};
        case DELETE_PLANO_SUCCESS:
            return { ...state, expMensuraDeleting:false, actionParcela:{message:'Visado de plano de mensura realizado exitosamente.',action_className:'alert alert-success'}};
        case DELETE_PLANO_FAIL:
            return { ...state, expMensuraDeleting:false, actionParcela:{message:'Error al visar el plano de mensura de la parcela.',action_className:'alert alert-danger'}};
        case EDIT_EXP_MENSURA_REQUEST:
            return { ...state, expMensuraEditing:true};
        case EDIT_EXP_MENSURA_SUCCESS:
            return { ...state, expMensuraEditing:false, actionParcela:{message:'Visado de plano de mensura realizado exitosamente.',action_className:'alert alert-success'}};
        case EDIT_EXP_MENSURA_FAIL:
            return { ...state, expMensuraEditing:false, actionParcela:{message:'Error al visar el plano de mensura de la parcela.',action_className:'alert alert-danger'}};
        case EDIT_INDICADORES_REQUEST:
            return { ...state, parcelaEditing:true};
        case EDIT_INDICADORES_SUCCESS:
            return { ...state, parcelaEditing:false, actionParcela:{message:'Modificación de indicadores realizada exitosamente.',action_className:'alert alert-success'}};
        case EDIT_INDICADORES_FAIL:
            return { ...state, parcelaEditing:false, actionParcela:{message:'Error al modificar los indicadores de la parcela.',action_className:'alert alert-danger'}};
        case UPLOAD_PLANO_REQUEST:
            return { ...state, planoUploading:true};
        case UPLOAD_PLANO_SUCCESS:
            return { ...state, planoUploading:false, actionParcela:{message:'Archivo subido correctamente.',action_className:'alert alert-success'}};
        case UPLOAD_PLANO_FAIL:
            return { ...state, planoUploading:false, actionParcela:{message:'Error al subir el archivo.',action_className:'alert alert-danger'}};
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