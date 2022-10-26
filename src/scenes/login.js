import React, {useEffect, useState} from 'react';
import {
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
import {userState, uuidState} from '../atoms/auth';

function login({navigation}) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useRecoilState(userState);
  const [uuid, setUUID] = useRecoilState(uuidState);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  const idRegex =
    /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  const pwRegex = /^[A-Za-z0-9]{6,12}$/;

  const isValidInput = () => {
    if (!idRegex.test(id)) {
      return false;
      //TODO 올바르지 않은 이메일 토스트 메시지 구현
    }

    if (!pwRegex.test(pw)) {
      return false;
      //TODO 올바르지 않은 비밀번호 토스트 메시지 구현
    }

    return true;
  };

  const loginPost = token => {
    //TODO 서버 API 확정되면 수정
    return fetch(url.signin, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginToken: token,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(function (data) {
        setUUID(data.UUID);
        console.log(data.UUID);
        if (data.isNew) {
          navigation.dispatch(StackActions.popToTop());
          //TODO 개인정보 입력창으로 넘기기 구현
        } else {
          navigation.dispatch(StackActions.popToTop());
        }
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  const onClickLogin = () => {
    if (isValidInput()) {
      auth()
        .signInWithEmailAndPassword(id, pw)
        .then(() => {
          if (user) {
            loginPost(user.getIdToken());
          }
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
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
          loginPost(user.getIdToken());
        }
      })
      .catch(error => {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }

        console.error(error);
      });
  };

  const onClickSignUp = () => {
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate(navigation_id.signup);
  };

  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.frame}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(StackActions.popToTop())}>
          <Image
            source={require('../../assets/images/close.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.subView}>
          <TextInput
            style={styles.input}
            onChangeText={value => setId(value)}
            placeholder={display_text.id}
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
            placeholder={display_text.pw}
            secureTextEntry
          />
        </View>
        <View style={styles.loginButtonView}>
          <Pressable style={styles.loginButton} onPress={() => onClickLogin()}>
            <Text style={styles.buttonText} numberOfLines={1}>
              {display_text.login_button}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
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
  scrollView: {
    marginTop: 50,
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
    textAlignVertical: 'top',
    height: 45,
    marginTop: 10,
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: '#B1B1B1',
    padding: 15,
    fontFamily: 'BMJUA_ttf',
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
