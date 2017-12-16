import { takeLatest } from 'redux-saga/effects';
import { INITIALIZE } from './constants';

export function initFlow() {
  // check country and year cookies and update if not found
  // put country and years {years: { min: 1951, max: 2016, current: 1998 }}
  console.log('init map saga'); // eslint-disable-line
}

export default function* defaultSaga() {
  yield takeLatest(INITIALIZE, initFlow);
}
