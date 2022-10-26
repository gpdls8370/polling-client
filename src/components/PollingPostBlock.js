import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {type_color, type_font, type_id, url} from './Constants';
import VoteItem from './VoteItem';
import VoteItemResult from './VoteItemResult';

function PollingPostBlock({
  postId,
  postType,
  timeBefore,
  userCount,
  storyText,
  selection, //'selectionId', 'text'
  voteActive = true,
}) {
  const [isVoted, setVoted] = useState(false);

  const onPressVote = () => {
    console.log('서버 요청보냄 GetResult');
    setVoted(!isVoted);
  };

  var text;
  timeBefore < 60
    ? (text = timeBefore + '분 전')
    : (text = Math.floor(timeBefore / 60) + '시간 전');

  return (
    <>
      <View style={styles.dataBlock}>
        <Text
          style={[
            styles.dataText,
            {backgroundColor: type_color[type_id[postType]]},
          ]}>
          {text}
        </Text>
        <Text
          style={[
            styles.dataText,
            {backgroundColor: type_color[type_id[postType]]},
          ]}>
          {userCount}명 투표
        </Text>
      </View>
      <Text style={styles.storyText}>{storyText}</Text>
      <View style={styles.list}>
        <FlatList
          data={selection}
          renderItem={({item}) =>
            voteActive ? (
              <VoteItem
                isVoted={isVoted}
                postId={postId}
                selectionId={item.selectionId}
                type={postType}
                text={item.text}
                onPressVote={onPressVote}
              />
            ) : (
              <VoteItemResult
                postId={postId}
                selectionId={item.selectionId}
                text={item.text}
              />
            )
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dataBlock: {
    flexDirection: 'row',
  },
  dataText: {
    paddingHorizontal: 7,
    paddingVertical: 1,
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
});

export default PollingPostBlock;
