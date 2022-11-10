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

const CommentFeed = ({postId, selectStartNum, text}) => {
  var page = 0;
  const pageCount = 2;
  const [loading, setLoading] = useState(false);
  const [json, setJson] = useState({comments: []});

  const feedLoading = async () => {
    if (page < pageCount) {
      console.log('Paging (postLoad)');
      setLoading(true);
      //await GetData(page++);
      setLoading(false);
    }
  };

  const onEndReached = () => {
    if (!loading) {
      feedLoading();
    }
  };

  const GetDataPage = async page_index => {
    fetch(url.postLoad + page_index)
      .then(res => res.json())
      .then(json => {
        setJson(json);
      });
  };

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
          onEndReachedThreshold={0.7}
          ListFooterComponent={loading && <ActivityIndicator />}
          renderItem={({item}) => (
            <CommentPost
              avatarFile={item.profileImage}
              selectNum={item.selectNum - selectStartNum + 1}
              timeBefore={item.timeBefore}
              posterId={item.posterId}
              content={item.content}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default CommentFeed;
