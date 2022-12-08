import React, {useEffect, useRef, useState} from 'react';
import {Animated, View, StyleSheet, Text} from 'react-native';
import {type_color, type_font, url} from './Constants';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function VoteResultBarBattle({select, percentA, isEnd}) {
  const loaderValue = useRef(new Animated.Value(0)).current;

  const load = () => {
    Animated.timing(loaderValue, {
      toValue: percentA,
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
    load();
  }, [percentA]);

  return (
    <View style={styles.block}>
      {percentA != 50 && isEnd && (
        <Icon
          name={'crown'}
          color={'gold'}
          size={35}
          style={[
            {
              marginVertical: -12,
              marginHorizontal: 3,
            },
            percentA < 50 && {alignSelf: 'flex-end'},
          ]}
        />
      )}
      <View style={styles.percentBlock}>
        <Text style={styles.AText}>A</Text>
        <Text style={styles.numText}>{percentA}%</Text>
        {select == 'A' && <Text style={styles.selectMark}>선택</Text>}
        <View style={{flex: 1}} />
        {select == 'B' && (
          <Text style={[styles.selectMark, {backgroundColor: colors.B}]}>
            선택
          </Text>
        )}
        <Text style={[styles.numText, {color: colors.B}]}>
          {100 - percentA}%
        </Text>
        <Text style={[styles.AText, {backgroundColor: colors.B}]}>B</Text>
      </View>
      <View style={styles.bar}>
        <Animated.View
          style={[
            styles.Abar,
            {width, alignItems: 'flex-end'},
            percentA > 99 && {borderRadius: 20},
          ]}
        />
        {!isEnd && (
          <LottieView
            style={{
              width: 80,
              height: 80,
              marginVertical: -18,
              marginLeft: -20,
            }}
            speed={0.5}
            colorFilters={[
              {keypath: 'Shape Layer 1000 x 1000', color: '#FCDC36'},
            ]}
            source={require('../../assets/animations/spark.json')}
            autoPlay
            loop
          />
        )}
      </View>
    </View>
  );
}

const colors = {
  A: '#6373FF',
  B: '#FF3300',
};

const styles = StyleSheet.create({
  block: {
    marginVertical: 5,
  },
  percentBlock: {
    marginHorizontal: 10,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectMark: {
    marginHorizontal: 3,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: colors.A,
    fontSize: 14,
    fontFamily: type_font.ggodic80,
    color: 'white',
  },
  AText: {
    paddingHorizontal: 5.5,
    paddingVertical: 2,
    borderRadius: 45,
    backgroundColor: colors.A,
    fontSize: 16,
    fontFamily: type_font.cafe24,
    color: 'white',
  },
  numText: {
    fontSize: 18,
    fontFamily: type_font.ggodic80,
    color: colors.A,
    marginHorizontal: 7,
  },
  bar: {
    height: 14,
    backgroundColor: colors.B,
    borderRadius: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  Abar: {
    height: 14,
    backgroundColor: colors.A,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default VoteResultBarBattle;
