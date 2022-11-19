import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {
  navigation_id,
  select_color,
  type_color,
  type_font,
  url,
} from './Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BalancePostBlock from './BalancePostBlock';

function CommentPost({
  navigation,
  avatarFile,
  selectNum,
  timeBefore,
  posterId,
  content,
  linkVoteId = null,
}) {
  const [json, setJson] = useState({});
  const [isUp, setUp] = useState(false);
  const [isDown, setDown] = useState(false);

  const GetData = () => {
    fetch(url.voteLoad + linkVoteId)
      .then(res => res.json())
      .then(json => {
        setJson(json);
        console.log(json);
      });
  };

  useEffect(() => {
    if (linkVoteId != null) {
      GetData();
    }
  }, [linkVoteId]); //갱신용

  if (selectNum < 0) {
    selectNum = 0;
  }

  var text;
  timeBefore >= 1440
    ? (text = Math.floor(timeBefore / 1440) + '일 전')
    : timeBefore >= 60
    ? (text = Math.floor(timeBefore / 60) + '시간 전')
    : (text = timeBefore + '분 전');
  return (
    <>
      <View style={styles.block}>
        <View style={styles.leftBlock}>
          <Image
            source={{uri: avatarFile}}
            resizeMode="cover"
            style={[styles.avatar, {borderColor: select_color[selectNum]}]}
          />
          <View
            style={[
              styles.selectBox,
              {backgroundColor: select_color[selectNum]},
            ]}>
            {selectNum == 0 ? (
              <Text style={styles.selectText}>미선택</Text>
            ) : (
              <Text style={styles.selectText}>{selectNum}선택</Text>
            )}
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

          {linkVoteId == null ? (
            <Text style={styles.contentText} numberOfLines={4}>
              {content}
            </Text>
          ) : (
            <BalancePostBlock
              postId={json.postId}
              posterId={json.posterId}
              timeBefore={json.timeBefore}
              userCount={json.userCount}
              storyText={json.storyText}
              selection={json.selection}
              linkVer={true}
            />
          )}

          <View style={styles.thumbsBlock}>
            <TouchableOpacity
              style={{marginRight: 15}}
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
              style={{marginRight: 15}}
              onPress={() => {
                setDown(!isDown), setUp(false);
              }}>
              {!isDown ? (
                <Icon name="thumb-down-outline" size={20} />
              ) : (
                <Icon name="thumb-down" size={20} />
              )}
            </TouchableOpacity>
            {linkVoteId != null && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigation_id.comment, {
                    postType: 'balance',
                    postId: json.postId,
                    timeBefore: json.timeBefore,
                    userCount: json.userCount,
                    storyText: json.storyText,
                    selection: json.selection,
                  })
                }>
                <Icon name="comment-text-outline" size={20} />
              </TouchableOpacity>
            )}
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
    marginRight: 10,
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
    borderWidth: 2,
    borderColor: 'black',
  },
  selectBox: {
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 3,
    backgroundColor: type_color.lightBackground,
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
