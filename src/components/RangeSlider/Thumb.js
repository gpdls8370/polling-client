import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {type_color} from '../Constants';

const THUMB_RADIUS = 9;

const Thumb = ({type}) => (
  <View style={[styles.root, {backgroundColor: type_color[type]}]} />
);

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 1,
    borderColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.16,
    shadowRadius: 6,
  },
});

export default memo(Thumb);
