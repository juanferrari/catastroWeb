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
