import {atom} from 'recoil';

export const lowState = atom({
  key: 'lowState',
  default: 1,
});
export const highState = atom({
  key: 'highState',
  default: 50,
});
