import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {
  navigation_id,
  type_color,
  type_font,
  type_id,
  type_text,
} from './Constants';
import {uuidState} from '../atoms/auth';
import {useRecoilState} from 'recoil';
import {showToast, toastType} from './ToastManager';

function TopBar({navigation, type, isMakePoll}) {
  const [uuid] = useRecoilState(uuidState);

  const onClickMakePoll = () => {
    if (uuid == null) {
      showToast(toastType.error, '투표 생성은 로그인 후 가능합니다.');
    } else {
      if (type === type_id.battle) {
        showToast(
          toastType.info,
          '관리자 기능',
          '투표 배틀 게시 기능은 관리자 전용 기능입니다.',
        );
      } else {
        navigation.navigate(navigation_id.makePoll, {typeId: type});
      }
    }
  };

  return (
    <>
      <View style={[styles.frame, {backgroundColor: type_color[type]}]}>
        <View
          style={[
            styles.block,
            {
              backgroundColor: type_color[type],
            },
          ]}>
          <Image source={type_logo[type]} style={styles.image} />
          <Text style={styles.titleText}>
            {isMakePoll ? type_text[type_id.makePoll] : type_text[type]}
          </Text>
        </View>
        <View style={styles.empty} />

        {!isMakePoll ? (
          <View style={styles.block}>
            <TouchableOpacity
              onPress={() => {
                onClickMakePoll();
              }}>
              <Image
                source={require('../../assets/images/plus.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('test')}>
              <Image
                source={require('../../assets/images/search.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../../assets/images/menu.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.block}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(StackActions.popToTop())}>
              <Image
                source={require('../../assets/images/close.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
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
    flexDirection: 'row',
  },
  empty: {
    flex: 1,
  },
  titleText: {
    marginTop: 5,
    fontSize: 26,
    fontFamily: type_font.jua,
    color: 'black',
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 6,
  },
  icon: {
    width: 28,
    height: 28,
    marginHorizontal: 5,
  },
});

const type_logo = {
  polling: require('../../assets/images/logo_polling.png'),
  balance: require('../../assets/images/logo_balance.png'),
  battle: require('../../assets/images/logo_battle.png'),
  makePoll: require('../../assets/images/logo_polling.png'),
};

export default TopBar;
