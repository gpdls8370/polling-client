import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import TopBar from '../components/TopBar';
import {type_color, type_id, url} from '../components/Constants';
import {StackActions} from '@react-navigation/native';
import MakePollModeSelector from '../components/MakePollModeSelector';
import MakePollInputContext from '../components/MakePollInputContext';
import MakePollBottomButton from '../components/MakePollBottomButton';
import MakePollSelection from '../components/MakePollSelection';
import MakePollInputTag from '../components/MakePollInputTag';
import {uuidState} from '../atoms/auth';
import {useRecoilState} from 'recoil';

function makePoll({navigation}) {
  const [type, setType] = useState(type_id.polling);
  const [text, setText] = useState('');
  const [uuid] = useRecoilState(uuidState);

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
  };

  const onClickReset = () => {
    setText('');
    setSelectionData(initialData);
    setTag(null);
  };

  const onClickPreview = () => {
    //TODO 구현
    console.log('onClickPreview');
  };

  const isValidData = () => {
    if (text.trim().length <= 0) {
      //TODO 내용입력 안내
      return false;
    }

    let isEmptyLabel = false;
    selectionData.forEach(item => {
      if (item.label.trim().length <= 0) {
        isEmptyLabel = true;
      }
    });

    if (isEmptyLabel === true) {
      //TODO 선택지 빈칸 안내
      return false;
    }

    if (!tag) {
      //TODO 태그 미선택 안내
      return false;
    }

    return true;
  };

  const pollingPost = () => {
    return fetch(url.postPolling, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UUID: uuid,
        poll_name: text,
        selections: selectionData,
        tag: tag,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          console.log('pollingPost ok');
          navigation.dispatch(StackActions.popToTop());
        }
        throw new Error('Network response was not ok.');
      })
      .catch(function (error) {
        //TODO 에러 핸들링
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  const balancePost = () => {
    return fetch(url.postBalance, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UUID: uuid,
        poll_name: text,
        selections: selectionData,
        tag: tag,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          console.log('balancePost ok');
          navigation.dispatch(StackActions.popToTop());
        }
        throw new Error('Network response was not ok.');
      })
      .catch(function (error) {
        //TODO 에러 핸들링
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  const onClickUpload = () => {
    console.log('onClickUpload: ' + type.toString());

    console.log(isValidData());
    if (isValidData()) {
      if (type == type_id.polling) {
        pollingPost();
      } else if (type == type_id.balance) {
        balancePost();
      }
    }
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
        <MakePollInputTag
          selectedTag={tag}
          onClickTagButton={onClickTag}
          contextString={text}
        />
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
