import _ from 'lodash';
import axios from 'axios';

export const TEST_ACTION = 'TEST_ACTION'

export function test(log) {
  return {
    type: TEST_ACTION,
    payload:log
  }
}