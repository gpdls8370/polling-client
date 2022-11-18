import React, {useState} from 'react';
import {FlatList, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import ChattingPost from './ChattingPost';

function ChattingFeed() {
  return (
    <KeyboardAvoidingView style={styles.block}>
      <FlatList
        data={comment.comments}
        scrollEnabled={true}
        renderItem={({item}) => (
          <ChattingPost
            avatarFile={item.profileImage}
            selectNum={item.selectNum}
            posterId={item.posterId}
            content={item.content}
          />
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {paddingTop: 10},
});

const comment = {
  comments: [
    {
      profileImage: 'http://devcap.duckdns.org:57043/images/Z3P15Dj.png',
      posterUuid: '0000000000000000000000000003',
      posterId: '아니꼬운 스컹크',
      selectNum: 1,
      content: '근본은 강아지 ㅇㅈ?',
    },
    {
      profileImage: 'http://devcap.duckdns.org:57043/images/Z3P15Dj.png',
      posterUuid: '0000000000000000000000000003',
      posterId: '귀여운 푸앙',
      selectNum: 2,
      content: '아니야 요즘엔 고양이지',
    },
    {
      profileImage: 'http://devcap.duckdns.org:57043/images/Z3P15Dj.png',
      posterUuid: '0000000000000000000000000003',
      posterId: '무서운 스컹크',
      selectNum: 1,
      content: '무조건 강아지!',
    },
    {
      profileImage: 'http://devcap.duckdns.org:57043/images/Z3P15Dj.png',
      posterUuid: '0000000000000000000000000003',
      posterId: '무서운 스컹크',
      selectNum: 1,
      content: '무조건 강아지!',
    },
    {
      profileImage: 'http://devcap.duckdns.org:57043/images/Z3P15Dj.png',
      posterUuid: '0000000000000000000000000003',
      posterId: '무서운 스컹크',
      selectNum: 2,
      content: '으갸갸갸갸갸갸갸갸ㅑ갸갸갸갸ㅑㅑㅑㅑㅑㅑㅑㅑ',
    },
    {
      profileImage: 'http://devcap.duckdns.org:57043/images/Z3P15Dj.png',
      posterUuid: '0000000000000000000000000003',
      posterId: '무서운 스컹크',
      selectNum: 2,
      content: '으갸갸갸갸갸갸갸갸ㅑ갸갸갸갸ㅑㅑㅑㅑㅑㅑㅑㅑ',
    },
  ],
};

export default ChattingFeed;
