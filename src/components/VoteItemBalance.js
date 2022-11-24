import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {type_color, type_font, type_id, url} from './Constants';

function VoteItemBalance({
  text,
  postId,
  selectionId,
  isVoted,
  onPressVote,
  image = null,
  resultVer = false,
  initPercent = null,
  linkVer = false,
}) {
  const [isSelected, setSelected] = useState(false);
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
    if (isVoted) {
      setting();
    }
  }, [isVoted]);

  useEffect(() => {
    load();
  }, [percent]);

  if (resultVer == true) {
    isVoted = true;
  }

  useEffect(() => {
    if (initPercent != null) {
      setPercent(initPercent);
    } else {
      setting();
      load();
    }
  }, [initPercent]);

  return (
    <View
      style={[
        styles.block,
        image != null && {height: 150},
        linkVer == true && {width: 145, height: 90},
      ]}>
      {!resultVer && !isVoted ? (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => [setSelected(true), onPressVote(selectionId)]}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Animated.View
            style={[
              {
                backgroundColor: type_color.lightGray,
                width: 170,
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
              isSelected &&
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
            }}>
            {image != null && (
              <Image source={{uri: image}} style={styles.image} />
            )}
            <Text style={styles.text}>{text}</Text>
            <Text
              style={[styles.text, {fontStyle: 'italic', marginVertical: -2}]}>
              {percent}%
            </Text>
          </View>
        </>
      )}
    </View>
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
    width: 170,
    flexDirection: 'row',
  },

  text: {
    margin: 5,
    fontSize: 13,
    fontFamily: type_font.appleL,
    color: 'black',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 5,
    borderRadius: 64,
  },
});

export default VoteItemBalance;
