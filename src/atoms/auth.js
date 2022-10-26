import {atom} from 'recoil';

export const uuidState = atom({
  key: 'uuidState',
  default: null,
});

export const userState = atom({
  key: 'userState',
  default: null,
});

export const isNewState = atom({
  key: 'isNewState',
  default: true,
});
