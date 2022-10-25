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
import {type_color, url} from '../components/Constants';
import {StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useRecoilState} from 'recoil';
import {userState, uuidState} from '../atoms/auth';

function signUp({navigation}) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [rePw, setRePw] = useState('');
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

    if (pw !== rePw) {
      return false;
      //TODO 다른 비밀번호 토스트 메시지 구현
    }

    if (!pwRegex.test(pw)) {
      return false;
      //TODO 올바르지 않은 비밀번호 토스트 메시지 구현
    }

    return true;
  };

  const signUpPost = token => {
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

  const onClickNext = () => {
    if (isValidInput()) {
      auth()
        .createUserWithEmailAndPassword(id, pw)
        .then(() => {
          if (user) {
            signUpPost(user.getIdToken());
          }
          console.log('User account created & signed in!');
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
      <Text style={styles.titleText}>{display_text.title}</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.subView}>
          <Text style={styles.subText}>{display_text.id}</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => setId(value)}
            placeholder={display_text.id_hint}
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
            keyboardType="default"
            secureTextEntry
          />
        </View>
        <View style={styles.subView}>
          <Text style={styles.subText}>{display_text.re_pw}</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => setRePw(value)}
            placeholder={display_text.pw_hint}
            keyboardType="default"
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
    fontFamily: 'BMJUA_ttf',
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
