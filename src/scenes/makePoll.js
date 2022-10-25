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

  const NUM_ITEMS = 2;

  type Item = {
    key: string,
    label: string,
  };

  const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
    return {
      key: `item-${index}`,
      label: String(''),
    };
  });

  const [selectionData, setSelectionData] = useState(initialData);

  const [tag, setTag] = useState(null);

  const onClickPolling = () => {
    setType(type_id.polling);
    setSelectionData(initialData);
    setTag(null);
  };
  const onClickBalance = () => {
    setType(type_id.balance);
    setSelectionData(initialData);
    setTag(null);
  };
  const onClickBattle = () => {
    setType(type_id.battle);
    setSelectionData(initialData);
    setTag(null);
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
    setSelectionData(initialData);
    setTag(null);
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
          data={selectionData}
          onChangeData={onChangeSelectionData}
        />
        <View style={[styles.border]} />
        <MakePollInputTag selectedTag={tag} onClickTagButton={onClickTag} />
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
