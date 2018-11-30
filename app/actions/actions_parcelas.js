import _ from 'lodash';
import axios from 'axios';
import {ROOT_URL} from './index';

export const GET_PARCELAS_REQUEST = 'GET_PARCELAS_REQUEST';
export const GET_PARCELAS_SUCCESS = 'GET_PARCELAS_SUCCESS';
export const GET_PARCELAS_FAIL = 'GET_PARCELAS_FAIL';

export const GET_PARCELA_REQUEST = 'GET_PARCELA_REQUEST';
export const GET_PARCELA_SUCCESS = 'GET_PARCELA_SUCCESS';
export const GET_PARCELA_FAIL = 'GET_PARCELA_FAIL';

export const EDIT_PARCELA_REQUEST = 'EDIT_PARCELA_REQUEST';
export const EDIT_PARCELA_SUCCESS = 'EDIT_PARCELA_SUCCESS';
export const EDIT_PARCELA_FAIL = 'EDIT_PARCELA_FAIL';

export const UPDATE_FILTER = 'UPDATE_FILTER';

export const EDIT_CALLES_REQUEST = 'EDIT_CALLES_REQUEST';
export const EDIT_CALLES_SUCCESS = 'EDIT_CALLES_SUCCESS';
export const EDIT_CALLES_FAIL = 'EDIT_CALLES_FAIL';

export const EDIT_NOMENCLATURA_REQUEST = 'EDIT_NOMENCLATURA_REQUEST';
export const EDIT_NOMENCLATURA_SUCCESS = 'EDIT_NOMENCLATURA_SUCCESS';
export const EDIT_NOMENCLATURA_FAIL = 'EDIT_NOMENCLATURA_FAIL';

export const UPLOAD_PLANO_REQUEST = 'UPLOAD_PLANO_REQUEST';
export const UPLOAD_PLANO_SUCCESS = 'UPLOAD_PLANO_SUCCESS';
export const UPLOAD_PLANO_FAIL = 'UPLOAD_PLANO_FAIL';

export const EDIT_INDICADORES_REQUEST = 'EDIT_INDICADORES_REQUEST';
export const EDIT_INDICADORES_SUCCESS = 'EDIT_INDICADORES_SUCCESS';
export const EDIT_INDICADORES_FAIL = 'EDIT_INDICADORES_FAIL';

export const EDIT_EXP_MENSURA_REQUEST = 'EDIT_EXP_MENSURA_REQUEST';
export const EDIT_EXP_MENSURA_SUCCESS = 'EDIT_EXP_MENSURA_SUCCESS';
export const EDIT_EXP_MENSURA_FAIL = 'EDIT_EXP_MENSURA_FAIL';

export const GET_EXPEDIENTE_MENSURA_REQUEST = 'GET_EXPEDIENTE_MENSURA_REQUEST';
export const GET_EXPEDIENTE_MENSURA_SUCCESS = 'GET_EXPEDIENTE_MENSURA_SUCCESS';
export const GET_EXPEDIENTE_MENSURA_FAIL = 'GET_EXPEDIENTE_MENSURA_FAIL';

export const DELETE_PLANO_REQUEST = 'DELETE_PLANO_REQUEST';
export const DELETE_PLANO_SUCCESS = 'DELETE_PLANO_SUCCESS';
export const DELETE_PLANO_FAIL = 'DELETE_PLANO_FAIL';

export const SUBDIVIDIR_PARCELA_REQUEST = 'SUBDIVIDIR_PARCELA_REQUEST';
export const SUBDIVIDIR_PARCELA_SUCCESS = 'SUBDIVIDIR_PARCELA_SUCCESS';
export const SUBDIVIDIR_PARCELA_FAIL = 'SUBDIVIDIR_PARCELA_FAIL';


function subdividirParcelaRequest() {
  return {
    type: SUBDIVIDIR_PARCELA_REQUEST,
  }
}

function subdividirParcelaSuccess(request,callback) {
  if(callback)
    callback();
  return {
    type: SUBDIVIDIR_PARCELA_SUCCESS,
    payload: request
  }
}

function subdividirParcelaFail(callback) {
  if(callback)
    callback();
  return {
    type: SUBDIVIDIR_PARCELA_FAIL
  }
}

export function subdividirParcela(parcela_id,values,callback){

  var service_url = ROOT_URL + 'parcelas/geom/' + parcela_id + '/subdividir';

  return function(dispatch) {
        dispatch(subdividirParcelaRequest())
        const request = axios.post(service_url,values,{
          headers: {
              'Content-Type': 'application/json',
              'accept':"*/*",
              'cache-control':"no-cache"
        }}).then( request =>{
            dispatch(subdividirParcelaSuccess(request,callback))
          }).catch( error =>{
              dispatch(subdividirParcelaFail(callback))
              console.log("error subdividirParcela",error.stack)
            })
      }
}

function deletePlanoRequest() {
  return {
    type: DELETE_PLANO_REQUEST,
  }
}

