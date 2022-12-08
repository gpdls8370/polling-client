import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {type_font} from './Constants';

function ChattingPost({avatarFile, selectNum, posterId, content}) {
  return (
    <View style={selectNum == 2 && {alignItems: 'flex-end'}}>
      <View style={[styles.topBlock]}>
        {selectNum == 1 ? (
          <Image
            source={{uri: avatarFile}}
            resizeMode="cover"
            style={styles.avatar}
          />
        ) : (
          <Text style={styles.nameText}>{posterId}</Text>
        )}
        {selectNum == 1 ? (
          <Text style={styles.nameText}>{posterId}</Text>
        ) : (
          <Image
            source={{uri: avatarFile}}
            resizeMode="cover"
            style={styles.avatar}
          />
        )}
      </View>
      <View style={styles.botBlock}>
        <Text
          style={[styles.contentText, {backgroundColor: colors[selectNum]}]}>
          {content}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  block: {},
  topBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  botBlock: {
    marginHorizontal: 30,
    marginVertical: 5,
    flexDirection: 'row',
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 45,
  },
  nameText: {
    marginHorizontal: 5,
    marginTop: 5,
    fontSize: 11,
    fontFamily: type_font.ggodic40,
    color: 'black',
  },
  contentText: {
    fontSize: 15,
    fontFamily: type_font.ggodic60,
    color: 'black',
    borderRadius: 15,
    padding: 11,
    paddingVertical: 8,
  },
});

const colors = {
  1: '#BFC5FF',
  2: '#FFA3A3',
};

export default ChattingPost;
