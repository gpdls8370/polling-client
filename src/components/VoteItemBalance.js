import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {type_color, type_font, type_id, url} from './Constants';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';

function VoteItemBalance({
  text,
  postId,
  selectionId,
  isVoted,
  onPressVote,
  image,
  resultVer = false,
  initPercent = null,
  selected = null,
  linkVer = false,
}) {
  const [percent, setPercent] = useState(0);
  const loaderValue = useRef(new Animated.Value(0)).current;

  const setting = () => {
    fetch(url.resultLoad + postId)
      .then(res => res.json())
      .then(json => {
        const result = json.selectionResult;
        const index = result.findIndex(v => v.selectionId === selectionId);
        setPercent(Math.floor(result[index]?.percent));
      });
  };

  const load = () => {
    Animated.timing(loaderValue, {
      toValue: percent,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const height = loaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    //참여를 한 투표
    if (selected != null) {
      setting();
    } else {
      setPercent(null);
    }
  }, [selected]);

  useEffect(() => {
    if (resultVer) {
      //투표 결과 분석
      if (initPercent != null) {
        setPercent(initPercent);
      } else {
        setting();
      }
    }
  }, [initPercent]);

  useEffect(() => {
    load();
  }, [percent]);

  return (
    <TouchableOpacity
      style={[
        styles.block,
        {width: Dimensions.get('window').width / 2.33},
        image != null && {height: 150},
        linkVer == true && {
          width: Dimensions.get('window').width / 2.75,
          height: 90,
        },
      ]}
      onPress={() => onPressVote(selectionId)}>
      <Animated.View
        style={[
          {
            backgroundColor: type_color.lightGray,
            width: Dimensions.get('window').width / 2.33,
            height,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            opacity: 0.6,
            alignSelf: 'flex-end',
          },
          linkVer == true && {width: 145},
          percent > 90 && {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          selected == selectionId &&
            !resultVer && {
              backgroundColor: type_color[type_id.balance],
              opacity: 0.5,
            },
          initPercent != null && {
            backgroundColor: type_color[type_id[type_id.balance]],
            opacity: 0.6,
          },
        ]}
      />
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          width: Dimensions.get('window').width / 2.75,
        }}>
        {image != null && <Image source={{uri: image}} style={styles.image} />}
        <Text style={styles.text}>{text}</Text>
        {percent != null && (
          <Text
            style={[styles.text, {fontStyle: 'italic', marginVertical: -2}]}>
            {percent}%
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  block: {
    marginVertical: 3,
    marginHorizontal: 5,
    backgroundColor: type_color.lightBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
  },

  text: {
    margin: 5,
    fontSize: 13,
    fontFamily: type_font.appleL,
    color: 'black',
    textAlign: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 5,
    borderRadius: 64,
  },
});

export default VoteItemBalance;
