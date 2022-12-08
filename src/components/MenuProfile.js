import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {type_color, type_font, url} from './Constants';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';
import {useFocusEffect} from '@react-navigation/native';

function MenuProfile({targetUUID}) {
  const [uuid] = useRecoilState(uuidState);
  const [name, setName] = useState('');
  const [prefix, setPrefix] = useState('');
  const [profileImg, setProfileImg] = useState('');

  const GetData = async () => {
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
        //console.log(data);
        setName(data.name);
        setPrefix(data.prefix);
        setProfileImg(data.profileImg);
      })
      .catch(function (error) {
        //showNetworkError(error.message);
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  useFocusEffect(
    useCallback(() => {
      GetData();
    }, [targetUUID]),
  ); //갱신용

  return (
    <View style={styles.block}>
      <Image source={{uri: profileImg}} style={styles.image} />
      <View style={{flexDirection: 'row', marginBottom: 2}}>
        <Text style={[styles.text, {color: type_color.polling}]}>
          {prefix} {name}
        </Text>
        <Text style={styles.text}>님</Text>
      </View>
      <Text style={[styles.text, {fontSize: 17}]}>환영합니다!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 20,
    color: type_color.gray,
    fontFamily: type_font.jua,
  },
});

export default MenuProfile;
