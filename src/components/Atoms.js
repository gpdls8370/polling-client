import {atom} from 'recoil';

export const lowState = atom({
  key: 'lowState',
  default: 1,
});
export const highState = atom({
  key: 'highState',
  default: 50,
});
export const selectState = atom({
  key: 'selectState',
  default: null,
});
export const isMaleState = atom({
  key: 'isMaleState',
  default: null,
});
export const navState = atom({
  key: 'navState',
  default: null,
});
