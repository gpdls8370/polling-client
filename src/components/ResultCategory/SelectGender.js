import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {selection, type_color, type_font, url} from '../Constants';
import {useRecoilState} from 'recoil';
import {isMaleState} from '../Atoms';

function SelectGender({type, postId, setInitresult}) {
  const [isMale, setMale] = useRecoilState(isMaleState);

  const onPressApply = () => {
    fetch(url.genderResult + postId + '/' + isMale)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setInitresult(json);
      });
  };

  const onPressBack = () => {
    setInitresult(null);
    setMale(null);
  };

  return (
    <View>
      <View style={styles.block}>
        <TouchableOpacity
          style={[
            styles.button,
            isMale != null && isMale ? {backgroundColor: '#7F8CFF'} : null,
          ]}
          onPress={() => {
            setMale(true);
          }}>
          <Text style={styles.text}>남자</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            isMale != null && !isMale ? {backgroundColor: '#FF8FAA'} : null,
          ]}
          onPress={() => {
            setMale(false);
          }}>
          <Text style={styles.text}>여자</Text>
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
  },
  button: {
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 20,
    backgroundColor: type_color.disablePressableButton,
  },
  text: {
    fontSize: 20,
    fontFamily: type_font.ggodic60,
    color: 'white',
  },
  okBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 20,
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
    color: type_color.disablePressableButton,
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
    borderColor: type_color.disablePressableButton,
  },
});

export default SelectGender;
