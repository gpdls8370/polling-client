import {Image, Pressable, SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import {navigation_id, type_color, url} from '../components/Constants';
import {StackActions} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {isFromLandingState} from '../atoms/landing';
import {navState} from '../components/Atoms';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {showNetworkError} from '../components/ToastManager';

function landing({navigation}) {
  const [, setFormLanding] = useRecoilState(isFromLandingState);
  const [, setNav] = useRecoilState(navState);

  const onClickLogin = () => {
    console.log('onClickLogin');
    setFormLanding(true);
    navigation.dispatch(StackActions.replace(navigation_id.login));
  };

  const onClickStartGuest = () => {
    console.log('onClickStartGuest');
    navigation.dispatch(StackActions.replace(navigation_id.Feeds));
  };

  setNav(navigation);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        const viewRegex = new RegExp('/view/\\w+');

        if (viewRegex.test(link.url)) {
          const postId = link.url.split('/view/')[1];

          onClickStartGuest();

          fetch(url.voteLoad + '/' + postId)
            .then(function (response) {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Network response was not ok.');
              }
            })
            .then(function (data) {
              console.log(data);

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
              showNetworkError(error.message);
              console.log(
                'There has been a problem with your fetch operation: ',
                error.message,
              );
            });
        }
      });
  }, []);

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
