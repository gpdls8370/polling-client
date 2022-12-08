import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {navigation_id, type_color, url} from '../components/Constants';
import {StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useRecoilState} from 'recoil';
import {isAdminState, isNewState, userState, uuidState} from '../atoms/auth';
import {isFromLandingState} from '../atoms/landing';
import {
  showError,
  showNetworkError,
  showToast,
  toastType,
} from '../components/ToastManager';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

function login({navigation}) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useRecoilState(userState);
  const [uuid, setUUID] = useRecoilState(uuidState);
  const [, setIsNew] = useRecoilState(isNewState);
  const [, setIsAdmin] = useRecoilState(isAdminState);
  const [isFormLanding, setFormLanding] = useRecoilState(isFromLandingState);
  const [isSpinnerEnable, setSpinnerEnable] = useState(false);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  function handleBackButtonClick() {
    if (isFormLanding) {
      setFormLanding(false);
      navigation.dispatch(StackActions.replace(navigation_id.landing));
    } else {
      navigation.goBack();
    }

    return true;
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
      subscriber; // unsubscribe on unmount
    };
  }, []);

  if (initializing) {
    return null;
  }

  const idRegex =
    /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  const pwRegex = /^[A-Za-z0-9]{6,12}$/;

  const isValidInput = () => {
    if (!idRegex.test(id)) {
      showError('오류', '올바르지 않은 이메일 형식입니다.');
      return false;
    }

    if (!pwRegex.test(pw)) {
      showError('오류', '비밀번호가 올바르지 않습니다.');
      return false;
    }

    return true;
  };

  const setSaveLoginData = (id, pw) => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        id: id,
        pw: pw,
      }),
    );
  };

  const setFCMToken = async uuid => {
    await messaging()
      .registerDeviceForRemoteMessages()
      .then(function () {
        return messaging().getToken();
      })
      .then(function (tokenFCM) {
        console.log('tokenFCM: ' + tokenFCM);
        return fetch(url.userToken, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UUID: uuid,
            token: tokenFCM,
          }),
        })
          .then(function (response) {
            if (response.ok) {
              return response;
            } else {
              throw new Error('Network response was not ok.');
            }
          })
          .then(function (data) {
            console.log(data);
          })
          .catch(function (error) {
            showNetworkError(error.message);
            console.log(
              'There has been a problem with your fetch operation: ',
              error.message,
            );
          });
      })
      .catch(function (error) {
        showNetworkError(error.message);
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  const loginPost = token => {
    console.log(token);
    return fetch(url.login, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(function (data) {
        setUUID(data.UUID);
        console.log(data.UUID);

        setIsNew(data.isNew);
        setIsAdmin(data.isAdmin);

        setSaveLoginData(id, pw);
        setFCMToken(data.UUID)
          .then(function () {
            setSpinnerEnable(false);
            showToast(toastType.success, '로그인 성공');
          })
          .catch(function (error) {
            setSpinnerEnable(false);
          });

        if (data.isNew) {
          if (isFormLanding) {
            setFormLanding(false);
            navigation.dispatch(StackActions.replace(navigation_id.Feeds));
            navigation.navigate(navigation_id.personalInfo);
          } else {
            navigation.dispatch(
              StackActions.replace(navigation_id.personalInfo),
            );
          }
        } else {
          if (isFormLanding) {
            setFormLanding(false);
            navigation.dispatch(StackActions.replace(navigation_id.Feeds));
          } else {
            navigation.dispatch(StackActions.popToTop());
          }
        }
      })
      .catch(function (error) {
        setSpinnerEnable(false);
        showNetworkError(error.message);
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  const onClickLogin = () => {
    if (isValidInput()) {
      setSpinnerEnable(true);
      auth()
        .signInWithEmailAndPassword(id, pw)
        .then(userCredential => {
          if (userCredential.user) {
            return userCredential.user.getIdToken().then(function (idToken) {
              loginPost(idToken);
            });
          } else {
            setSpinnerEnable(false);
            throw new Error('User is Null');
          }
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            showError('오류', '가입되지 않은 사용자 입니다.');
            console.log(
              'Thrown if there is no user corresponding to the given email.',
            );
          }

          if (error.code === 'auth/invalid-email') {
            showError('오류', '올바르지 않은 이메일입니다.');
            console.log('That email address is invalid!');
          }

          if (error.code === 'auth/user-disabled') {
            showError('오류', '비활성화 된 사용자 입니다.');
            console.log(
              'Thrown if the user corresponding to the given email has been disabled.',
            );
          }

          if (error.code === 'auth/wrong-password') {
            showError('오류', '올바르지 않은 비밀번호 입니다.');
            console.log(
              'Thrown if the password is invalid for the given email, or the account corresponding to the email does not have a password set.',
            );
          }

          console.error(error);
        });
    }
  };

  async function onGoogleLogin() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const onClickGoogleLogin = () => {
    //TODO 구글 로그인 구현 => 플레이스토어 아이디 필요
    onGoogleLogin()
      .then(() => {
        if (user) {
          return auth()
            .currentUser.getIdToken()
            .then(function (idToken) {
              loginPost(idToken);
            });
        }
        throw new Error('User is Null');
      })
      .catch(error => {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          showToast(toastType.info, '로그인 취소됨');
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          showError('오류', '이미 로그인 처리중');
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          showError('오류', '구글 로그인 사용 불가');
          // play services not available or outdated
        } else {
          showError('오류', '알수없는 오류 발생');
          // some other error happened
        }

        console.error(error);
      });
  };

  const onClickSignUp = () => {
    navigation.dispatch(StackActions.replace(navigation_id.signup));
  };

  return (
    <View style={styles.block}>
      <Spinner
        visible={isSpinnerEnable}
        textContent={'로딩중...'}
        textStyle={{color: '#FFF'}}
        cancelable={true}
      />
      <SafeAreaView>
        <View style={styles.frame}>
          <TouchableOpacity
            onPress={() =>
              isFormLanding
                ? null
                : navigation.dispatch(StackActions.popToTop())
            }>
            {isFormLanding ? null : (
              <Image
                source={require('../../assets/images/close.png')}
                style={styles.icon}
              />
            )}
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.subView}>
            <TextInput
              style={styles.input}
              onChangeText={value => setId(value)}
              placeholder={display_text.id}
              placeholderTextColor={type_color.gray}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
            />
          </View>

          <View style={styles.subView}>
            <TextInput
              style={styles.input}
              onChangeText={value => setPw(value)}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              placeholder={display_text.pw}
              placeholderTextColor={type_color.gray}
              secureTextEntry
            />
          </View>
          <View style={styles.loginButtonView}>
            <Pressable
              style={styles.loginButton}
              onPress={() => {
                console.log('isSpinnerEnable: ' + isSpinnerEnable.toString());
                if (isSpinnerEnable) {
                  showError(
                    '오류',
                    '이미 시도 중 입니다. 잠시만 기다려 주세요.',
                  );
                } else {
                  onClickLogin();
                }
              }}>
              <Text style={styles.buttonText} numberOfLines={1}>
                {display_text.login_button}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
      {/*
      <View style={styles.socialLoginView}>
        <TouchableOpacity
          style={styles.socialLoginButton}
          onPress={() => onClickGoogleLogin()}>
          <Image
            source={require('../../assets/images/google.png')}
            style={styles.socialLoginIcon}
          />
        </TouchableOpacity>
      </View>
      */}
      <View style={styles.signupButtonView}>
        <Text style={styles.signupHintText} numberOfLines={1}>
          {display_text.signup_text}
        </Text>
        <Pressable style={styles.signupButton} onPress={() => onClickSignUp()}>
          <Text style={[styles.buttonText, {color: 'black'}]} numberOfLines={1}>
            {display_text.signup_button}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    paddingTop: 25,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  block: {
    justifyContent: 'center',
  },
  scrollView: {
    marginTop: 70,
  },
  border: {
    backgroundColor: type_color.border,
    borderWidth: 0.3,
  },

  icon: {
    width: 28,
    height: 28,
    marginHorizontal: 5,
  },
  titleText: {
    textAlign: 'left',
    textAlignVertical: 'center',
    marginHorizontal: 5,
    fontSize: 24,
    fontFamily: 'BMJUA_ttf',
    color: 'black',
    padding: 15,
  },
  subView: {
    padding: 15,
  },
  subText: {
    textAlign: 'left',
    textAlignVertical: 'center',
    marginHorizontal: 5,
    fontSize: 20,
    fontFamily: 'BMJUA_ttf',
    color: 'black',
  },
  input: {
    flexDirection: 'row',
    flex: 1,
    textAlign: 'left',
    textAlignVertical: 'center',
    height: 45,
    marginTop: 10,
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: '#B1B1B1',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'black',
  },
  loginButtonView: {
    padding: 15,
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    fontFamily: 'BMJUA_ttf',
    color: 'white',
  },
  socialLoginView: {
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
  },
  socialLoginButton: {
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
  },
  socialLoginIcon: {
    width: 35,
    height: 35,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  signupHintText: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: 13,
    fontFamily: 'BMJUA_ttf',
    color: 'black',
    marginBottom: 10,
    marginStart: 51,
  },
  loginButton: {
    alignSelf: 'center',
    borderRadius: 0,
    paddingHorizontal: 120,
    paddingVertical: 20,
    elevation: 2,
    backgroundColor: type_color.polling,
  },
  signupButtonView: {
    padding: 15,
    paddingVertical: 20,
    marginTop: 200,
    marginBottom: 50,
  },
  signupButton: {
    alignSelf: 'center',
    borderWidth: 1,
    paddingHorizontal: 100,
    paddingVertical: 10,
  },
});

const display_text = {
  title: '로그인',
  id: '아이디',
  id_hint: 'example@example.com',
  pw: '비밀번호',
  pw_hint: '숫자/문자 포함 6~12자리 이내',
  login_button: '로그인',
  signup_button: '회원가입',
  signup_text: '아직 아이디가 없다면?',
};

export default login;
