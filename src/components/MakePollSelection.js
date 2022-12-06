import React from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {type_color, type_id} from './Constants';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showToast, toastType} from './ToastManager';

function MakePollSelection({type, data, onChangeData}) {
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

  const showPicker = (index, item) => {
    console.log('showPicker');

    Alert.alert(
      '이미지 업로드',
      index + 1 + '번 선택지 이미지',
      [
        {
          text: '이미지 제거',
          onPress: async () => {
            onChangeData(
              data.map((d, i) =>
                i === index
                  ? {
                      key: item.key,
                      label: item.label,
                      image: '',
                    }
                  : d,
              ),
            );
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
                  maxWidth: 512,
                  maxHeight: 512,
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

                onChangeData(
                  data.map((d, i) =>
                    i === index
                      ? {
                          key: item.key,
                          label: item.label,
                          image: base64,
                        }
                      : d,
                  ),
                );
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
                  maxWidth: 512,
                  maxHeight: 512,
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

                onChangeData(
                  data.map((d, i) =>
                    i === index
                      ? {
                          key: item.key,
                          label: item.label,
                          image: base64,
                        }
                      : d,
                  ),
                );
              },
              () => {},
            );
          },
        },
      ],
      {cancelable: true},
    );
  };

  const renderItem = ({
    item,
    index,
    drag,
    isActive,
  }: RenderItemParams<Item>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[styles.inputView]}>
          <Image
            source={require('../../assets/images/list.png')}
            style={styles.icon}
          />

          <TextInput
            style={styles.input}
            placeholder={display_text.hint}
            placeholderTextColor={type_color.gray}
            keyboardType="default"
            value={item.label}
            onChangeText={text => {
              onChangeData(
                data.map((d, i) =>
                  i === index
                    ? {
                        key: item.key,
                        label: text,
                        image: item.image,
                      }
                    : d,
                ),
              );
            }}
          />

          {type === type_id.polling && index >= 2 ? (
            <Pressable
              style={styles.pressable}
              onPress={() => {
                onChangeData(data.filter(temp => temp.key !== item.key));
              }}>
              <Image
                source={require('../../assets/images/minus-circle.png')}
                style={styles.icon}
              />
            </Pressable>
          ) : null}

          <Pressable
            style={styles.pressable}
            onPress={() => {
              showPicker(index, item);
            }}>
            {item.image.length > 0 ? (
              <Image source={{uri: item.image}} style={styles.icon} />
            ) : (
              <Image
                source={require('../../assets/images/image_upload.png')}
                style={styles.icon}
              />
            )}
          </Pressable>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <View style={styles.titleView}>
      <View>
        <Text style={styles.titleText}>{display_text.title}</Text>
      </View>
      <DraggableFlatList
        data={data}
        onDragEnd={({data}) => onChangeData(data)}
        keyExtractor={(item, index) => item.key}
        renderItem={renderItem}
      />
      {type === type_id.polling ? (
        <Pressable
          style={styles.pressable}
          onPress={() => {
            onChangeData(
              data.concat({
                key: `item-${data.length}`,
                label: String(''),
                image: String(''),
              }),
            );
          }}>
          <Image
            source={require('../../assets/images/plus-circle.png')}
            style={styles.icon}
          />
        </Pressable>
      ) : null}
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
    flexDirection: 'row',
    flex: 1,
    textAlign: 'left',
    textAlignVertical: 'center',
    multiline: true,
    height: 45,
    marginTop: 10,
    marginEnd: 7,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#B1B1B1',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'BMJUA_ttf',
    color: 'black',
  },
  pressable: {
    paddingVertical: 6,
    marginEnd: 4,
  },
  icon: {
    width: 28,
    height: 28,
    alignSelf: 'center',
    textAlignVertical: 'center',
    marginHorizontal: 5,
    marginTop: 10,
  },
});

const display_text = {
  title: '선택지 입력',
  hint: '내용',
};

export default MakePollSelection;
