import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {type_color, type_font, type_id} from './Constants';
import VoteItem from './VoteItem';
import VoteItemResult from './VoteItemResult';

function PollingPostBlock({
  contentType,
  time,
  count,
  storyText,
  selectText,
  voteActive = true,
}) {
  const [isVoted, setVoted] = useState(false);

  const onPressVote = () => {
    setVoted(!isVoted);
  };

  return (
    <>
      <View style={styles.dataBlock}>
        <Text
          style={[
            styles.dataText,
            {backgroundColor: type_color[type_id[contentType]]},
          ]}>
          {time}분 전
        </Text>
        <Text
          style={[
            styles.dataText,
            {backgroundColor: type_color[type_id[contentType]]},
          ]}>
          {count}명 투표
        </Text>
      </View>
      <Text style={styles.storyText}>{storyText}</Text>
      <View style={styles.list}>
        <FlatList
          data={selectText}
          renderItem={({item}) =>
            voteActive ? (
              <VoteItem
                isVoted={isVoted}
                type={contentType}
                text={item.text}
                percent={item.percent}
                onPressVote={onPressVote}
              />
            ) : (
              <VoteItemResult text={item.text} percent={item.percent} />
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
