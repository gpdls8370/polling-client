import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ChattingPost from './ChattingPost';
import {type_color, type_font} from './Constants';

function ChattingFeed({chats}) {
  return (
    <View style={styles.block}>
      {chats.length == 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.alertText}>대화를 시작해보세요!</Text>
        </View>
      ) : (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, paddingTop: 10},
  alertText: {
    fontSize: 20,
    fontFamily: type_font.ggodic80,
    color: type_color.disablePressableButton,
  },
});

export default ChattingFeed;
