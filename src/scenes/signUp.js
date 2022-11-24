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
import {useRecoilState} from 'recoil';
import {isNewState, userState, uuidState} from '../atoms/auth';
import {showError, showNetworkError} from '../components/ToastManager';
import {isFromLandingState} from '../atoms/landing';
import messaging from '@react-native-firebase/messaging';

function signUp({navigation}) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [rePw, setRePw] = useState('');
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useRecoilState(userState);
  const [uuid, setUUID] = useRecoilState(uuidState);
  const [, setIsNew] = useRecoilState(isNewState);
  const [isFormLanding, setFormLanding] = useRecoilState(isFromLandingState);

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

    if (pw !== rePw) {
      showError('오류', '비밀번호가 서로 다릅니다.');
      return false;
    }

    if (!pwRegex.test(pw)) {
      showError(
        '오류',
        '비밀번호를 숫자/문자 포함 6~12자리 이내로 만들어주세요.',
      );
      return false;
    }

    return true;
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
              return response.json();
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

  const signUpPost = token => {
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
        console.log(data);

        setIsNew(data.isNew);

        setFCMToken(data.UUID);

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
        showNetworkError(error.message);
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  const onClickNext = () => {
    if (isValidInput()) {
      auth()
        .createUserWithEmailAndPassword(id, pw)
        .then(userCredential => {
          if (userCredential.user) {
            return userCredential.user.getIdToken().then(function (idToken) {
              signUpPost(idToken);
            });
          } else {
            throw new Error('User is Null');
          }
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            showError('오류', '이미 사용중인 이메일입니다.');
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            showError('오류', '올바르지 않은 이메일입니다.');
            console.log('That email address is invalid!');
          }

          if (error.code === 'auth/operation-not-allowed') {
            showError('오류', '알수없는 오류 발생');
            console.log(
              'Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.',
            );
          }

          if (error.code === 'auth/weak-password') {
            showError('오류', '비밀번호가 너무 짧거나 약합니다.');
            console.log('Thrown if the password is not strong enough.');
          }

          console.error(error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.frame}>
        <TouchableOpacity
          onPress={() =>
            isFormLanding ? null : navigation.dispatch(StackActions.popToTop())
          }>
          {isFormLanding ? null : (
            <Image
              source={require('../../assets/images/close.png')}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.titleText}>{display_text.title}</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.subView}>
          <Text style={styles.subText}>{display_text.id}</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => setId(value)}
            placeholder={display_text.id_hint}
            placeholderTextColor={type_color.gray}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
          />
        </View>

        <View style={styles.subView}>
          <Text style={styles.subText}>{display_text.pw}</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => setPw(value)}
            placeholder={display_text.pw_hint}
            placeholderTextColor={type_color.gray}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </View>
        <View style={styles.subView}>
          <Text style={styles.subText}>{display_text.re_pw}</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => setRePw(value)}
            placeholder={display_text.pw_hint}
            placeholderTextColor={type_color.gray}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Pressable style={styles.loginButton} onPress={() => onClickNext()}>
          <Text style={styles.buttonText} numberOfLines={1}>
            {display_text.button}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
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
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {},
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
    textAlignVertical: 'top',
    height: 45,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#B1B1B1',
    padding: 15,
    color: 'black',
  },
  buttonView: {
    padding: 15,
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    fontFamily: 'BMJUA_ttf',
    color: 'white',
  },
  loginButton: {
    alignSelf: 'center',
    borderRadius: 0,
    paddingHorizontal: 120,
    paddingVertical: 20,
    elevation: 2,
    backgroundColor: type_color.polling,
  },
});

const display_text = {
  title: '계정 생성',
  id: '아이디',
  id_hint: 'example@example.com',
  pw: '비밀번호',
  re_pw: '비밀번호 확인',
  pw_hint: '숫자/문자 포함 6~12자리 이내',
  button: '다음으로',
};

export default signUp;
