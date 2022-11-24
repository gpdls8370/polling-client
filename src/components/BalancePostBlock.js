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
import VoteItemBalance from './VoteItemBalance';
import Profile from './Profile';
import {showToast, toastType} from './ToastManager';

function BalancePostBlock({
  postId,
  posterId,
  postType = 'balance',
  timeBefore,
  userCount,
  storyText,
  selection, //'selectionId', 'text'
  voteActive = true,
  initResult = null,
  linkVer = false,
}) {
  const [isVoted, setVoted] = useState(false);
  const [uuid] = useRecoilState(uuidState);

  const onPressVote = sid => {
    console.log('서버 요청보냄 GetResult');

    if (uuid == null) {
      showToast(toastType.error, '투표 참여는 로그인 후 가능합니다.');
    } else if (!isVoted) {
      setVoted(true);
      userCount++;
      votePost(sid);
    }
  };
  const votePost = sid => {
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

  function getPercent(initResult, selectionId) {
    const result = initResult.selectionResult;
    const index = result.findIndex(v => v.selectionId === selectionId);
    if (index == -1) {
      return 0;
    } else {
      return Math.floor(result[index]?.percent);
    }
  }

  var text;
  timeBefore >= 1440
    ? (text = Math.floor(timeBefore / 1440) + '일 전')
    : timeBefore >= 60
    ? (text = Math.floor(timeBefore / 60) + '시간 전')
    : (text = timeBefore + '분 전');

  return (
    <>
      {linkVer == false && (
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
            <View style={{flex: 1}} />
            <Profile avatarFile={avatarExample.avatar1} name={posterId} />
          </View>
        </>
      )}
      {linkVer == false ? (
        <View style={{alignItems: 'center'}}>
          <Text style={styles.storyText}>Q. {storyText}</Text>
        </View>
      ) : (
        <View>
          <Text style={[styles.storyText, {fontFamily: type_font.appleM}]}>
            {storyText}
          </Text>
        </View>
      )}

      <View style={styles.list}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          data={selection}
          renderItem={({item}) =>
            voteActive ? (
              <VoteItemBalance
                isVoted={isVoted}
                postId={postId}
                selectionId={item.selectionId}
                text={item.text}
                onPressVote={onPressVote}
                image={item.image}
                linkVer={linkVer}
              />
            ) : initResult == null ? (
              <VoteItemBalance
                isVoted={isVoted}
                postId={postId}
                type={postType}
                selectionId={item.selectionId}
                text={item.text}
                image={item.image}
                resultVer={true}
                initPercent={null}
              />
            ) : (
              <VoteItemBalance
                isVoted={isVoted}
                postId={postId}
                type={postType}
                selectionId={item.selectionId}
                text={item.text}
                image={item.image}
                resultVer={true}
                initPercent={getPercent(initResult, item.selectionId)}
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
    height: 16,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 12,
    fontSize: 10,
    fontFamily: type_font.appleB,
    color: 'white',
  },
  storyText: {
    marginHorizontal: 3,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: type_font.appleM,
    fontSize: 14,
    color: 'black',
  },
  list: {
    alignItems: 'center',
    marginBottom: 17,
    marginLeft: -5,
  },
});

export default BalancePostBlock;
