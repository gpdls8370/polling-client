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
  type,
  isVoted,
  onPressVote,
  image = null,
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

  return (
    <>
      {!isVoted ? (
        <View style={styles.block}>
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
        </View>
      ) : (
        <View style={styles.block}>
          {image != null ? <Image source={image} style={styles.image} /> : null}
          <Animated.View
            style={[
              {
                backgroundColor: type_color.disablePressableButton,
                width: 170,
                height,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                opacity: 0.6,
                alignSelf: 'flex-end',
              },
              percent > 90 && {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              },
              isSelected && {
                backgroundColor: type_color[type_id[type]],
                opacity: 0.5,
              },
            ]}
          />
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.text}>{text}</Text>
            <Text
              style={[styles.text, {fontStyle: 'italic', marginVertical: -2}]}>
              {percent}%
            </Text>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    marginVertical: 3,
    marginHorizontal: 5,
    backgroundColor: '#F3F3F3',
    //opacity: 0.8,
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
    width: 90,
    height: 90,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 5,
  },
});

export default VoteItemBalance;
