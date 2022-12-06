import React, {useState} from 'react';
import {
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {navigation_id, type_color, type_font, url} from './Constants';
import Icon from 'react-native-vector-icons/EvilIcons';
import BalancePostBlock from './BalancePostBlock';
import {showToast, toastType} from './ToastManager';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';

function BalancePost({
  navigation,
  postId, //'bid_5'
  postType, //'balance'..
  posterId, //'빛나는 참새'
  posterImage,
  timeBefore,
  userCount,
  storyText, //'내용'
  likes,
  comments,
  selection, //["selectionId' : 'sid_13' "text" : '옵션1'
}) {
  const [isLiked, setLiked] = useState(false);
  const [uuid] = useRecoilState(uuidState);

  const onPressLike = () => {
    setLiked(!isLiked);
  };

  const onPressShare = postId => {
    fetch(url.dynamicLink + '/' + postId)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(function (data) {
        console.log(data);

        let result;

        Alert.alert(
          '공유',
          '밸런스 공유하기',
          [
            {
              text: '링크만 공유',
              onPress: async () => {
                result = Share.share({
                  message: data.link,
                });
              },
            },
            {
              text: '텍스트와 함께 공유',
              onPress: async () => {
                result = Share.share({
                  message:
                    data.socialTitle +
                    '\n' +
                    data.socialDescription +
                    '\n' +
                    data.link,
                });
              },
            },
          ],
          {cancelable: true},
        );

        try {
          return result;
        } catch (error) {
          throw new Error('error.message');
        }
      })
      .then(function (result) {
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      })
      .catch(function (error) {
        //showNetworkError(error.message);
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  return (
    <View style={styles.block}>
      <BalancePostBlock
        postId={postId}
        posterId={posterId}
        postType={postType}
        posterImage={posterImage}
        timeBefore={timeBefore}
        userCount={userCount}
        storyText={[storyText]}
        selection={selection}
      />
      <View style={styles.response}>
        <TouchableOpacity
          onPress={() => {
            if (uuid == null) {
              showToast(toastType.error, '로그인이 필요합니다.');
            } else {
              onPressLike();
            }
          }}>
          {!isLiked ? (
            <View style={styles.worryButton}>
              <Text style={styles.worryText}>😮고민돼요</Text>
            </View>
          ) : (
            <View style={styles.worrySelectedButton}>
              <Text style={[styles.worryText, {color: 'white'}]}>
                😮고민돼요
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <TouchableOpacity onPress={() => onPressShare(postId)}>
          <Icon
            name="share-google"
            color="black"
            size={35}
            style={{paddingRight: 1, opacity: 0.8}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (uuid == null) {
              showToast(toastType.error, '로그인이 필요합니다.');
            } else {
              navigation.navigate(navigation_id.balanceResult, {
                postType: postType,
                posterId: posterId,
                postId: postId,
                timeBefore: timeBefore,
                userCount: userCount,
                storyText: storyText,
                selection: selection,
              });
            }
          }}>
          <Icon
            name="chart"
            color="black"
            size={35}
            style={{paddingRight: 1, opacity: 0.8}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (uuid == null) {
              showToast(toastType.error, '로그인이 필요합니다.');
            } else {
              navigation.navigate(navigation_id.comment, {
                postType: postType,
                posterId: posterId,
                postId: postId,
                timeBefore: timeBefore,
                userCount: userCount,
                storyText: storyText,
                selection: selection,
              });
            }
          }}>
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
    marginBottom: 15,
    paddingTop: 7,
    paddingBottom: 15,
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
  worryText: {
    fontSize: 12,
    fontFamily: type_font.roundR,
    color: '#585858',
  },
  worryButton: {
    backgroundColor: '#F3F3F3',
    borderWidth: 0.5,
    borderColor: '#DCDCDC',
    borderRadius: 20,
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  worrySelectedButton: {
    backgroundColor: type_color.balance,
    borderRadius: 20,
    paddingTop: 5,
    paddingHorizontal: 5,
  },
});

export default BalancePost;
