import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import PollingPost from './PollingPost';

function Feed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      timeBefore: 15,
      userCount: 172,
      storyText: '포스트 내용1',
      selectText: [{text: '1-1번'}, {text: '1-2번'}],
      likes: 11,
      comments: 14,
    },
    {
      id: 2,
      timeBefore: 25,
      userCount: 272,
      storyText: '포스트 내용2',
      selectText: [{text: '2-1번'}, {text: '2-2번'}],
      likes: 21,
      comments: 24,
    },
    {
      id: 3,
      timeBefore: 35,
      userCount: 372,
      storyText: '포스트 내용3',
      selectText: [{text: '3-1번'}, {text: '3-2번'}],
      likes: 31,
      comments: 34,
    },
    {
      id: 4,
      timeBefore: 45,
      userCount: 472,
      storyText: '포스트 내용4',
      selectText: [{text: '4-1번'}, {text: '4-2번'}],
      likes: 41,
      comments: 44,
    },
  ]);

  return (
    <SafeAreaView style={styles.block}>
      {posts.length == 0 ? (
        <Text>내용없음</Text>
      ) : (
        <FlatList
          data={posts}
          renderItem={({item}) => (
            <PollingPost
              time={item.timeBefore}
              count={item.userCount}
              storyText={item.storyText}
              selectText={item.selectText}
              likes={item.likes}
              comments={item.comments}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default Feed;
