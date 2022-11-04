import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {type_color, type_font} from '../Constants';
import {useRecoilState} from 'recoil';
import {isMaleState} from '../Atoms';

function SelectGender() {
  const [isMale, setMale] = useRecoilState(isMaleState);

  return (
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
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
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
});

export default SelectGender;
