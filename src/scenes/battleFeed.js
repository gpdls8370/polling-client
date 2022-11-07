import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import TopBar from '../components/TopBar';
import Feed from '../components/Feed';
import {type_id} from '../components/Constants';

function battleFeed({navigation}) {
  return (
    <SafeAreaView style={styles.block}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <TopBar navigation={navigation} type={type_id.battle} />
      <Feed navigation={navigation} type={type_id.battle} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default battleFeed;
