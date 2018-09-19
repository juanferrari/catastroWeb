import _ from 'lodash';
import axios from 'axios';
import {ROOT_URL} from './index';

export const GET_CALLES_REQUEST = 'GET_CALLES_REQUEST';
export const GET_CALLES_SUCCESS = 'GET_CALLES_SUCCESS';
export const GET_CALLES_FAIL = 'GET_CALLES_FAIL';

export const EDIT_CALLE_REQUEST = 'EDIT_CALLE_REQUEST';
export const EDIT_CALLE_SUCCESS = 'EDIT_CALLE_SUCCESS';
export const EDIT_CALLE_FAIL = 'EDIT_CALLE_FAIL';

export const DELETE_CALLE_REQUEST = 'DELETE_CALLE_REQUEST';
export const DELETE_CALLE_SUCCESS = 'DELETE_CALLE_SUCCESS';
export const DELETE_CALLE_FAIL = 'DELETE_CALLE_FAIL';

function deleteCalleRequest() {
  return {
    type: DELETE_CALLE_REQUEST,
  }
}

function deleteCalleSuccess(request,callback) {
  callback();
  return {
    type: DELETE_CALLE_SUCCESS,
    payload: request
  }
}

function deleteCalleFail(callback) {
  callback();
  return {
    type: DELETE_CALLE_FAIL
  }
}

export function deleteCalle(calle_id,callback){

  var service_url = ROOT_URL + 'calles?id=' + calle_id;
  return function(dispatch) {
        dispatch(deleteCalleRequest())
        const request = axios.delete(service_url,{
          headers: {
              'Content-Type': 'application/json',
              'X-session': localStorage.getItem('session'),
              'X-user':localStorage.getItem('user_id'),

          }}).then( request =>{
            dispatch(deleteCalleSuccess(request,callback))
          }).catch( error =>{
              dispatch(deleteCalleFail(callback))
              console.log("error",error)
            })
      }
}

function editCalleRequest() {
  return {
    type: EDIT_CALLE_REQUEST,
  }
}

function editCalleSuccess(request,callback) {
  callback();
  return {
    type: EDIT_CALLE_SUCCESS,
    payload: request
  }
}

function editCalleFail(callback) {
  callback();
  return {
    type: EDIT_CALLE_FAIL
  }
}

export function editCalle(submitJson,callback){

  var service_url = ROOT_URL + 'calles';
  
  return function(dispatch) {
        dispatch(editCalleRequest())
        const request = axios.put(service_url,submitJson,{
          headers: {
              'Content-Type': 'application/json',
              'X-session': localStorage.getItem('session'),
              'X-user':localStorage.getItem('user_id'),

          }}).then( request =>{
            dispatch(editCalleSuccess(request,callback))
          }).catch( error =>{
              dispatch(editCalleFail(callback))
              console.log("error",error)
            })
      }
}

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
