import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import RangeSlider from '../RangeSlider/RangeSlider';
import {type_color, type_font} from '../Constants';
import {useRecoilState} from 'recoil';
import {highState, lowState} from '../Atoms';

function SelectAge({type}) {
  const [low, setLow] = useRecoilState(lowState);
  const [high, setHigh] = useRecoilState(highState);

  return (
    <View>
      <View style={styles.block}>
        <Text style={styles.text}>
          분석 범위 : {low}세 ~ {high}세
        </Text>
      </View>
      <RangeSlider from={1} to={49} type={type} />
      <View style={styles.block}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setLow(10);
            setHigh(19);
          }}>
          <Text style={styles.text}>10대</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setLow(20);
            setHigh(29);
          }}>
          <Text style={styles.text}>20대</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setLow(30);
            setHigh(39);
          }}>
          <Text style={styles.text}>30대</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setLow(40);
            setHigh(49);
          }}>
          <Text style={styles.text}>40대</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.okBlock}>
        <TouchableOpacity
          style={[styles.okButton, {borderColor: type_color[type]}]}
          onPress={() => {
            //적용
          }}>
          <Text style={[styles.okText, {color: type_color[type]}]}>
            적용하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 17,
    fontFamily: type_font.ggodic40,
  },
  button: {
    borderRadius: 15,
    backgroundColor: type_color.lightGray,
    paddingHorizontal: 23,
    paddingVertical: 6,
    marginHorizontal: 4,
    marginVertical: 5,
  },
  okBlock: {
    alignItems: 'flex-end',
    marginVertical: 15,
  },
  okText: {
    fontSize: 15,
    fontFamily: type_font.ggodic80,
  },
  okButton: {
    width: 80,
    borderRadius: 10,
    borderWidth: 1.3,
    opacity: 0.8,
    alignItems: 'center',
    paddingVertical: 5,
    marginHorizontal: 4,
  },
});

export default SelectAge;
