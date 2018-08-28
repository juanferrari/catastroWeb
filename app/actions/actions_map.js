import _ from 'lodash';
import axios from 'axios';
import {ROOT_URL} from './index';

export const UPDATE_PARCELA_INFO = 'UPDATE_PARCELA_INFO'
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export function updateParcelaInfo(parcelaInfo) {
  return {
    type: UPDATE_PARCELA_INFO,
    payload:parcelaInfo
  }
}

export function openModal() {
  return {
    type: OPEN_MODAL,
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}

