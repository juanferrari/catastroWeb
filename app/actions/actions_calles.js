import _ from 'lodash';
import axios from 'axios';
import {ROOT_URL} from './index';

export const GET_CALLES_REQUEST = 'GET_CALLES_REQUEST';
export const GET_CALLES_SUCCESS = 'GET_CALLES_SUCCESS';
export const GET_CALLES_FAIL = 'GET_CALLES_FAIL';

function getCallesRequest() {
  return {
    type: GET_CALLES_REQUEST,
  }
}

function getCallesSuccess(request) {
  console.log('requestCalles',request)
  return {
    type: GET_CALLES_SUCCESS,
    payload: request
  }
}

function getCallesFail() {
  return {
    type: GET_CALLES_FAIL
  }
}

export function getCalles(){

  var service_url = ROOT_URL + 'calles?';
  
  return function(dispatch) {
        dispatch(getCallesRequest())
        const request = axios.get(service_url,{
          headers: {
              'Content-Type': 'application/json',
              'X-session': localStorage.getItem('session'),
              'X-user':localStorage.getItem('user_id'),

          }}).then( request =>{
            dispatch(getCallesSuccess(request))
          }).catch( error =>{
              dispatch(getCallesFail())
              console.log("error",error)
            })
      }
}
