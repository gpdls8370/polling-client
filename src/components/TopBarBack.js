import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {type_color, type_font, type_id, type_text} from './Constants';
import Icon from 'react-native-vector-icons/Feather';

function TopBarBack({navigation, type, optionalTitle = '', setType = null}) {
  return (
    <>
      <View style={[styles.frame, {backgroundColor: type_color[type]}]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <View
          style={[
            styles.block,
            {
              backgroundColor: type_color[type],
            },
          ]}>
          <Image source={type_logo[type]} style={styles.image} />
          {optionalTitle == '' ? (
            <Text style={styles.titleText}>{type_text[type]}</Text>
          ) : (
            <Text style={styles.titleText}>{optionalTitle}</Text>
          )}
        </View>

        {setType != null &&
          (type == type_id.polling ? (
            <TouchableOpacity onPress={() => setType(type_id.balance)}>
              <Text
                style={[
                  styles.typeText,
                  {backgroundColor: type_color.balance},
                ]}>
                밸런스
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setType(type_id.polling)}>
              <Text
                style={[
                  styles.typeText,
                  {backgroundColor: type_color.polling},
                ]}>
                폴링
              </Text>
            </TouchableOpacity>
          ))}
        <View style={styles.empty} />
        <TouchableOpacity
          style={{alignItems: 'flex-end', marginHorizontal: 7, marginTop: 5}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="x" color={'black'} size={30} />
        </TouchableOpacity>
      </View>
    </>
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
    flexDirection: 'row',
  },
  empty: {
    flex: 1,
  },
  titleText: {
    marginTop: 5,
    fontSize: 26,
    fontFamily: type_font.jua,
    color: 'black',
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 6,
  },
  typeText: {
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginLeft: 15,
    marginTop: 5,
    fontSize: 20,
    fontFamily: type_font.ggodic80,
    elevation: 5,
    color: 'white',
  },
});

const type_logo = {
  polling: require('../../assets/images/logo_polling.png'),
  balance: require('../../assets/images/logo_balance.png'),
  battle: require('../../assets/images/logo_battle.png'),
  makePoll: require('../../assets/images/logo_polling.png'),
};

export default TopBarBack;
