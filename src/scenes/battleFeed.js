import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
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
      <View
        style={{
          flex: 1,
          marginTop: 10,
          marginHorizontal: 5,
          marginBottom: 10,
        }}>
        <Feed navigation={navigation} type={type_id.battle} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default battleFeed;
