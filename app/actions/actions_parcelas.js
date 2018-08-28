import _ from 'lodash';
import axios from 'axios';
//import {ROOT_URL} from './index';

export const GET_PARCELAS_REQUEST = 'GET_PARCELAS_REQUEST';
export const GET_PARCELAS_SUCCESS = 'GET_PARCELAS_SUCCESS';
export const GET_PARCELAS_FAIL = 'GET_PARCELAS_FAIL';

function getParcelasRequest() {
  return {
    type: GET_PARCELAS_REQUEST,
  }
}

function getParcelasSuccess(request) {
  return {
    type: GET_PARCELAS_SUCCESS,
    payload: request
  }
}

function getParcelasFail() {
  return {
    type: GET_PARCELAS_FAIL
  }
}

export function getParcelas(data){

  console.log('dataaa',data)

  var service_url = 'http://186.33.216.232/catastro-service/v1/parcelas?size=' + data.pageSize + '&page=' + data.page;
  

  return function(dispatch) {
        dispatch(getParcelasRequest())
        const request = axios.get(service_url,{
          headers: {
              'Content-Type': 'application/json',
              'X-session': localStorage.getItem('session'),
              'X-user':localStorage.getItem('user_id'),

          }}).then( request =>{
            dispatch(getParcelasSuccess(request))
          }).catch( error =>{
              dispatch(getParcelasFail())
              console.log("error",error)
            })
      }
}
