import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import TopBar from '../components/TopBar';
import Feed from '../components/Feed';
import {type_id} from '../components/Constants';

function mainFeed({navigation}) {
  return (
    <SafeAreaView style={styles.block}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <TopBar navigation={navigation} type={type_id.polling} />
      <Feed navigation={navigation} type={type_id.polling} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default mainFeed;
