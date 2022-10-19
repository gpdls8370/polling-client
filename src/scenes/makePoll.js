import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import TopBar from '../components/TopBar';
import {type_color, type_id} from '../components/Constants';
import MakePollModeSelector from '../components/MakePollModeSelector';
import MakePollInputContext from '../components/MakePollInputContext';
import MakePollBottomButton from '../components/MakePollBottomButton';
import MakePollSelection from '../components/MakePollSelection';
import MakePollInputTag from '../components/MakePollInputTag';

function makePoll({navigation}) {
  const [type, setType] = useState(type_id.polling);
  const [text, setText] = useState(null);
  const [selectionData, setSelectionData] = useState(null);
  const [tag, setTag] = useState(null);

  const onClickPolling = () => {
    setType(type_id.polling);
    //TODO 구현
  };
  const onClickBalance = () => {
    setType(type_id.balance);
    //TODO 구현
  };
  const onClickBattle = () => {
    setType(type_id.battle);
    //TODO 구현
  };

  const onChangeText = value => {
    setText(value);
  };

  const onChangeSelectionData = value => {
    //console.debug(value)
    setSelectionData(value);
  };

  const onClickTag = tag => {
    setTag(tag);
    console.log(tag);
    //TODO 구현
  };

  const onClickReset = () => {
    setText('');
    //TODO 구현
  };

  const onClickPreview = () => {
    //TODO 구현
    console.log('onClickPreview');
  };

  const onClickUpload = () => {
    //TODO 구현
    console.log('onClickUpload');
  };

  return (
    <SafeAreaView style={styles.block}>
      <TopBar navigation={navigation} type={type_id.makePoll} />
      <MakePollModeSelector
        onClickPoling={onClickPolling}
        onClickBalance={onClickBalance}
        onClickBattle={onClickBattle}
      />
      <View style={[styles.border]} />
      <ScrollView style={styles.scrollView}>
        <MakePollInputContext text={text} onChangeText={onChangeText} />
        <View style={[styles.border]} />
        <MakePollSelection
          type={type}
          onChangeSelectionData={onChangeSelectionData}
        />
        <View style={[styles.border]} />
        <MakePollInputTag onClickTag={onClickTag} />
      </ScrollView>
      <View style={[styles.border]} />
      <MakePollBottomButton
        onClickReset={onClickReset}
        onClickPreview={onClickPreview}
        onClickUpload={onClickUpload}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {},
  border: {
    backgroundColor: type_color.border,
    borderWidth: 0.3,
  },
});

export default makePoll;
