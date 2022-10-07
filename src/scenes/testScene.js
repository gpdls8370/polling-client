import React from 'react';
import {Button, Text, View} from 'react-native';

function testScene({navigation}) {
  return (
    <View>
      <Button
        title="go to mainFeed"
        onPress={() => navigation.navigate('mainFeed')}
      />
    </View>
  );
}

export default testScene;
