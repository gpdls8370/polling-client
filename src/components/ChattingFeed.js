import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ChattingPost from './ChattingPost';

function ChattingFeed({chats}) {
  return (
    <View style={styles.block}>
      <FlatList
        data={chats}
        scrollEnabled={true}
        inverted
        renderItem={({item}) => (
          <ChattingPost
            avatarFile={item.profileImage}
            selectNum={item.selectNum}
            posterId={item.posterId}
            content={item.content}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {paddingTop: 10},
});

export default ChattingFeed;
