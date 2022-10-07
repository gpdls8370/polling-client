import React from 'react';
import {View, StyleSheet} from 'react-native';

function BottomBar() {
  return <View style={styles.block} />;
}

const styles = StyleSheet.create({
  block: {
    height: 64,
    backgroundColor: 'red',
  },
});

export default BottomBar;
