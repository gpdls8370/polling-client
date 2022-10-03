import React from 'react';
import {View} from 'react-native';
const App = () => {
  return (
    <View>
      <View style={{width: 400, height: 400, backgroundColor: 'gold'}}>
        <View style={{width: 300, height: 300, backgroundColor: 'indigo'}}>
          <View
            style={{
              width: 200,
              height: 200,
              backgroundColor: 'indianred',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default App;
