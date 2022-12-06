import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MenuProfile from './MenuProfile';
import {useRecoilState} from 'recoil';
import {isAdminState, userState, uuidState} from '../atoms/auth';
import {navigation_id, type_color, type_font, url} from './Constants';
import {showNetworkError, showToast, toastType} from './ToastManager';
import {
  balanceRefreshState,
  battlesRefreshState,
  navState,
  pollingRefreshState,
} from './Atoms';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function menu() {
  const [uuid, setUUID] = useRecoilState(uuidState);
  const [, setIsAdmin] = useRecoilState(isAdminState);
  const [, setUser] = useRecoilState(userState);
  const [navigation] = useRecoilState(navState);
  const [pollingRefresh, setPollingRefresh] =
    useRecoilState(pollingRefreshState);
  const [balanceRefresh, setBalanceRefresh] =
    useRecoilState(balanceRefreshState);
  const [battleRefresh, setBattlesRefresh] =
    useRecoilState(battlesRefreshState);

  const setFCMToken = async uuid => {
    return await fetch(url.userToken, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UUID: uuid,
        token: 'NULL',
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
  };

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
        <TouchableOpacity
          style={styles.menuBox}
          onPress={() => {
            uuid == null
              ? showToast(toastType.error, '먼저 로그인을 해주세요.')
              : navigation.navigate(navigation_id.myPolls);
          }}>
          <Text style={styles.menuText}>내가 만든 투표</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuBox}
          onPress={() => {
            uuid == null
              ? showToast(toastType.error, '먼저 로그인을 해주세요.')
              : navigation.navigate(navigation_id.myVotedPolls);
          }}>
          <Text style={styles.menuText}>내가 참여한 투표</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBox}>
          <Text style={styles.menuText}>관심 태그 재설정</Text>
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
                    onPress: () => {
                      setFCMToken(uuid).then(function () {
                        AsyncStorage.removeItem('userData');
                        setIsAdmin(false);
                        setUUID(null);
                        setUser(null);
                        setPollingRefresh(!pollingRefresh);
                        setBalanceRefresh(!balanceRefresh);
                        setBattlesRefresh(!battleRefresh);
                        auth()
                          .signOut()
                          .then(() => console.log('User signed out!'));
                      });
                    },
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
        {/*<TouchableOpacity>
          <Icon name={'settings'} size={25} color={'black'} />
        </TouchableOpacity>*/}
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
