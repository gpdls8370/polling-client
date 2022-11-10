import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {type_color, type_font} from './Constants';
import BattlePostBlock from './BattlePostBlock';

function BattlePost({
  navigation,
  postId, //'bid_5'
  //posterId, //'빛나는 참새'
  timeLeft,
  userCount,
  selection, //["selectionId' : 'sid_13' "text" : '옵션1'
  isAvailable = true,
}) {
  return (
    <>
      <View style={styles.block}>
        <BattlePostBlock
          navigation={navigation}
          postId={postId}
          timeLeft={timeLeft}
          userCount={userCount}
          selection={selection}
          isAvailable={isAvailable}
        />
      </View>
      <View style={{height: 500}} />
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    marginTop: 15,
    paddingTop: 3,
    paddingBottom: 20,
    marginBottom: 20,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
});

export default BattlePost;
