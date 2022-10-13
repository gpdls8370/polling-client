import React, {useState} from 'react';
import {SafeAreaView, Button} from 'react-native';
import Greeting from './components/Greeting';
import Box from './components/Box';

const EX2 = () => {
  //[상태값,업데이트함수] setVisible(true) 호출 시 visible->true, (true)는 초기값
  const [visible, setVisible] = useState(true);
  const onButton = () => {
    setVisible(!visible);
  };
  return (
    <SafeAreaView>
      <Button title={'토글'} onPress={onButton} />
      {visible && <Box rounded={true} size={'small'} color={'blue'} />}
    </SafeAreaView>
  );
};

export default EX2;
