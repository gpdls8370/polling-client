import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

function Counter({count, onIncrease, onDecrease}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.numberArea}>
        <Text style={styles.number}>{count}</Text>
      </View>
      <Button title={'+1'} onPress={onIncrease} />
      <Button title={'-1'} onPress={onDecrease} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  numberArea: {
    flex: 1,
    alignItems: 'center', //가로정렬
    justifyContent: 'center', //세로정렬
  },
  number: {
    fontSize: 72,
    fontWeight: 'bold',
  },
});

export default Counter;
