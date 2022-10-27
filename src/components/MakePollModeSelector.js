import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {type_color, type_id, type_text} from './Constants';

function MakePollModeSelector({onClickPoling, onClickBalance, onClickBattle}) {
  const [mode, setMode] = useState(type_id.polling);

  const getButtonStyles = () => {
    const styleList = [];
    if (mode === type_id.polling) {
      styleList.push([styles.button, styles.buttonOpen]);
      styleList.push([styles.button, styles.buttonClose]);
      styleList.push([styles.button, styles.buttonClose]);
    } else if (mode === type_id.balance) {
      styleList.push([styles.button, styles.buttonClose]);
      styleList.push([styles.button, styles.buttonOpen]);
      styleList.push([styles.button, styles.buttonClose]);
    } else {
      styleList.push([styles.button, styles.buttonClose]);
      styleList.push([styles.button, styles.buttonClose]);
      styleList.push([styles.button, styles.buttonOpen]);
    }

    return styleList;
  };
  return (
    <View style={styles.selectMode}>
      <Pressable
        style={({pressed}) => getButtonStyles()[0]}
        disabled={mode === type_id.polling}
        onPress={() => {
          setMode(type_id.polling);
          onClickPoling();
        }}>
        <Text style={styles.selectModeText}>{type_text[type_id.polling]}</Text>
      </Pressable>
      <Pressable
        style={({pressed}) => getButtonStyles()[1]}
        disabled={mode === type_id.balance}
        onPress={() => {
          setMode(type_id.balance);
          onClickBalance();
        }}>
        <Text style={styles.selectModeText}>{type_text[type_id.balance]}</Text>
      </Pressable>
      <Pressable
        style={({pressed}) => getButtonStyles()[2]}
        disabled={mode === type_id.battle}
        onPress={() => {
          {
            /* setMode(type_id.battle); */
          }
          onClickBattle();
        }}>
        <Text style={styles.selectModeText}>{type_text[type_id.battle]}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  selectMode: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  selectModeText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    fontFamily: 'BMJUA_ttf',
    color: 'white',
  },
  button: {
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 3,
    marginRight: 21,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: type_color.disablePressableButton,
  },
  buttonOpen: {
    backgroundColor: type_color.polling,
  },
});

export default MakePollModeSelector;
