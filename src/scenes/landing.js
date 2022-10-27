import {Image, Pressable, SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {navigation_id, type_color} from '../components/Constants';
import {StackActions} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {isFromLandingState} from '../atoms/landing';

function landing({navigation}) {
  const [, setFormLanding] = useRecoilState(isFromLandingState);

  const onClickLogin = () => {
    console.log('onClickLogin');
    setFormLanding(true);
    navigation.navigate(navigation_id.login);
  };

  const onClickStartGuest = () => {
    console.log('onClickStartGuest');
    navigation.dispatch(StackActions.replace(navigation_id.Feeds));
  };

  return (
    <SafeAreaView style={styles.block}>
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
