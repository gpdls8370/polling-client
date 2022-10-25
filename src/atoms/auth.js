import {atom} from 'recoil';

export const uuidState = atom({
  key: 'uuidState',
  default: 'uid_1', //TODO 추후 로그인 구현 후 초기값 수정 필요
});
