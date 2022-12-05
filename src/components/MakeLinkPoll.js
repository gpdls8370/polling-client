import React, {useState} from 'react';
import MakePollInputContext from './MakePollInputContext';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import MakePollSelection from './MakePollSelection';
import {type_color, type_font, type_id, url} from './Constants';
import {showNetworkError, showToast, toastType} from './ToastManager';
import {StackActions} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';

function MakeLinkPoll({postId, setMakeLink}) {
  const [text, setText] = useState('');
  const [uuid] = useRecoilState(uuidState);

  const NUM_ITEMS = 2;

  const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
    return {
      key: `item-${index}`,
      label: '',
      image: '',
    };
  });

  const [selectionData, setSelectionData] = useState(initialData);

  const onChangeText = value => {
    setText(value);
  };

  const onChangeSelectionData = value => {
    //console.debug(value)
    setSelectionData(value);
  };

  const linkVotePost = () => {
    const selections = [];
    selectionData.forEach(value => {
      selections.push({
        label: value.label,
        image: value.image,
      });
    });

    if (selections[0].label != '' && selections[1].label != '') {
      return fetch(url.likeVotePost, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UUID: uuid,
          poll_name: text,
          selections: selections,
          postId: postId,
        }),
      })
        .then(function (response) {
          if (response.ok) {
            showToast(toastType.success, '꼬리투표 등록 성공');
            setMakeLink(false);
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ',
            error.message,
          );
        });
    }
  };

  return (
    <ScrollView>
      <Text style={styles.text}>꼬리 투표 등록</Text>
      <View style={{borderWidth: 0.5, borderColor: type_color.gray}} />
      <MakePollInputContext text={text} onChangeText={onChangeText} />
      <MakePollSelection
        type={type_id.balance}
        data={selectionData}
        onChangeData={onChangeSelectionData}
      />
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => {
            setMakeLink(false);
          }}>
          <Text
            style={[
              styles.buttonText,
              {backgroundColor: type_color.disablePressableButton},
            ]}>
            취소
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            linkVotePost();
          }}>
          <Text style={styles.buttonText}>등록</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: type_font.ggodic80,
    color: 'black',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: type_font.ggodic60,
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: type_color.balance,
    marginRight: 15,
    marginBottom: 15,
  },
});

export default MakeLinkPoll;
