import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Feed() {
  return (
    <View style={styles.block}>
      <Text>피드 들어갈 자리</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Feed;
