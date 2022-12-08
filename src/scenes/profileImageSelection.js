import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
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

function profileImageSelection({navigation}) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [uuid] = useRecoilState(uuidState);
  const [ownImageList, setOwnImageList] = useState();

  const margins = 0;
  const numColumns = 2;

  const getProfileImageData = () => {
    fetch(url.profImgs + '/' + (!uuid ? 'null' : uuid))
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(function (data) {
        console.log(data);
        setOwnImageList(data.ownProfileImageList);
      })
      .catch(function (error) {
        showNetworkError(error.message);
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  const onClickProfileImg = imgId => {
    console.log('프로필 이미지 클릭');

    if (uuid !== null && imgId !== null) {
      return fetch(url.imageChange, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UUID: uuid,
          index: imgId,
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
          showToast(toastType.success, '프로필 이미지 변경 성공');
          navigation.goBack();
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

  useEffect(() => {
    getProfileImageData();
  }, []);

  const Item = ({item, onPress, width}) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width,
      }}>
      <Image
        source={{
          uri: !item.profileImg ? '' : item.profileImg,
        }}
        style={styles.profileImg}
      />
    </TouchableOpacity>
  );

  const renderItem = item => {
    console.log(item);
    if (item) {
      return (
        <Item
          item={item}
          onPress={() => {
            onClickProfileImg(item.imgId);
          }}
          width={(containerWidth - margins) / numColumns}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.frame}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/close.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.titleText, {alignSelf: 'center'}]}>
        {display_text.title}
      </Text>
      <FlatList
        data={ownImageList}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
        onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, index) => index}
        numColumns={numColumns}
      />
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

  icon: {
    width: 28,
    height: 28,
    marginHorizontal: 5,
  },
  profileImg: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    borderRadius: 10,
  },
  titleText: {
    textAlign: 'left',
    textAlignVertical: 'center',
    marginHorizontal: 5,
    marginBottom: 15,
    fontSize: 24,
    fontFamily: 'BMJUA_ttf',
    color: 'black',
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
  title: '보유한 프로필 이미지',
};

export default profileImageSelection;
