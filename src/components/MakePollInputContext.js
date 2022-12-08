import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {type_color} from './Constants';

function MakePollInputContext({text, onChangeText}) {
  return (
    <View style={styles.titleView}>
      <Text style={styles.titleText}>{display_text.title}</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => onChangeText(value)}
        value={text}
        placeholder={display_text.hint}
        placeholderTextColor={type_color.gray}
        keyboardType="default"
        multiline={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleView: {
    padding: 15,
  },
  titleText: {
    textAlign: 'left',
    textAlignVertical: 'center',
    marginHorizontal: 5,
    fontSize: 20,
    fontFamily: 'BMJUA_ttf',
    color: 'black',
  },
  input: {
    textAlign: 'left',
    textAlignVertical: 'top',
    multiline: true,
    width: 'auto',
    height: 150,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#B1B1B1',
    padding: 15,
    color: 'black',
    fontFamily: 'BMJUA_ttf',
  },
});

const display_text = {
  title: '내용 입력',
  hint: '내용',
};

export default MakePollInputContext;
