import React, {useEffect, useState} from 'react';
import {
  FlatList,
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
import {type_color, url} from '../components/Constants';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';
import {
  showNetworkError,
  showToast,
  toastType,
} from '../components/ToastManager';
import {StackActions} from '@react-navigation/native';

function profile({navigation, route}) {
  const {targetUUID} = route.params;
  const [isMyProfile, setMyProfile] = useState(false);
  const [uuid] = useRecoilState(uuidState);
  const [name, setName] = useState('');
  const [prefix, setPrefix] = useState('');
  const [ownPrefixList, setOwnPrefixList] = useState([]);
  const [profileImg, setProfileImg] = useState('');

  const getProfileData = async () => {
    fetch(
      url.profile +
        '/' +
        (!uuid ? 'null' : uuid) +
        '/' +
        (!targetUUID ? 'null' : targetUUID),
    )
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(function (data) {
        console.log(data);

        setMyProfile(data.isMyProfile);
        setName(data.name);
        setPrefix(data.prefix);
        setOwnPrefixList(data.ownPrefixList);
        setProfileImg(data.profileImg);
      })
      .catch(function (error) {
        showNetworkError(error.message);
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  const onClickChangeName = () => {
    console.log();
    return fetch(url.nameChange, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UUID: uuid,
        name: name,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          console.log('name change ok');
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(function (data) {
        setName(data.name);
        showToast(toastType.success, '닉네임 변경 성공');
      })
      .catch(function (error) {
        showNetworkError(error.message);
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  const onClickPrefixButton = selectPrefix => {
    if (selectPrefix !== prefix) {
      return fetch(url.prefixChange, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UUID: uuid,
          prefix: selectPrefix,
        }),
      })
        .then(function (response) {
          if (response.ok) {
            console.log('prefix change ok');
            return response.json();
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .then(function (data) {
          setPrefix(data.prefix);
          showToast(toastType.success, '칭호 변경 성공');
        })
        .catch(function (error) {
          showNetworkError(error.message);
          console.log(
            'There has been a problem with your fetch operation: ',
            error.message,
          );
        });
    }
  };

  const onClickProfileImg = () => {
    //TODO 프로필 이미지 변경 구현
    console.log('프로필 이미지 클릭');
  };

  useEffect(() => {
    console.log(targetUUID);
    getProfileData();
  }, []);

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.pressable, backgroundColor]}>
      <Text style={[styles.buttonText, textColor]}>{item}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor =
      item === prefix
        ? type_color.button_default
        : type_color.disablePressableButton;

    return (
      <Item
        item={item}
        onPress={() => {
          if (isMyProfile) {
            onClickPrefixButton(item);
          }
        }}
        backgroundColor={{backgroundColor}}
        textColor={'white'}
      />
    );
  };

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
      <ScrollView style={styles.scrollView}>
        <Text style={[styles.titleText, {alignSelf: 'center'}]}>
          {display_text.title}
        </Text>
        <TouchableOpacity
          disabled={!isMyProfile}
          onPress={() => {
            onClickProfileImg();
          }}>
          <Image
            source={{
              uri: profileImg,
            }}
            style={styles.profileImg}
          />
        </TouchableOpacity>
        <View style={styles.subView}>
          <Text style={[styles.subText]}>{display_text.name}</Text>
          {isMyProfile ? (
            <View style={[{flexDirection: 'row', flex: 1}]}>
              <TextInput
                style={styles.input}
                onChangeText={value => setName(value)}
                value={name}
                placeholder={display_text.name_hint}
                placeholderTextColor={type_color.gray}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                editable={isMyProfile}
              />
              <Pressable
                style={styles.button}
                onPress={() => onClickChangeName()}>
                <Text style={styles.buttonText} numberOfLines={1}>
                  {display_text.change_button}
                </Text>
              </Pressable>
            </View>
          ) : (
            <Text
              style={[
                styles.subText,
                {flexDirection: 'row', flex: 0.8, textAlign: 'center'},
              ]}>
              {name}
            </Text>
          )}
        </View>
        <View style={styles.subView}>
          {ownPrefixList.length > 0 ? (
            <View>
              <Text style={[styles.subText, {marginBottom: 20}]}>
                {display_text.prefix}
              </Text>
              <FlatList
                data={ownPrefixList}
                renderItem={renderItem}
                keyExtractor={item => item}
                extraData={prefix}
                style={styles.pressableView}
                horizontal={true}
              />
            </View>
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  scrollView: {
    marginTop: 2,
  },
  border: {
    backgroundColor: type_color.border,
    borderWidth: 0.3,
  },

  icon: {
    width: 28,
    height: 28,
    marginHorizontal: 5,
  },
  profileImg: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginHorizontal: 5,
    marginVertical: 20,
  },
  titleText: {
    textAlign: 'left',
    textAlignVertical: 'center',
    marginHorizontal: 5,
    fontSize: 24,
    fontFamily: 'BMJUA_ttf',
    color: 'black',
  },
  subView: {
    flexDirection: 'row',
    padding: 15,
  },
  subText: {
    textAlign: 'left',
    textAlignVertical: 'center',
    marginHorizontal: 5,
    fontSize: 18,
    fontFamily: 'BMJUA_ttf',
    color: 'black',
    marginTop: 7,
  },
  input: {
    flexDirection: 'row',
    flex: 1,
    textAlign: 'left',
    textAlignVertical: 'top',
    height: 45,
    marginTop: 10,
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: '#B1B1B1',
    padding: 15,
    color: 'black',
  },
  button: {
    alignSelf: 'flex-end',
    borderRadius: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
    backgroundColor: type_color.polling,
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    fontFamily: 'BMJUA_ttf',
    color: 'white',
  },
  pressable: {
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 4,
    marginRight: 21,
    elevation: 2,
    backgroundColor: type_color.disablePressableButton,
  },
});

const display_text = {
  title: '프로필',
  name: '닉네임 :',
  name_hint: '변경할 닉네임',
  change_button: '변경하기',
  prefix: '칭호 :',
};

export default profile;
