import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {type_color, type_font} from './Constants';
import BattlePostBlock from './BattlePostBlock';
import ChattingFeed from './ChattingFeed';
import Icon from 'react-native-vector-icons/Feather';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';

function BattlePost({
  navigation,
  postId, //'bid_5'
  //posterId, //'빛나는 참새'
  timeLeft,
  userCount,
  selection, //["selectionId' : 'sid_13' "text" : '옵션1'
  isAvailable = true,
}) {
  const [text, setText] = useState('');
  const [uuid] = useRecoilState(uuidState);

  const commentPost = () => {
    /*console.log(uuid, postId, text);
    return fetch(url.commentPost, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UUID: uuid,
        pid: postId,
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
      */
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.block}>
        <BattlePostBlock
          navigation={navigation}
          postId={postId}
          timeLeft={timeLeft}
          userCount={userCount}
          selection={selection}
          isAvailable={isAvailable}
        />
      </View>
      <View style={{flex: 1}}>
        <ChattingFeed postId={postId} />
      </View>

      <View style={styles.writeBlock}>
        <TextInput
          style={styles.textBox}
          placeholder="댓글 입력"
          onChangeText={newText => setText(newText)}
          defaultValue={text}
        />
        <TouchableOpacity
          style={[styles.uploadButton, {backgroundColor: type_color.battle}]}
          onPress={() => text != '' && [commentPost(), setText('')]}>
          <Icon name={'send'} size={23} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
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
});

export default BattlePost;
