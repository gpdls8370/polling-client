import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {type_color, type_font, type_id, url} from '../components/Constants';
import BattlePostBlock from '../components/BattlePostBlock';
import ChattingFeed from '../components/ChattingFeed';
import Icon from 'react-native-vector-icons/Feather';
import TopBarBack from '../components/TopBarBack';
import {useRecoilState} from 'recoil';
import {battleRefresh} from '../components/Atoms';
import {uuidState} from '../atoms/auth';
import BattleReward from '../components/BattleReward';
import {showToast, toastType} from '../components/ToastManager';

function battlePost({navigation, route}) {
  const [text, setText] = useState('');
  const [percentA, setPercentA] = useState(0);
  const [timeLeft, setTime] = useState(0);
  const [userCount, setUser] = useState(0);
  const [refresh] = useRecoilState(battleRefresh);
  const [chats, setChats] = useState([]);

  const [uuid] = useRecoilState(uuidState);
  const [loading, setLoading] = useState(false);

  const chattingPost = () => {
    console.log(uuid, route.params.postId, text);
    return fetch(url.chattingPost, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UUID: uuid,
        postId: route.params.postId,
        content: text,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  const GetResult = () => {
    fetch(url.battleResult + route.params.postId)
      .then(res => res.json())
      .then(json => {
        setPercentA(Math.floor(json.percentA));
        setUser(json.userCount);
        setTime(json.timeLeft);
      });
  };

  const GetChatting = () => {
    setLoading(true);

    fetch(url.chattingLoad + route.params.postId)
      .then(res => res.json())
      .then(json => {
        setChats(json.chats);
        setLoading(false);
      });
  };

  const Refresh = () => {
    GetResult();
    GetChatting();
    console.log(route.params.postId + ' 배틀 결과 갱신');
  };

  useEffect(() => {
    if (route.params.timeLeft > 0) {
      Refresh();
      let timer = setInterval(function () {
        Refresh();
      }, 3000);
      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  useEffect(() => {
    Refresh();
  }, [refresh]);

  return (
    <>
      <TopBarBack navigation={navigation} type={type_id.battle} />
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.block}>
          <BattlePostBlock
            navigation={navigation}
            postId={route.params.postId}
            timeLeft={timeLeft}
            userCount={userCount}
            textA={route.params.textA}
            textB={route.params.textB}
            percentA={percentA}
          />
        </View>
        {route.params.timeLeft > 0 ? (
          <>
            <View style={{flex: 1}}>
              <ChattingFeed chats={chats} loading={loading} />
            </View>

            <View style={styles.writeBlock}>
              <TextInput
                style={styles.textBox}
                placeholder="채팅 입력"
                onChangeText={newText => setText(newText)}
                defaultValue={text}
              />
              <TouchableOpacity
                style={[
                  styles.uploadButton,
                  {backgroundColor: type_color.battle},
                ]}
                onPress={() => {
                  text == ''
                    ? showToast(toastType.error, '채팅 내용을 입력해주세요.')
                    : [
                        chattingPost(),
                        Refresh(),
                        setText(''),
                        Keyboard.dismiss(),
                      ];
                }}>
                <Icon name={'send'} size={23} color={'white'} />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.endBlock}>
            <BattleReward postId={route.params.postId} />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    marginTop: 5,
    paddingTop: 3,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
  },
  writeBlock: {
    marginHorizontal: 5,
    marginVertical: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    flex: 1,
    height: 30,
    borderRadius: 20,
    marginRight: 5,
    paddingHorizontal: 10,
    backgroundColor: type_color.lightBackground,
    fontSize: 15,
    paddingVertical: 5,
    fontStyle: type_font.ggodic60,
  },
  uploadButton: {
    height: 34,
    width: 34,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 5,
    paddingTop: 2,
  },
  endBlock: {flex: 1},
});

export default battlePost;
