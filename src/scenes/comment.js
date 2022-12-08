import React, {useState} from 'react';
import {
  Animated,
  Keyboard,
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
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';
import MakeLinkPoll from '../components/MakeLinkPoll';
import {showToast, toastType} from '../components/ToastManager';
import BalancePostBlock from '../components/BalancePostBlock';

function comment({navigation, route}) {
  const [text, setText] = useState('');
  const [uuid] = useRecoilState(uuidState);
  const [makeLink, setMakeLink] = useState(false);

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
        {route.params.postType == type_id.polling ? (
          <PollingPostBlock
            postId={route.params.postId}
            postType={route.params.postType}
            timeBefore={route.params.timeBefore}
            userCount={route.params.userCount}
            storyText={route.params.storyText}
            selection={route.params.selection}
          />
        ) : (
          <BalancePostBlock
            postId={route.params.postId}
            postType={route.params.postType}
            timeBefore={route.params.timeBefore}
            userCount={route.params.userCount}
            storyText={route.params.storyText}
            selection={route.params.selection}
          />
        )}
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
        {!makeLink && (
          <CommentFeed
            navigation={navigation}
            postId={route.params.postId}
            selectStartNum={route.params.selection[0].selectionId.split('_')[1]}
            text={text}
          />
        )}
      </View>
      {!makeLink ? (
        <View style={styles.writeBlock}>
          {route.params.postType == type_id.balance && (
            <TouchableOpacity
              style={{marginRight: 4}}
              onPress={() => setMakeLink(true)}>
              <Icon2
                name={'chart-box-plus-outline'}
                size={25}
                color={type_color.balance}
              />
            </TouchableOpacity>
          )}
          <TextInput
            style={styles.textBox}
            placeholder="댓글 입력"
            onChangeText={newText => setText(newText)}
            defaultValue={text}
            placeholderTextColor={type_color.gray}
          />
          <TouchableOpacity
            style={[
              styles.uploadButton,
              {backgroundColor: type_color[route.params.postType]},
            ]}
            onPress={() => {
              text == ''
                ? showToast(toastType.error, '댓글 내용을 입력해주세요.')
                : [commentPost(), setText(''), Keyboard.dismiss()];
            }}>
            <Icon name={'send'} size={23} color={'white'} />
          </TouchableOpacity>
        </View>
      ) : (
        <MakeLinkPoll postId={route.params.postId} setMakeLink={setMakeLink} />
      )}
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
