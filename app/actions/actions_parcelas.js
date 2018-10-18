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

function uploadPlanoRequest() {
  return {
    type: UPLOAD_PLANO_REQUEST,
  }
}

function uploadPlanoSuccess(request) {
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

export function uploadPlano(file,parcela_id){

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
            dispatch(uploadPlanoSuccess(request))
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
