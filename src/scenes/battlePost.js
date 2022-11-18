import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {type_color, type_font, type_id} from '../components/Constants';
import BattlePostBlock from '../components/BattlePostBlock';
import ChattingFeed from '../components/ChattingFeed';
import Icon from 'react-native-vector-icons/Feather';
import TopBar from '../components/TopBar';

function battlePost({navigation, route}) {
  const [text, setText] = useState('');

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
    <>
      <TopBar navigation={navigation} type={type_id.battle} />
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.block}>
          <BattlePostBlock
            navigation={navigation}
            postId={route.params.postId}
            timeLeft={route.params.timeLeft}
            userCount={route.params.userCount}
            selection={route.params.selection}
          />
        </View>
        <View style={{flex: 1}}>
          <ChattingFeed postId={route.params.postId} />
        </View>
        <KeyboardAvoidingView>
          <View style={styles.writeBlock}>
            <TextInput
              style={styles.textBox}
              placeholder="댓글 입력"
              onChangeText={newText => setText(newText)}
              defaultValue={text}
            />
            <TouchableOpacity
              style={[
                styles.uploadButton,
                {backgroundColor: type_color.battle},
              ]}
              onPress={() => text != '' && [commentPost(), setText('')]}>
              <Icon name={'send'} size={23} color={'white'} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
});

export default battlePost;
