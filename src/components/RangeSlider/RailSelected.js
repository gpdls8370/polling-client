import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {type_color} from '../Constants';

const RailSelected = ({type}) => (
  <View style={[styles.root, {backgroundColor: type_color[type]}]} />
);

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 3,
    backgroundColor: 'black',
    borderRadius: 2,
  },
});
