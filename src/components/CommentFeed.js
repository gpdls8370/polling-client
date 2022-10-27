import React, {useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import CommentPost from './CommentPost';
import PollingPost from './PollingPost';

const CommentFeed = ({scrollY, imageHeight, ...props}) => {
  var page = 0;
  const pageCount = 2;
  const [loading, setLoading] = useState(false);

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

  return (
    <SafeAreaView>
      <FlatList
        data={comments}
        onEndReachedThreshold={0.7}
        ListFooterComponent={loading && <ActivityIndicator />}
        renderItem={({item}) => (
          <CommentPost
            avatarFile={item.avatarFile}
            selectNum={item.selectNum}
            timeBefore={item.timeBefore}
            posterId={item.posterId}
            content={item.content}
          />
        )}
      />
    </SafeAreaView>
  );
};
const comments = [
  {
    avatarFile: require('../../assets/images/avatar1.png'),
    selectNum: 1,
    timeBefore: 122,
    posterId: '귀여운 푸앙',
    content: '댓글1 내용은 여기에 들어감',
  },
  {
    avatarFile: require('../../assets/images/avatar2.png'),
    selectNum: 3,
    timeBefore: 162,
    posterId: '무서운 푸앙',
    content: '댓글2 내용은 여기에 들어감',
  },
  {
    avatarFile: require('../../assets/images/avatar3.png'),
    selectNum: 2,
    timeBefore: 424,
    posterId: '멋있는 푸앙',
    content: '댓글3 내용은 여기에 들어감',
  },
  {
    avatarFile: require('../../assets/images/avatar3.png'),
    selectNum: 2,
    timeBefore: 424,
    posterId: '멋있는 푸앙',
    content: '댓글3 내용은 여기에 들어감',
  },
  {
    avatarFile: require('../../assets/images/avatar3.png'),
    selectNum: 2,
    timeBefore: 424,
    posterId: '멋있는 푸앙',
    content: '댓글3 내용은 여기에 들어감',
  },
];

export default CommentFeed;
