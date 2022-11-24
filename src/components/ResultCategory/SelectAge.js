import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import RangeSlider from '../RangeSlider/RangeSlider';
import {type_color, type_font, url} from '../Constants';
import {useRecoilState} from 'recoil';
import {highState, lowState} from '../Atoms';

function SelectAge({type, postId, setInitresult}) {
  const [low, setLow] = useRecoilState(lowState);
  const [high, setHigh] = useRecoilState(highState);

  const onPressApply = () => {
    fetch(url.ageResult + postId + '/' + low + '/' + high)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setInitresult(json);
      });
  };

  const onPressBack = () => {
    setInitresult(null);
    setLow(1);
    setHigh(49);
  };

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
          style={[styles.backButton]}
          onPress={() => onPressBack()}>
          <Text style={[styles.backText]}>되돌리기</Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <TouchableOpacity
          style={[styles.okButton, {borderColor: type_color[type]}]}
          onPress={() => onPressApply()}>
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  backText: {
    fontSize: 13,
    fontFamily: type_font.ggodic80,
  },
  backButton: {
    width: 60,
    borderRadius: 10,
    borderWidth: 1.3,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    marginHorizontal: 4,
    color: type_color.disablePressableButton,
    borderColor: type_color.disablePressableButton,
  },
});

export default SelectAge;