function deletePlanoSuccess(request,callback) {
  if(callback)
    callback();
  return {
    type: DELETE_PLANO_SUCCESS,
    payload: request
  }
}

function deletePlanoFail(callback) {
  return {
    type: DELETE_PLANO_FAIL
  }
}

export function deletePlano(parcela_id,plano_id,callback){

  var service_url = ROOT_URL + 'parcelas/' + parcela_id + '/expedienteMensura/planos/' + plano_id;
  
  return function(dispatch) {
        dispatch(deletePlanoRequest())
        const request = axios.delete(service_url,{
          headers: {
              'Content-Type': 'application/json',
              'X-session': localStorage.getItem('session'),
              'X-user':localStorage.getItem('user_id'),

          }}).then( request =>{
            dispatch(deletePlanoSuccess(request,callback))
          }).catch( error =>{
              dispatch(deletePlanoFail())
              console.log("error",error)
            })
      }
}

function getExpedienteMensuraRequest() {
  return {
    type: GET_EXPEDIENTE_MENSURA_REQUEST,
  }
}

function getExpedienteMensuraSuccess(request) {
  return {
    type: GET_EXPEDIENTE_MENSURA_SUCCESS,
    payload: request
  }
}

function getExpedienteMensuraFail() {
  return {
    type: GET_EXPEDIENTE_MENSURA_FAIL
  }
}

export function getExpedienteMensura(parcela_id){

  var service_url = ROOT_URL + 'parcelas/' + parcela_id + '/expedienteMensura';
  
  return function(dispatch) {
        dispatch(getExpedienteMensuraRequest())
        const request = axios.get(service_url,{
          headers: {
              'Content-Type': 'application/json',
              'X-session': localStorage.getItem('session'),
              'X-user':localStorage.getItem('user_id'),

          }}).then( request =>{
            dispatch(getExpedienteMensuraSuccess(request))
          }).catch( error =>{
              dispatch(getExpedienteMensuraFail())
              console.log("error",error)
            })
      }
}

function editExpMensuraRequest() {
  return {
    type: EDIT_EXP_MENSURA_REQUEST,
  }
}

function editExpMensuraSuccess(request,callback) {
  if(callback)
    callback()
  return {
    type: EDIT_EXP_MENSURA_SUCCESS,
    payload: request
  }
}

function editExpMensuraFail(callback) {
  if(callback)
    callback()
  return {
    type: EDIT_EXP_MENSURA_FAIL
  }
}

export function editExpMensura(id,submitJson,callback){

  var service_url = ROOT_URL + 'parcelas/' + id + '/expedienteMensura';
  
  return function(dispatch) {
        dispatch(editExpMensuraRequest())
        const request = axios.put(service_url,submitJson,{
          headers: {
              'Content-Type': 'application/json',
              'X-session': localStorage.getItem('session'),
              'X-user':localStorage.getItem('user_id'),

          }}).then( request =>{
            dispatch(editExpMensuraSuccess(request,callback))
          }).catch( error =>{
              dispatch(editExpMensuraFail(callback))
              console.log("error",error)
            })
      }
}

function editIndicadoresRequest() {
  return {
    type: EDIT_INDICADORES_REQUEST,
  }
}

function editIndicadoresSuccess(request,callback) {
  callback();
  return {
    type: EDIT_INDICADORES_SUCCESS,
    payload: request
  }
}

function editIndicadoresFail(callback) {
  callback();
  return {
    type: EDIT_INDICADORES_FAIL
  }
}

export function editIndicadores(submitJson,parcela_id,callback){

  var service_url = ROOT_URL + 'parcelas/' + parcela_id + '/indicadores';
  
  return function(dispatch) {
        dispatch(editIndicadoresRequest())
        const request = axios.put(service_url,submitJson,{
          headers: {
              'Content-Type': 'application/json',
              'X-session': localStorage.getItem('session'),
              'X-user':localStorage.getItem('user_id'),

          }}).then( request =>{
            dispatch(editIndicadoresSuccess(request,callback))
          }).catch( error =>{
              dispatch(editIndicadoresFail(callback))
              console.log("error",error)
            })
      }
}


function uploadPlanoRequest() {
  return {
    type: UPLOAD_PLANO_REQUEST,
  }
}

function uploadPlanoSuccess(request,callback) {
  if(callback)
    callback();
  return {
    type: UPLOAD_PLANO_SUCCESS,
    payload: request
  }
}

function uploadPlanoFail() {
  return {
    type: UPLOAD_PLANO_FAIL
  }
}

export function uploadPlano(file,parcela_id,callback){

  var formData = new FormData();
  formData.append("file", file);

  var service_url = ROOT_URL + 'parcelas/' + parcela_id + '/expedienteMensura/plano';

  return function(dispatch) {
        dispatch(uploadPlanoRequest())
        const request = axios.post(service_url,formData,{
          headers: {
              'Content-Type': 'multipart/form-data',
              'accept':"*/*",
              'cache-control':"no-cache"
        }}).then( request =>{
            dispatch(uploadPlanoSuccess(request,callback))
          }).catch( error =>{
              dispatch(uploadPlanoFail())
              console.log("error uploadPlano",error)
            })
      }
}

