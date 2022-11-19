import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MenuProfile from './MenuProfile';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';
import {navigation_id, type_color, type_font} from './Constants';
import {showToast, toastType} from './ToastManager';
import {navState} from './Atoms';

function menu() {
  const [uuid, setUUID] = useRecoilState(uuidState);
  const [navigation] = useRecoilState(navState);

  return (
    <View style={styles.block}>
      {/*<TouchableOpacity
        style={{marginHorizontal: 5, marginVertical: 5}}
        onPress={() => navigation.closeDrawer()}>
        <Icon name={'x'} size={25} color={'black'} />
      </TouchableOpacity>*/}
      <View style={{marginTop: 30}} />
      <View style={styles.profileBlock}>
        <MenuProfile targetUUID={uuid} />
        {uuid == null && (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate(navigation_id.login)}>
            <Text style={styles.loginText}>로그인하기</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.menuBlock}>
        <TouchableOpacity
          style={styles.menuBox}
          onPress={() => {
            uuid == null
              ? showToast(toastType.error, '먼저 로그인을 해주세요.')
              : navigation.navigate(navigation_id.profile, {targetUUID: uuid});
          }}>
          <Text style={styles.menuText}>프로필 편집</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBox}>
          <Text style={styles.menuText}>내가 만든 투표</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBox}>
          <Text style={styles.menuText}>참여 투표 내역</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBox}>
          <Text style={styles.menuText}>관심 설문 다시하기</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}} />
      <View style={styles.buttonBlock}>
        {uuid != null && (
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                '로그아웃',
                '로그아웃 하시겠습니까?',
                [
                  {
                    text: '취소',
                    style: 'cancel',
                  },
                  {
                    text: '로그아웃',
                    onPress: () => setUUID(null),
                    style: 'destructive',
                  },
                  // 이벤트 발생시 로그를 찍는다
                ],
                {cancelable: false},
              )
            }>
            <Icon name={'log-out'} size={25} color={'black'} />
          </TouchableOpacity>
        )}
        <View style={{flex: 1}} />
        <TouchableOpacity>
          <Icon name={'settings'} size={25} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
    width: 250,
  },
  profileBlock: {
    marginVertical: 15,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuBlock: {
    marginHorizontal: 20,
  },
  menuBox: {
    marginVertical: 13,
  },
  menuText: {
    fontSize: 17,
    fontFamily: type_font.ggodic60,
    color: 'black',
  },
  loginText: {
    fontSize: 17,
    color: 'white',
    fontFamily: type_font.jua,
  },
  buttonBlock: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  loginButton: {
    width: 90,
    height: 35,
    borderRadius: 5,
    backgroundColor: type_color.polling,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
});
export default menu;
