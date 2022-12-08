import React from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {type_color} from './Constants';
import {showToast, toastType} from './ToastManager';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function MakePollInputReward({
  prefix,
  rewordImage,
  endMinute,
  onChangePrefix,
  onChangeRewordImage,
  onChangeEndMinute,
}) {
  const permissionCheckCamera = async (success, fail) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '카메라 접근권한',
          message: '카메라 기능 사용을 위해 권한을 요청합니다.',
          buttonNeutral: '나중에 다시 확인',
          buttonNegative: '거부',
          buttonPositive: '허용',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        success();
      } else {
        console.log('Camera permission denied');
        showToast(toastType.error, '권한획득 실패');
        fail();
      }
    } catch (err) {
      console.warn(err);
      fail();
    }
  };

  const permissionCheckExternalStorage = async (success, fail) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: '외부 저장소 접근권한',
          message: '외부 저장소 접근을 위해 권한을 요청합니다.',
          buttonNeutral: '나중에 다시 확인',
          buttonNegative: '거부',
          buttonPositive: '허용',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the External Storage');
        success();
      } else {
        console.log('External Storage permission denied');
        showToast(toastType.error, '권한획득 실패');
        fail();
      }
    } catch (err) {
      console.warn(err);
      fail();
    }
  };

  const showPicker = () => {
    console.log('showPicker');

    Alert.alert(
      '이미지 업로드',
      '리워드 프로필 이미지',
      [
        {
          text: '이미지 제거',
          onPress: async () => {
            onChangeRewordImage('');
          },
        },
        {
          text: '카메라로 찍기',
          onPress: async () => {
            permissionCheckCamera(
              async () => {
                const result = await launchCamera({
                  mediaType: 'photo',
                  cameraType: 'back',
                  includeBase64: true,
                  maxWidth: 115,
                  maxHeight: 132,
                });
                if (result.didCancel) {
                  return null;
                }

                const base64 =
                  'data:' +
                  result.assets[0].type +
                  ';base64,' +
                  result.assets[0].base64;

                console.log(base64);

                onChangeRewordImage(base64);
              },
              () => {},
            );
          },
        },
        {
          text: '앨범에서 선택',
          onPress: async () => {
            permissionCheckExternalStorage(
              async () => {
                const result = await launchImageLibrary({
                  includeBase64: true,
                  maxWidth: 115,
                  maxHeight: 132,
                });
                if (result.didCancel) {
                  return null;
                }

                const base64 =
                  'data:' +
                  result.assets[0].type +
                  ';base64,' +
                  result.assets[0].base64;

                console.log(base64);

                onChangeRewordImage(base64);
              },
              () => {},
            );
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.titleView}>
      <Text style={styles.titleText}>{display_text.title}</Text>

      <View style={styles.inputView}>
        <TextInput
          style={[styles.input, {marginRight: 10}]}
          placeholder={display_text.prefixHint}
          placeholderTextColor={type_color.gray}
          keyboardType="default"
          value={prefix}
          onChangeText={text => onChangePrefix(text)}
        />
        <TextInput
          style={styles.input}
          placeholder={display_text.endMinuteHint}
          placeholderTextColor={type_color.gray}
          keyboardType="numeric"
          value={endMinute}
          onChangeText={text => onChangeEndMinute(text)}
        />
      </View>
      <Pressable
        style={styles.pressable}
        onPress={() => {
          showPicker();
        }}>
        {rewordImage.length > 0 ? (
          <Image source={{uri: rewordImage}} style={styles.icon} />
        ) : (
          <Image
            source={require('../../assets/images/image_upload.png')}
            style={styles.icon}
          />
        )}
      </Pressable>
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
  inputView: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    textAlign: 'left',
    textAlignVertical: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#B1B1B1',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'black',
    fontFamily: 'BMJUA_ttf',
  },
  pressable: {
    paddingVertical: 6,
    marginEnd: 4,
  },
  icon: {
    width: 115,
    height: 132,
    alignSelf: 'center',
    textAlignVertical: 'center',
    resizeMode: 'stretch',
    marginHorizontal: 5,
    marginTop: 10,
  },
});

const display_text = {
  title: '리워드',
  prefixHint: '접두사(칭호)',
  endMinuteHint: '마감까지 남은 시간(분)',
};

export default MakePollInputReward;
