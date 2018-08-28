import _ from 'lodash';
import axios from 'axios';
import {ROOT_URL} from './index';

export const GET_PARCELAS_REQUEST = 'GET_PARCELAS_REQUEST';
export const GET_PARCELAS_SUCCESS = 'GET_PARCELAS_SUCCESS';
export const GET_PARCELAS_FAIL = 'GET_PARCELAS_FAIL';

export const GET_PARCELA_REQUEST = 'GET_PARCELA_REQUEST';
export const GET_PARCELA_SUCCESS = 'GET_PARCELA_SUCCESS';
export const GET_PARCELA_FAIL = 'GET_PARCELA_FAIL';

export const UPDATE_FILTER = 'UPDATE_FILTER';

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

  var service_url = ROOT_URL + 'parcelas?searchParcela=id:' + parcela_id;
  
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
