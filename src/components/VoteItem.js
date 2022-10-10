import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {type_color, type_font} from './Constants';

//투표 참여 기능 여기에 추가할 예정
function VoteItem({text}) {
  return (
    <View style={styles.block}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    padding: 5,
    marginVertical: 3,
    borderWidth: 0.9,
    borderColor: type_color.gray,
    opacity: 0.8,
    borderRadius: 10,
  },
  text: {
    fontSize: 15,
    fontFamily: type_font.appleM,
    color: 'black',
  },
});

export default VoteItem;
