import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

function TopBar({navigation, type}) {
  return (
    <>
      <StatusBar backgroundColor={type_color[type]} />
      <View style={[styles.frame, {backgroundColor: type_color[type]}]}>
        <View
          style={[
            styles.block,
            {
              backgroundColor: type_color[type],
            },
          ]}>
          <Image source={type_logo[type]} style={styles.image} />
          <Text style={styles.titleText}>{type_text[type]}</Text>
        </View>
        <View style={styles.empty} />

        <TouchableOpacity onPress={() => navigation.navigate('test')}>
          <Image
            source={require('../../assets/images/plus.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('test')}>
          <Image
            source={require('../../assets/images/search.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('test')}>
          <Image
            source={require('../../assets/images/menu.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  frame: {
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
    fontFamily: 'BMJUA_ttf',
    color: 'black',
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 6,
  },
  icon: {
    width: 28,
    height: 28,
    marginHorizontal: 5,
  },
});

const type_color = {
  polling: '#FE8C68',
  balance: '#FF5050',
  battle: '#6373FF',
};
const type_text = {
  polling: '폴링',
  balance: '밸런스',
  battle: '전쟁',
};
const type_logo = {
  polling: require('../../assets/images/logo_polling.png'),
  balance: require('../../assets/images/logo_balance.png'),
  battle: require('../../assets/images/logo_battle.png'),
};

export default TopBar;
