import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {
  avatarExample,
  navigation_id,
  type_color,
  type_font,
  type_id,
  url,
} from './Constants';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';
import VoteItemBattle from './VoteItemBattle';
import VoteResultBarBattle from './VoteResultBarBattle';
import {showToast, toastType} from './ToastManager';
import {battleRefresh} from './Atoms';

function BattlePostBlock({
  navigation,
  postId,
  timeLeft,
  userCount,
  textA,
  textB,
  percentA,
}) {
  const [isVoted, setVoted] = useState(false);
  const [select, setSelect] = useState();
  const [uuid] = useRecoilState(uuidState);
  const [refresh, setRefresh] = useRecoilState(battleRefresh);

  const onPressVote = (sid, select) => {
    console.log('서버 요청보냄 GetResult');
    setRefresh(!refresh);

    if (uuid == null) {
      showToast(toastType.error, '투표 참여는 로그인 후 가능합니다.');
    } else {
      setVoted(true);
      setSelect(select);
      //userCount++;
      votePost(sid);
    }
  };
  const votePost = sid => {
    console.log(url.voteSelect);
    console.log(uuid, postId, sid);
    return fetch(url.voteSelect, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UUID: uuid,
        poll_id: postId,
        sid: sid,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  var timeText;
  timeLeft >= 1440
    ? (timeText =
        Math.floor(timeLeft / 1440) +
        '일 ' +
        (timeLeft - Math.floor(timeLeft / 1440)) +
        '시간')
    : timeLeft >= 60
    ? (timeText =
        Math.floor(timeLeft / 60) +
        '시간 ' +
        (timeLeft - Math.floor(timeLeft / 60)) +
        '분')
    : (timeText = timeLeft + '분');

  var availText;
  if (timeLeft > 0) {
    availText = '진행중';
  } else {
    availText = '종료됨';
  }

  return (
    <View>
      <View style={styles.dataBlock}>
        <Text style={[styles.dataText, {backgroundColor: type_color.battle}]}>
          {availText}
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.timeText}>배틀 종료까지 </Text>
        <Text style={[styles.timeText, {color: 'red'}]}>{timeText}</Text>
        <Text style={styles.timeText}> 남았습니다</Text>
      </View>
      <VoteResultBarBattle
        postId={postId}
        select={select}
        percentA={percentA}
      />
      <View style={{marginVertical: 15}}>
        <VoteItemBattle
          textA={textA}
          textB={textB}
          onPressVote={onPressVote}
          select={select}
          postId={postId}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.countText}>지금까지 </Text>
        <Text style={[styles.countText, {color: 'red'}]}>{userCount}명</Text>
        <Text style={styles.countText}>이 참여했습니다</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dataBlock: {
    marginLeft: 15,
    flexDirection: 'row',
  },
  dataText: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    paddingTop: 3,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 13,
    fontFamily: type_font.ggodic80,
    color: 'white',
  },
  timeText: {
    fontSize: 19,
    fontFamily: type_font.cafe24,
    color: 'black',
    marginVertical: 5,
  },
  countText: {
    fontSize: 15,
    fontFamily: type_font.ggodic60,
    color: 'black',
  },
});

export default BattlePostBlock;
