import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {type_color} from './Constants';

function MakePollBottomButton({onClickReset, onClickPreview, onClickUpload}) {
  return (
    <View style={styles.buttonView}>
      <View style={styles.buttonViewLeft}>
        <Pressable style={styles.button} onPress={() => onClickReset()}>
          <Text style={styles.buttonText}>{button_text.reset}</Text>
        </Pressable>
      </View>
      <View style={styles.buttonViewRight}>
        {/*
        <Pressable
          style={[styles.button, {marginHorizontal: 21}]}
          onPress={() => onClickPreview()}>
          <Text style={styles.buttonText}>{button_text.preview}</Text>
        </Pressable>
        */}
        <Pressable
          style={[styles.button, {backgroundColor: type_color.button_upload}]}
          onPress={() => onClickUpload()}>
          <Text style={styles.buttonText}>{button_text.upload}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  buttonViewLeft: {
    flexGrow: 1,
    alignSelf: 'flex-start',
  },
  buttonViewRight: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    fontFamily: 'BMJUA_ttf',
    color: 'white',
  },
  button: {
    alignSelf: 'flex-start',
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 3,
    elevation: 2,
    backgroundColor: type_color.button_default,
  },
});

const button_text = {
  reset: '처음부터',
  preview: '미리보기',
  upload: '등록',
};

export default MakePollBottomButton;
