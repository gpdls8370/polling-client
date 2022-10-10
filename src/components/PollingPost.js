import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {type_color, type_font} from './Constants';
import VoteItem from './VoteItem';
import Icon from 'react-native-vector-icons/EvilIcons';

function PollingPost({time, count, storyText, selectText, likes, comments}) {
  return (
    <View style={styles.block}>
      <View style={styles.dataBlock}>
        <Text style={styles.dataText}>{time}분 전</Text>
        <Text style={styles.dataText}>{count}명 투표</Text>
      </View>
      <Text style={styles.storyText}>{storyText}</Text>
      <View style={styles.list}>
        <FlatList
          data={selectText}
          renderItem={({item}) => <VoteItem text={item.text} />}
        />
      </View>
      <View style={styles.response}>
        <TouchableOpacity>
          {/*onPress={() => navigation.navigate(navigation_id.makePoll)}>*/}
          <Icon name="heart" color="black" size={30} />
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <TouchableOpacity>
          {/*onPress={() => navigation.navigate(navigation_id.makePoll)}>*/}
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
  dataBlock: {
    flexDirection: 'row',
  },
  dataText: {
    paddingHorizontal: 7,
    paddingVertical: 1,
    backgroundColor: type_color.polling,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 12,
    fontSize: 10,
    fontFamily: type_font.appleB,
    color: 'white',
  },
  storyText: {
    marginHorizontal: 3,
    marginBottom: 10,
    fontFamily: type_font.appleL,
    fontSize: 14,
    color: 'black',
  },
  list: {
    marginBottom: 10,
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
