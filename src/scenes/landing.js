import {Image, Pressable, SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {navigation_id, type_color, type_id, url} from '../components/Constants';
import {StackActions} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {isFromLandingState} from '../atoms/landing';
import {navState} from '../components/Atoms';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {
  showNetworkError,
  showToast,
  toastType,
} from '../components/ToastManager';
import {URL} from 'react-native-url-polyfill';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isAdminState, isNewState, userState, uuidState} from '../atoms/auth';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import Spinner from 'react-native-loading-spinner-overlay';

function landing({navigation}) {
  const [, setFormLanding] = useRecoilState(isFromLandingState);
  const [, setNav] = useRecoilState(navState);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [, setUser] = useRecoilState(userState);
  const [, setUUID] = useRecoilState(uuidState);
  const [, setIsNew] = useRecoilState(isNewState);
  const [, setIsAdmin] = useRecoilState(isAdminState);
  const [isSpinnerEnable, setSpinnerEnable] = useState(false);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  const onClickLogin = () => {
    console.log('onClickLogin');
    setFormLanding(true);
    navigation.dispatch(StackActions.replace(navigation_id.login));
  };

  const onClickStartGuest = () => {
    console.log('onClickStartGuest');
    navigation.dispatch(StackActions.replace(navigation_id.Feeds));
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

  setNav(navigation);

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

        showToast(toastType.success, '자동 로그인 되었습니다.');

        setFCMToken(data.UUID)
          .then(function () {
            setSpinnerEnable(false);
          })
          .catch(function (error) {
            setSpinnerEnable(false);
          });
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

  const login = (id, pw) => {
    auth()
      .signInWithEmailAndPassword(id, pw)
      .then(userCredential => {
        if (userCredential.user) {
          return userCredential.user.getIdToken().then(function (idToken) {
            setSpinnerEnable(true);

            loginPost(idToken);
          });
        } else {
          throw new Error('User is Null');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const autoLogin = () => {
    AsyncStorage.getItem('userData').then(function (result) {
      const userData = JSON.parse(result);
      if (userData) {
        //console.log('userData: ' + userData);
        //console.log('userData id: ' + userData.id);
        //console.log('userData pw: ' + userData.pw);
        navigation.dispatch(StackActions.replace(navigation_id.Feeds));
        login(userData.id, userData.pw);
      }
    });
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    autoLogin();

    dynamicLinks()
      .getInitialLink()
      .then(link => {
        const viewRegex = new RegExp('/view?\\w+');
        if (viewRegex.test(link.url)) {
          const linkUrl = new URL(link.url);
          const postId = linkUrl.searchParams.get('pid');
          const type = linkUrl.searchParams.get('type');

          setSpinnerEnable(true);

          onClickStartGuest();

          if (type === type_id.polling || type === type_id.balance) {
            fetch(url.voteLoad + postId)
              .then(function (response) {
                console.log(response);
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error('Network response was not ok.');
                }
              })
              .then(function (data) {
                setSpinnerEnable(false);

                navigation.navigate(navigation_id.pollingResult, {
                  postType: data.postType,
                  postId: data.postId,
                  timeBefore: data.timeBefore,
                  userCount: data.userCount,
                  storyText: data.storyText,
                  selection: data.selection,
                });
              })
              .catch(function (error) {
                setSpinnerEnable(false);

                showNetworkError(error.message);
                console.log(
                  'There has been a problem with your fetch operation: ',
                  error.message,
                );
              });
          } else if (type === type_id.battle) {
            fetch(url.battleLoad + '/' + postId)
              .then(function (response) {
                console.log(response);
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error('Network response was not ok.');
                }
              })
              .then(function (data) {
                setSpinnerEnable(false);

                navigation.navigate(navigation_id.battlePost, {
                  navigation: navigation,
                  postId: data.postId,
                  timeLeft: data.timeLeft,
                  userCount: data.userCount,
                  textA: data.textA,
                  textB: data.textB,
                });
              })
              .catch(function (error) {
                setSpinnerEnable(false);

                showNetworkError(error.message);
                console.log(
                  'There has been a problem with your fetch operation: ',
                  error.message,
                );
              });
          }
        }
      });

    return () => {
      subscriber; // unsubscribe on unmount
    };
  }, []);

  return (
    <SafeAreaView style={styles.block}>
      <Spinner
        visible={isSpinnerEnable}
        textContent={'로딩중...'}
        textStyle={{color: '#FFF'}}
        cancelable={true}
      />
      <Image
        source={require('../../assets/images/landing_logo.png')}
        style={styles.icon}
      />
      <Pressable style={styles.loginButton} onPress={() => onClickLogin()}>
        <Text style={styles.loginButtonText} numberOfLines={1}>
          {display_text.login_button}
        </Text>
      </Pressable>

      <Pressable style={styles.startButton} onPress={() => onClickStartGuest()}>
        <Text style={styles.startButtonText} numberOfLines={1}>
          {display_text.start_guest}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: type_color.polling,
    alignItems: 'center',
  },
  icon: {
    width: 62,
    height: 87,
    marginTop: 220,
  },
  loginButton: {
    alignSelf: 'center',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 100,
    paddingVertical: 20,
    marginTop: 170,
    backgroundColor: type_color.polling,
  },
  loginButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    fontFamily: 'BMJUA_ttf',
    color: 'white',
  },
  startButton: {
    alignSelf: 'center',
    borderRadius: 0,
    borderColor: 'white',
    paddingHorizontal: 100,
    paddingVertical: 20,
    marginTop: 30,
    backgroundColor: type_color.polling,
  },
  startButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
    fontFamily: 'BMJUA_ttf',
    borderBottomWidth: 1,
    borderColor: '#5A5A5A',
    color: '#5A5A5A',
  },
});

const display_text = {
  login_button: '로그인',
  start_guest: '게스트로 시작',
};

export default landing;
