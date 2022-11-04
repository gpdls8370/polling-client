import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {type_color, type_font, url} from './Constants';
import {useRecoilState} from 'recoil';
import {isMaleState} from './Atoms';

function VoteItemResult({text, postId, selectionId, image = null}) {
  const [percent, setPercent] = useState(0);
  const [isMale, setIsMale] = useRecoilState(isMaleState);
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
  const maleSetting = () => {
    fetch(url.genderResult + postId + '/' + isMale)
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
    setting();
  });

  useEffect(() => {
    load();
  }, [percent]);

  var color = type_color.disablePressableButton;

  return (
    <View style={styles.block}>
      {image != null ? <Image source={image} style={styles.image} /> : null}
      <Text style={[styles.text, {position: 'absolute'}]}>{text}</Text>
      <Animated.View
        style={{
          backgroundColor: color,
          width,
          opacity: 0.6,
          borderWidth: 0,
          borderRadius: 10,
        }}
      />
      <Text style={[styles.text, {position: 'absolute'}]}>{text}</Text>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Text style={[styles.text, {position: 'absolute', paddingRight: 5}]}>
          {percent}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginVertical: 3,
    borderWidth: 0.9,
    borderColor: type_color.gray,
    opacity: 0.8,
    height: 31,
    borderRadius: 10,
    flexDirection: 'row',
  },
  text: {
    margin: 5,
    fontSize: 15,
    fontFamily: type_font.appleL,
    color: 'black',
  },
  image: {
    width: 30,
    height: 30,
    marginVertical: 2,
    marginHorizontal: 2,
  },
});

export default VoteItemResult;
