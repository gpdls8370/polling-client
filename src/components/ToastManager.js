import Toast from 'react-native-toast-message';

export const showToast = (type, text1, text2) => {
  if (!text2) {
    Toast.show({
      type: type,
      text1: text1,
    });
  } else {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  }
};

export const showNetworkError = errMsg => {
  Toast.show({
    type: toastType.error,
    text1: errMsg,
  });
};

export const showError = (errMsg1, errMsg2) => {
  Toast.show({
    type: toastType.error,
    text1: errMsg1,
    text2: errMsg2,
  });
};

export const toastType = {
  success: 'success',
  error: 'error',
  info: 'info',
};
