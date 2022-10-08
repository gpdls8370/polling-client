import React from 'react';
import {Button, Text, View} from 'react-native';
import {navigation_id} from "../components/Constants";

function testScene({navigation}) {
  return (
    <View>
      <Button
        title="go to mainFeed"
        onPress={() => navigation.navigate(navigation_id.mainFeed)}
      />
    </View>
  );
}

export default testScene;
