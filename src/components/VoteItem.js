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

function VoteItem({
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

  const width = loaderValue.interpolate({
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
    <View
      style={[
        styles.block,
        image != null ? {height: 90} : null,
        isVoted && !isSelected && {opacity: 0.6},
      ]}>
      {!isVoted ? (
        <TouchableOpacity
          style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
          onPress={() => [setSelected(true), onPressVote(selectionId)]}>
          {image != null ? <Image source={image} style={styles.image} /> : null}
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <>
          {image != null ? <Image source={image} style={styles.image} /> : null}
          <Animated.View
            style={[
              {
                backgroundColor: type_color.disablePressableButton,
                width,
                borderWidth: 0,
                opacity: 0.6,
                borderRadius: 10,
              },
              isSelected && {
                backgroundColor: type_color[type_id[type]],
                opacity: 0.8,
              },
            ]}
          />
          <Text style={[styles.text, {position: 'absolute'}]}>{text}</Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text
              style={[styles.text, {position: 'absolute', paddingRight: 5}]}>
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
    borderWidth: 0.9,
    borderColor: type_color.gray,
    //opacity: 0.8,
    height: 31,
    borderRadius: 10,
    flexDirection: 'row',
  },
  text: {
    margin: 5,
    fontSize: 15,
    fontFamily: type_font.appleM,
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

export default VoteItem;
