import React from 'react';
import {Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import PollingPost from './PollingPost';
import {post_type} from './Constants';

function Feed({navigation, type}) {
  return (
    <SafeAreaView style={styles.block}>
      {posts.length == 0 ? (
        <Text>내용없음</Text>
      ) : (
        <FlatList
          data={posts}
          renderItem={({item}) => (
            <PollingPost
              navigation={navigation}
              postType={post_type.votePost}
              contentType={type}
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
    backgroundColor: 'white',
  },
});

const posts = [
  {
    id: 1, //사용자 아이디
    timeBefore: 15, //몇분전에 올렸는지
    userCount: 172, //투표 참여자 수
    storyText: '더 싫은 선생님 유형은?', //글 내용
    selectText: [
      {text: '진도 안 나가는 쌤', percent: 16},
      {text: '수업 안 끝내주는 쌤', percent: 84},
    ], //선택지 내용
    likes: 11, //좋아요 수
    comments: 14, //댓글수
  },
  {
    id: 2,
    timeBefore: 25,
    userCount: 272,
    storyText: '맛집을 고를 때 가장 중요한 것은?',
    selectText: [
      {text: '블로그, SNS, 유튜브', percent: 52},
      {text: '지인 추천', percent: 16},
      {text: '웨이팅 없는 곳', percent: 14},
      {text: '보이는 대로 간다', percent: 19},
    ],
    likes: 21,
    comments: 24,
  },
  {
    id: 3,
    timeBefore: 35,
    userCount: 372,
    storyText: '무인도에 한 가지만 가져간다면?',
    selectText: [
      {text: '스마트폰', percent: 18},
      {text: '라이터', percent: 6},
      {text: '정수기', percent: 4},
      {text: '김병만', percent: 62},
      {text: '무인도에서 살아남기 책', percent: 10},
    ],
    likes: 31,
    comments: 34,
  },
  {
    id: 4,
    timeBefore: 45,
    userCount: 472,
    storyText: '이별 후 전 애인의 번호와 사진',
    selectText: [
      {text: '지운다', percent: 70},
      {text: '안 지운다', percent: 30},
    ],
    likes: 41,
    comments: 44,
  },
];

export default Feed;
