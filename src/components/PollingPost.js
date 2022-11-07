import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {navigation_id, type_color, type_font} from './Constants';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import PollingPostBlock from './PollingPostBlock';

function PollingPost({
  navigation,
  postId, //'pid_5'
  postType, //'polling'..
  posterId, //'빛나는 참새'
  timeBefore,
  userCount,
  storyText, //'내용'
  likes,
  comments,
  selection, //["selectionId' : 'sid_13' "text" : '옵션1'
}) {
  const [isLiked, setLiked] = useState(false);

  const onPressLike = () => {
    setLiked(!isLiked);
  };

  return (
    <View style={styles.block}>
      <PollingPostBlock
        navigation={navigation}
        postId={postId}
        postType={postType}
        timeBefore={timeBefore}
        userCount={userCount}
        storyText={[storyText]}
        selection={selection}
      />
      <View style={styles.response}>
        <TouchableOpacity onPress={() => onPressLike()}>
          {!isLiked ? (
            <Icon2 name="heart-outline" color={type_color.gray} size={26} />
          ) : (
            <Icon2 name="heart" color={type_color.polling} size={26} />
          )}
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(navigation_id.pollingResult, {
              postType: postType,
              postId: postId,
              timeBefore: timeBefore,
              userCount: userCount,
              storyText: storyText,
              selection: selection,
            })
          }>
          <Icon
            name="chart"
            color="black"
            size={35}
            style={{paddingRight: 1, opacity: 0.8}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(navigation_id.comment, {
              postType: postType,
              postId: postId,
              timeBefore: timeBefore,
              userCount: userCount,
              storyText: storyText,
              selection: selection,
            })
          }>
          <Icon name="comment" color="black" size={30} />
        </TouchableOpacity>
        <Text style={styles.commentText}>{comments}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginHorizontal: 10,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: type_color.gray,
    borderRadius: 10,
  },
  response: {
    flexDirection: 'row',
    marginHorizontal: 3,
    marginRight: 5,
  },
  commentText: {
    marginTop: 7,
    fontSize: 14,
    fontFamily: type_font.appleB,
    color: 'black',
  },
});

export default PollingPost;
