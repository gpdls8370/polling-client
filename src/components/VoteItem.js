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
  resultVer = false,
  initPercent = null,
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
    <View style={[styles.block, image != null && {height: 92}]}>
      {!resultVer && !isVoted ? (
        <TouchableOpacity
          style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
          onPress={() => [setSelected(true), onPressVote(selectionId)]}>
          {image != null ? (
            <Image source={image} style={[styles.image, {marginRight: 5}]} />
          ) : null}
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <>
          {image != null && <Image source={image} style={styles.image} />}
          <View
            style={
              (image != null && {height: 92}, {flex: 1, flexDirection: 'row'})
            }>
            <Animated.View
              style={[
                {
                  backgroundColor: type_color.lightGray,
                  opacity: 0.6,
                  width,
                  borderWidth: 0,
                  borderRadius: 10,
                },
                image != null && {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
                !resultVer &&
                  isSelected && {
                    backgroundColor: type_color[type_id[type]],
                    opacity: 0.6,
                  },
                initPercent != null && {
                  backgroundColor: type_color[type_id[type]],
                  opacity: 0.6,
                },
              ]}
            />
            <Text
              style={[
                styles.text,
                {paddingLeft: 2, position: 'absolute', alignSelf: 'center'},
              ]}>
              {text}
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Text
                style={[styles.text, {position: 'absolute', paddingRight: 8}]}>
                {percent}%
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginVertical: 3,
    //borderWidth: 0.9,
    //borderColor: type_color.gray,
    backgroundColor: type_color.lightBackground,
    //opacity: 0.8,
    height: 31,
    borderRadius: 10,
    flexDirection: 'row',
  },
  text: {
    margin: 5,
    fontSize: 14,
    fontFamily: type_font.appleL,
    color: 'black',
  },
  image: {
    width: 90,
    height: 92,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default VoteItem;
