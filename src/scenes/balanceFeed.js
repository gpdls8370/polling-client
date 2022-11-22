import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import TopBar from '../components/TopBar';
import Feed from '../components/Feed';
import {type_id} from '../components/Constants';

function balanceFeed({navigation}) {
  return (
    <SafeAreaView style={styles.block}>
      <TopBar navigation={navigation} type={type_id.balance} />
      <Feed navigation={navigation} type={type_id.balance} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default balanceFeed;
