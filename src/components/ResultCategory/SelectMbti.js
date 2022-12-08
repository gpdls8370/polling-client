import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {selection, type_color, type_font, url} from '../Constants';

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

function SelectMbti({type, postId, setInitresult}) {
  const [selectEI, setEI] = useState(selection.none);
  const [selectSN, setSN] = useState(selection.none);
  const [selectTF, setTF] = useState(selection.none);
  const [selectJP, setJP] = useState(selection.none);

  const onPressApply = () => {
    fetch(
      url.mbtiResult +
        postId +
        '/' +
        selectEI +
        '/' +
        selectSN +
        '/' +
        selectTF +
        '/' +
        selectJP,
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setInitresult(json);
      });
  };

  const onPressBack = () => {
    setInitresult(null);
    setEI(selection.none);
    setSN(selection.none);
    setTF(selection.none);
    setJP(selection.none);
  };

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
          style={[styles.backButton]}
          onPress={() => onPressBack()}>
          <Text style={[styles.backText]}>되돌리기</Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
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
      <Text style={styles.warnText}>
        * MBTI 정보를 입력하지 않은 사용자는 통계 결과에 반영되지 않습니다.
      </Text>
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
  warnText: {
    fontSize: 10,
    fontFamily: type_font.ggodic40,
    color: type_color.disablePressableButton,
    alignSelf: 'center',
  },
});

export default SelectMbti;
