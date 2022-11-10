import React, {useState} from 'react';
import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CommentFeed from '../components/CommentFeed';
import TopBarBack from '../components/TopBarBack';
import {type_color, type_font, type_id, url} from '../components/Constants';
import PollingPostBlock from '../components/PollingPostBlock';
import Icon from 'react-native-vector-icons/Feather';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';

function comment({navigation, route}) {
  const [text, setText] = useState('');
  const [uuid] = useRecoilState(uuidState);

  const commentPost = () => {
    console.log(uuid, route.params.postId, text);
    return fetch(url.commentPost, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UUID: uuid,
        pid: route.params.postId,
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <TopBarBack
        navigation={navigation}
        type={route.params.postType}
        optionalTitle={'댓글'}
      />
      <View style={[styles.block, {marginTop: 15}]}>
        <PollingPostBlock
          postId={route.params.postId}
          postType={route.params.postType}
          timeBefore={route.params.timeBefore}
          userCount={route.params.userCount}
          storyText={route.params.storyText}
          selection={route.params.selection}
          voteActive={false}
        />
      </View>
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderBottomWidth: 0,
          borderColor: type_color.gray,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <CommentFeed
          postId={route.params.postId}
          selectStartNum={route.params.selection[0].selectionId.split('_')[1]}
          text={text}
        />
      </View>
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
            {backgroundColor: type_color[route.params.postType]},
          ]}
          onPress={() => text != '' && [commentPost(), setText('')]}>
          <Icon name={'send'} size={23} color={'white'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    marginHorizontal: 10,
    marginBottom: 15,
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: type_color.gray,
    borderRadius: 10,
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

export default comment;
