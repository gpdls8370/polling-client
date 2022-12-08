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
  onPressVote,
  image,
  resultVer = false,
  percent = null,
  selected = null,
  linkVer = false,
  showImage = true,
}) {
  const loaderValue = useRef(new Animated.Value(0)).current;

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
    load();
    console.log(percent);
  }, [percent]);

  return (
    <TouchableOpacity
      disabled={resultVer}
      style={[
        styles.block,
        {width: Dimensions.get('window').width / 2.33},
        showImage && image != null && {height: 150},
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
          linkVer == true && {width: Dimensions.get('window').width / 2.75},
          percent > 90 && {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          selected == selectionId &&
            !resultVer && {
              backgroundColor: type_color[type_id.balance],
              opacity: 0.5,
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
        {showImage && image != null && (
          <Image source={{uri: image}} style={styles.image} />
        )}
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
