import React from 'react';
import {SafeAreaView} from 'react-native';

const App = () => {
  const name = '이현우';
  return (
    <SafeAreaView>
      <Greeting name={name} />
    </SafeAreaView>
  );
};

export default App;