function editNomenclaturaRequest() {
  return {
    type: EDIT_NOMENCLATURA_REQUEST,
  }
}

function editNomenclaturaSuccess(request,callback) {
  callback();
  return {
    type: EDIT_NOMENCLATURA_SUCCESS,
    payload: request
  }
}

function editNomenclaturaFail(callback) {
  callback();
  return {
    type: EDIT_NOMENCLATURA_FAIL
  }
}

export function editNomenclatura(submitJson,parcela_id,callback){

  var service_url = ROOT_URL + 'parcelas/' + parcela_id + '/nomenclaturaTitulo';
  
  return function(dispatch) {
        dispatch(editNomenclaturaRequest())
        const request = axios.put(service_url,submitJson,{
          headers: {
              'Content-Type': 'application/json',
              'X-session': localStorage.getItem('session'),
              'X-user':localStorage.getItem('user_id'),

          }}).then( request =>{
            dispatch(editNomenclaturaSuccess(request,callback))
          }).catch( error =>{
              dispatch(editNomenclaturaFail(callback))
              console.log("error",error)
            })
      }
}

function editCallesRequest() {
  return {
    type: EDIT_CALLES_REQUEST,
  }
}

function editCallesSuccess(request,callback) {
  callback();
  return {
    type: EDIT_CALLES_SUCCESS,
    payload: request
  }
}

function editCallesFail(callback) {
  callback();
  return {
    type: EDIT_CALLES_FAIL
  }
}

export function editCalles(submitJson,parcela_id,callback){

  var service_url = ROOT_URL + 'parcelas/' + parcela_id + '/calles';
  
  return function(dispatch) {
        dispatch(editCallesRequest())
        const request = axios.put(service_url,submitJson,{
          headers: {
              'Content-Type': 'application/json',
              'X-session': localStorage.getItem('session'),
              'X-user':localStorage.getItem('user_id'),

          }}).then( request =>{
            dispatch(editCallesSuccess(request,callback))
          }).catch( error =>{
              dispatch(editCallesFail(callback))
              console.log("error",error)
            })
      }
}

function editParcelaRequest() {
  return {
    type: EDIT_PARCELA_REQUEST,
  }
}

function editParcelaSuccess(request) {
  return {
    type: EDIT_PARCELA_SUCCESS,
    payload: request
  }
}

function editParcelaFail() {
  return {
    type: EDIT_PARCELA_FAIL
  }
}

export function editParcela(submitJson){

  var service_url = ROOT_URL + 'parcelas';
  
  return function(dispatch) {
        dispatch(editParcelaRequest())
        const request = axios.put(service_url,submitJson,{
          headers: {
              'Content-Type': 'application/json',
              'X-session': localStorage.getItem('session'),
              'X-user':localStorage.getItem('user_id'),

          }}).then( request =>{
            dispatch(editParcelaSuccess(request))
          }).catch( error =>{
              dispatch(editParcelaFail())
              console.log("error",error)
            })
      }
}

function getParcelaRequest() {
  return {
    type: GET_PARCELA_REQUEST,
  }
}

function getParcelaSuccess(request) {
  return {
    type: GET_PARCELA_SUCCESS,
    payload: request
  }
}

function getParcelaFail() {
  return {
    type: GET_PARCELA_FAIL
  }
}

export function getParcela(parcela_id){

  var service_url = ROOT_URL + 'parcelas/' + parcela_id;
  
  return function(dispatch) {
        dispatch(getParcelaRequest())
        const request = axios.get(service_url,{
          headers: {
              'Content-Type': 'application/json',
              'X-session': localStorage.getItem('session'),
              'X-user':localStorage.getItem('user_id'),

          }}).then( request =>{
            dispatch(getParcelaSuccess(request))
          }).catch( error =>{
              dispatch(getParcelaFail())
              console.log("error",error)
            })
      }
}

export function updateFilter(filter) {
  return {
    type: UPDATE_FILTER,
    filter
  }
}

function getParcelasRequest() {
  return {
    type: GET_PARCELAS_REQUEST,
  }
}

function getParcelasSuccess(request,data) {
  return {
    type: GET_PARCELAS_SUCCESS,
    payload: request,
    tableInfo: data
  }
}

function getParcelasFail() {
  return {
    type: GET_PARCELAS_FAIL
  }
}

export function getParcelas(data,filter){

  var service_url = ROOT_URL + 'parcelas?size=' + data.pageSize + '&page=' + data.page + filter;
  
  return function(dispatch) {
        dispatch(getParcelasRequest())
        const request = axios.get(service_url,{
          headers: {
              'Content-Type': 'application/json',
              'X-session': localStorage.getItem('session'),
              'X-user':localStorage.getItem('user_id'),

          }}).then( request =>{
            dispatch(getParcelasSuccess(request,data))
          }).catch( error =>{
              dispatch(getParcelasFail())
              console.log("error",error)
            })
      }
}
