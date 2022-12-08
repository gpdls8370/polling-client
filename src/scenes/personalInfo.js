import React, {useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  navigation_id,
  type_color,
  type_font,
  type_id,
  url,
} from '../components/Constants';
import {StackActions} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';
import {
  showError,
  showNetworkError,
  showToast,
  toastType,
} from '../components/ToastManager';

function personalInfo({navigation}) {
  const [uuid, setUUID] = useRecoilState(uuidState);

  const [gender, setGender] = useState(null);
  const [birthday, setBirthday] = useState(null);

  const [selectEI, setEI] = useState(selection.none);
  const [selectSN, setSN] = useState(selection.none);
  const [selectTF, setTF] = useState(selection.none);
  const [selectJP, setJP] = useState(selection.none);

  const regBirth =
    /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;

  const isValidInput = () => {
    if (!gender) {
      showError('오류', '성별을 선택해주세요.');
      return false;
    }

    if (!birthday) {
      showError('오류', '생년월일을 입력해주세요.');
      return false;
    }

    if (!regBirth.test(birthday)) {
      showError('오류', '생년월일을 올바르게 입력해주세요.');
      return false;
    }
    return true;
  };

  const convertMBTI = () => {
    let tempMBTI = '';

    if (selectEI == selection.selectFormer) {
      tempMBTI = tempMBTI + 'E';
    } else if (selectEI == selection.selectLatter) {
      tempMBTI = tempMBTI + 'I';
    }

    if (selectSN == selection.selectFormer) {
      tempMBTI = tempMBTI + 'S';
    } else if (selectSN == selection.selectLatter) {
      tempMBTI = tempMBTI + 'N';
    }

    if (selectTF == selection.selectFormer) {
      tempMBTI = tempMBTI + 'T';
    } else if (selectTF == selection.selectLatter) {
      tempMBTI = tempMBTI + 'F';
    }

    if (selectJP == selection.selectFormer) {
      tempMBTI = tempMBTI + 'J';
    } else if (selectJP == selection.selectLatter) {
      tempMBTI = tempMBTI + 'P';
    }

    if (tempMBTI.length > 0 && tempMBTI.length < 4) {
      return 'err';
    } else if (tempMBTI.length > 0) {
      return tempMBTI;
    } else {
      return null;
    }
  };

  const signUpInfoPost = mbti => {
    const birthdayForServer =
      birthday.slice(0, 4) +
      '-' +
      birthday.slice(4, 6) +
      '-' +
      birthday.slice(6, 8);

    return fetch(url.signup, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UUID: uuid,
        gender: gender,
        birthday: birthdayForServer,
        mbti: mbti,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          showToast(toastType.success, '회원가입 성공');
          navigation.dispatch(StackActions.popToTop());
          //navigation.navigate(navigation_id.likeTagSelect);
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(function (error) {
        showNetworkError(error.message);
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  const onSignUp = () => {
    if (isValidInput()) {
      if (convertMBTI() === 'err') {
        showError('오류', 'MBTI를 올바르게 선택하거나 모두 해제 해주세요.');
      } else if (convertMBTI()) {
        signUpInfoPost(convertMBTI());
      } else {
        signUpInfoPost(null);
      }
    }
  };

  function SelectBox({type, selectType, setFunc, former, latter}) {
    return (
      <View style={styles.blockMBTI}>
        <View style={styles.selectBlockMBTI}>
          <TouchableOpacity
            style={[
              styles.buttonMBTI,
              selectType == selection.selectFormer
                ? {backgroundColor: type_color[type]}
                : null,
            ]}
            onPress={() => {
              selectType == selection.selectFormer
                ? setFunc(selection.none)
                : setFunc(selection.selectFormer);
            }}>
            <Text style={styles.textMBTI}>{former}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonMBTI,
              selectType == selection.selectLatter
                ? {backgroundColor: type_color[type]}
                : null,
            ]}
            onPress={() => {
              selectType == selection.selectLatter
                ? setFunc(selection.none)
                : setFunc(selection.selectLatter);
            }}>
            <Text style={styles.textMBTI}>{latter}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.frame}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(StackActions.popToTop())}>
          <Image
            source={require('../../assets/images/close.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.titleText}>{display_text.title}</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.subView}>
          <Text style={styles.subText}>{display_text.gender}</Text>
          <View style={styles.blockGender}>
            <TouchableOpacity
              style={[
                styles.buttonGender,
                gender === 'M' ? {backgroundColor: '#7F8CFF'} : null,
              ]}
              onPress={() => {
                setGender('M');
              }}>
              <Text style={styles.textGender}>남자</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonGender,
                gender === 'F' ? {backgroundColor: '#FF8FAA'} : null,
              ]}
              onPress={() => {
                setGender('F');
              }}>
              <Text style={styles.textGender}>여자</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.subView}>
          <Text style={styles.subText}>{display_text.birthday}</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => setBirthday(value)}
            keyboardType="number-pad"
            autoCapitalize="none"
            maxLength={8}
            placeholderTextColor={type_color.gray}
            placeholder={display_text.birthday_hint}
            autoCorrect={false}
          />
        </View>

        <View style={[{padding: 15, marginBottom: 10}]}>
          <Text style={styles.subText}>{display_text.mbti}</Text>
          <View style={styles.blockMBTI}>
            <View>
              <SelectBox
                type={type_id.polling}
                selectType={selectEI}
                setFunc={setEI}
                former={'E'}
                latter={'I'}
              />
              <SelectBox
                type={type_id.polling}
                selectType={selectTF}
                setFunc={setTF}
                former={'T'}
                latter={'F'}
              />
            </View>
            <View>
              <SelectBox
                type={type_id.polling}
                selectType={selectSN}
                setFunc={setSN}
                former={'S'}
                latter={'N'}
              />
              <SelectBox
                type={type_id.polling}
                selectType={selectJP}
                setFunc={setJP}
                former={'J'}
                latter={'P'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Pressable style={styles.signUpButton} onPress={() => onSignUp()}>
          <Text style={styles.buttonText} numberOfLines={1}>
            {display_text.button}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const selection = {
  none: 0,
  selectFormer: 1,
  selectLatter: 2,
};

const styles = StyleSheet.create({
  blockMBTI: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectBlockMBTI: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 6,
  },
  buttonMBTI: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 32,
    marginHorizontal: 3,
    backgroundColor: type_color.disablePressableButton,
  },
  textMBTI: {
    fontSize: 20,
    fontFamily: type_font.ggodic60,
    color: 'white',
  },
  blockGender: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonGender: {
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 15,
    backgroundColor: type_color.disablePressableButton,
  },
  textGender: {
    fontSize: 15,
    fontFamily: type_font.ggodic60,
    color: 'white',
  },
  frame: {
    paddingTop: 25,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  block: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {},
  border: {
    backgroundColor: type_color.border,
    borderWidth: 0.3,
  },
  icon: {
    width: 28,
    height: 28,
    marginHorizontal: 5,
  },
  titleText: {
    textAlign: 'left',
    textAlignVertical: 'center',
    marginHorizontal: 5,
    fontSize: 24,
    fontFamily: 'BMJUA_ttf',
    color: 'black',
    padding: 15,
  },
  subView: {
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
  },
  subText: {
    textAlign: 'left',
    textAlignVertical: 'center',
    marginHorizontal: 5,
    fontSize: 20,
    fontFamily: 'BMJUA_ttf',
    color: 'black',
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'left',
    textAlignVertical: 'top',
    height: 45,
    marginStart: 15,
    marginEnd: 20,
    borderWidth: 1,
    borderColor: '#B1B1B1',
    paddingHorizontal: 15,
    fontFamily: 'BMJUA_ttf',
    color: 'black',
  },
  buttonView: {
    padding: 15,
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    fontFamily: 'BMJUA_ttf',
    color: 'white',
  },
  signUpButton: {
    alignSelf: 'center',
    borderRadius: 0,
    paddingHorizontal: 120,
    paddingVertical: 20,
    elevation: 2,
    backgroundColor: type_color.polling,
  },
});

const display_text = {
  title: '정보 입력',
  gender: '성별',
  birthday: '생년월일',
  birthday_hint: 'ex: 20001105',
  mbti: 'MBTI (선택)',
  button: '회원가입',
};

export default personalInfo;
