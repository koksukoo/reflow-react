import * as R from 'ramda';

export const get = R.curryN(2, (str, obj) => R.path(str.split('.'), obj));

export const set = R.curryN(3, (str, val, obj) =>
  R.assocPath(str.split('.'), val, obj));

export const over = R.curryN(3, (str, f, obj) =>
  R.over(R.lensPath(str.split('.')), f, obj));
