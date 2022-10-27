import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {select_color, type_color, type_font} from './Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';

function CommentPost({avatarFile, selectNum, timeBefore, posterId, content}) {
  const [isUp, setUp] = useState(false);
  const [isDown, setDown] = useState(false);

  var text;
  timeBefore < 60
    ? (text = timeBefore + '분 전')
    : (text = Math.floor(timeBefore / 60) + '시간 전');

  return (
    <>
      <View style={styles.block}>
        <View style={styles.leftBlock}>
          <Image
            source={avatarFile}
            resizeMode="cover"
            style={[
              styles.avatar,
              {borderWidth: 2, borderColor: select_color[selectNum]},
            ]}
          />
          <View
            style={[
              styles.selectBox,
              {backgroundColor: select_color[selectNum]},
            ]}>
            <Text style={styles.selectText}>{selectNum}선택</Text>
          </View>
        </View>
        <View style={styles.rightBlock}>
          <View style={styles.nameBlock}>
            <Text
              style={{
                color: type_color.disablePressableButton,
                fontSize: 10,
                fontFamily: type_font.ggodic60,
                marginBottom: 4,
              }}>
              {text}
            </Text>
            <Text
              style={{
                color: select_color[selectNum],
                fontSize: 13,
                fontFamily: type_font.ggodic60,
              }}>
              {posterId}
            </Text>
          </View>
          <Text style={styles.contentText}>{content}</Text>
          <View style={styles.thumbsBlock}>
            <TouchableOpacity
              style={{paddingRight: 15}}
              onPress={() => {
                setUp(!isUp), setDown(false);
              }}>
              {!isUp ? (
                <Icon name="thumb-up-outline" size={20} />
              ) : (
                <Icon name="thumb-up" size={20} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDown(!isDown), setUp(false);
              }}>
              {!isDown ? (
                <Icon name="thumb-down-outline" size={20} />
              ) : (
                <Icon name="thumb-down" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{flex: 1, height: 1, backgroundColor: type_color.lightGray}}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    paddingVertical: 1,
    paddingHorizontal: 5,
  },
  leftBlock: {marginVertical: 25, marginHorizontal: 8},
  rightBlock: {
    marginVertical: 10,
    paddingHorizontal: 3,
  },
  nameBlock: {
    marginVertical: 2,
  },
  thumbsBlock: {
    flexDirection: 'row',
    marginTop: 2,
    marginHorizontal: 5,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 64,
    marginBottom: 5,
  },
  selectBox: {
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 3,
  },
  selectText: {
    fontSize: 13,
    fontFamily: type_font.ggodic60,
    color: 'white',
    marginHorizontal: 10,
  },
  contentText: {
    fontSize: 15,
    fontFamily: type_font.ggodic40,
    color: 'black',
    marginVertical: 12,
  },
});

export default CommentPost;
