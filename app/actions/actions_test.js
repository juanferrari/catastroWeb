import _ from 'lodash';
import axios from 'axios';
import {ROOT_URL} from './index';

export const TEST_ACTION = 'TEST_ACTION'

export function test(log) {
  return {
    type: TEST_ACTION,
    payload:log
  }
}