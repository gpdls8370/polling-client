import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {
  navigation_id,
  post_type,
  type_color,
  type_font,
  type_id,
} from './Constants';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import PollingPostBlock from './PollingPostBlock';

function PollingPost({
  navigation,
  contentType,
  time,
  count,
  storyText,
  selectText,
  likes,
  comments,
}) {
  const [isLiked, setLiked] = useState(false);

  const onPressLike = () => {
    setLiked(!isLiked);
  };

  return (
    <View style={styles.block}>
      <PollingPostBlock
        contentType={contentType}
        time={time}
        count={count}
        storyText={[storyText]}
        selectText={selectText}
      />
      <View style={styles.response}>
        <TouchableOpacity onPress={() => onPressLike()}>
          {!isLiked ? (
            <Icon2 name="heart-outline" color="black" size={26} />
          ) : (
            <Icon2 name="heart" color="black" size={26} />
          )}
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(navigation_id.pollingResult, {
              contentType: contentType,
              time: time,
              count: count,
              storyText: storyText,
              selectText: selectText,
            })
          }>
          <Icon
            name="chart"
            color="black"
            size={35}
            style={{paddingRight: 1, opacity: 0.8}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
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
    marginTop: 15,
    paddingVertical: 15,
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
