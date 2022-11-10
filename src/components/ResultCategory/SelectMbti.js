import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {selection, type_color, type_font} from '../Constants';

function SelectBox({type, selectType, setFunc, former, latter}) {
  return (
    <View style={styles.block}>
      <View style={styles.selectBlock}>
        <TouchableOpacity
          style={[
            styles.button,
            selectType == selection.selectFormer
              ? {backgroundColor: type_color[type]}
              : null,
          ]}
          onPress={() => {
            selectType == selection.selectFormer
              ? setFunc(selection.none)
              : setFunc(selection.selectFormer);
          }}>
          <Text style={styles.text}>{former}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectType == selection.selectLatter
              ? {backgroundColor: type_color[type]}
              : null,
          ]}
          onPress={() => {
            selectType == selection.selectLatter
              ? setFunc(selection.none)
              : setFunc(selection.selectLatter);
          }}>
          <Text style={styles.text}>{latter}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity />
    </View>
  );
}

function SelectMbti({type, onPressApply}) {
  const [selectEI, setEI] = useState(selection.none);
  const [selectSN, setSN] = useState(selection.none);
  const [selectTF, setTF] = useState(selection.none);
  const [selectJP, setJP] = useState(selection.none);

  return (
    <View>
      <View style={styles.block}>
        <View>
          <SelectBox
            type={type}
            selectType={selectEI}
            setFunc={setEI}
            former={'E'}
            latter={'I'}
          />
          <SelectBox
            type={type}
            selectType={selectTF}
            setFunc={setTF}
            former={'T'}
            latter={'F'}
          />
        </View>
        <View>
          <SelectBox
            type={type}
            selectType={selectSN}
            setFunc={setSN}
            former={'S'}
            latter={'N'}
          />
          <SelectBox
            type={type}
            selectType={selectJP}
            setFunc={setJP}
            former={'J'}
            latter={'P'}
          />
        </View>
      </View>
      <View style={styles.okBlock}>
        <TouchableOpacity
          style={[styles.okButton, {borderColor: type_color[type]}]}
          onPress={() => {
            onPressApply(selectEI, selectSN, selectTF, selectJP);
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
  },
  selectBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 6,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 32,
    marginHorizontal: 3,
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

export default SelectMbti;
