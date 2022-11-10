import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {type_color, type_font, url} from '../Constants';
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

  return (
    <View>
      <View style={styles.block}>
        <TouchableOpacity
          style={[styles.button, isMale ? {backgroundColor: '#7F8CFF'} : null]}
          onPress={() => {
            setMale(true);
          }}>
          <Text style={styles.text}>남자</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isMale ? {backgroundColor: '#FF8FAA'} : null]}
          onPress={() => {
            setMale(false);
          }}>
          <Text style={styles.text}>여자</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.okBlock}>
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

export default SelectGender;
