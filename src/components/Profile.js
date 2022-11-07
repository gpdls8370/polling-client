import {select_color, type_font} from './Constants';
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

function Profile({avatarFile, name}) {
  return (
    <View style={styles.block}>
      <Image source={avatarFile} resizeMode="cover" style={styles.avatar} />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 64,
    marginBottom: 5,
    marginRight: 4,
  },
  text: {
    fontFamily: type_font.ggodic60,
    fontSize: 12,
    marginTop: 8,
    color: 'black',
  },
});

export default Profile;
