import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import CommentPost from './CommentPost';

import {type_color, type_font, url} from './Constants';

const CommentFeed = ({navigation, postId, selectStartNum, text}) => {
  const [json, setJson] = useState({comments: []});

  const GetData = () => {
    fetch(url.commentLoad + postId)
      .then(res => res.json())
      .then(json => {
        setJson(json);
        console.log(json);
      });
  };

  useEffect(() => {
    GetData();
  }, [text]); //갱신용

  return (
    <SafeAreaView>
      {json.comments.length == 0 ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 150,
          }}>
          <Text
            style={{
              fontFamily: type_font.ggodic80,
              fontSize: 20,
              color: type_color.disablePressableButton,
            }}>
            아직 댓글이 없습니다.
          </Text>
          <Text
            style={{
              fontFamily: type_font.ggodic80,
              fontSize: 20,
              color: type_color.disablePressableButton,
              marginVertical: 10,
            }}>
            첫 댓글을 등록해보세요!
          </Text>
        </View>
      ) : (
        <FlatList
          data={json.comments}
          renderItem={({item}) => (
            <CommentPost
              navigation={navigation}
              avatarFile={item.profileImage}
              selectNum={item.selectNum - selectStartNum + 1}
              timeBefore={item.timeBefore}
              posterId={item.posterId}
              content={item.content}
              //linkVoteId={item.linkVoteId}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default CommentFeed;
