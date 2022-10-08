import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import TopBar from '../components/TopBar';

function makePoll({navigation}) {
  return (
    <SafeAreaView style={styles.block}>
      <TopBar navigation={navigation} type={'makePoll'} />
        <View style={styles.block}>
            <Text>투표 생성 컴포넌트들 들어갈 자리</Text>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
});

export default makePoll;
