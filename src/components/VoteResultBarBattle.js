import React, {useEffect, useRef, useState} from 'react';
import {Animated, View, StyleSheet, Text} from 'react-native';
import {type_font} from './Constants';

function VoteResultBarBattle({select}) {
  const [percentA, setPercentA] = useState(40);
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

  /*useEffect(() => {
    if (isVoted) {
      setting();
    }
  }, [isVoted]);
*/
  useEffect(() => {
    load();
  }, [percentA]);

  return (
    <View style={styles.block}>
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
        <Text style={[styles.numText, {color: colors.B}]}>{percentA}%</Text>
        <Text style={[styles.AText, {backgroundColor: colors.B}]}>B</Text>
      </View>
      <View style={styles.bar}>
        <Animated.View
          style={[styles.Abar, {width}, percentA > 99 && {borderRadius: 20}]}
        />
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
  },
  Abar: {
    height: 14,
    backgroundColor: colors.A,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default VoteResultBarBattle;
