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
import {isAdminState, uuidState} from '../atoms/auth';
import {useRecoilState} from 'recoil';
import {
  showError,
  showNetworkError,
  showToast,
  toastType,
} from '../components/ToastManager';
import MakePollInputReward from '../components/MakePollInputReward';
import {
  balanceRefreshState,
  battlesRefreshState,
  pollingRefreshState,
} from '../components/Atoms';
import Spinner from 'react-native-loading-spinner-overlay';

function makePoll({navigation, route}) {
  const [type, setType] = useState(route.params.typeId);
  const [text, setText] = useState('');
  const [uuid] = useRecoilState(uuidState);
  const [isAdmin] = useRecoilState(isAdminState);
  const [prefix, setPrefix] = useState('');
  const [rewardImage, setRewardImage] = useState('');
  const [endMinute, setEndMinute] = useState('');
  const [pollingRefresh, setPollingRefresh] =
    useRecoilState(pollingRefreshState);
  const [balanceRefresh, setBalanceRefresh] =
    useRecoilState(balanceRefreshState);
  const [battlesRefresh, setBattlesRefresh] =
    useRecoilState(battlesRefreshState);
  const [isSpinnerEnable, setSpinnerEnable] = useState(false);

  const NUM_ITEMS = 2;

  type Item = {
    key: string,
    label: string,
    image: string,
  };

  const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
    return {
      key: `item-${index}`,
      label: '',
      image: '',
    };
  });

  const [selectionData, setSelectionData] = useState(initialData);

  const [tag, setTag] = useState(null);

  const onClickPolling = () => {
    setType(type_id.polling);
    setSelectionData(initialData);
    setTag(null);
    setPrefix('');
    setRewardImage('');
    setEndMinute('');
  };
  const onClickBalance = () => {
    setType(type_id.balance);
    setSelectionData(initialData);
    setTag(null);
    setPrefix('');
    setRewardImage('');
    setEndMinute('');
  };
  const onClickBattle = () => {
    if (isAdmin) {
      setType(type_id.battle);
      setSelectionData(initialData);
      setTag(null);
      setPrefix('');
      setRewardImage('');
      setEndMinute('');
    } else {
      showToast(
        toastType.info,
        '관리자 기능',
        '투표 배틀 게시 기능은 관리자 전용 기능입니다.',
      );
    }
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
    setPrefix('');
    setRewardImage('');
    setEndMinute('');
  };

  const onClickPreview = () => {
    //TODO 구현
    console.log('onClickPreview');
  };

  const isValidData = () => {
    if (text.trim().length <= 0) {
      showError('오류', '내용을 입력해주세요.');
      return false;
    }

    let isEmptyLabel = false;
    selectionData.forEach(item => {
      if (!item.label || item.label.trim().length <= 0) {
        isEmptyLabel = true;
      }
    });

    if (isEmptyLabel === true) {
      showError('오류', '선택지는 빈칸으로 둘수 없습니다.');
      return false;
    }

    if (type != type_id.battle && !tag) {
      showError('오류', '태그를 선택해 주세요.');
      return false;
    }

    if (type == type_id.battle) {
      if (prefix.trim().length <= 0) {
        showError('오류', '보상으로 제공할 접두사를 입력해 주세요.');
        return false;
      } else if (rewardImage.length <= 0) {
        showError(
          '오류',
          '보상으로 제공할 프로필 이미지 사진을 업로드 해 주세요.',
        );
        return false;
      } else if (endMinute.length <= 0 || isNaN(endMinute)) {
        showError('오류', '알맞은 마감 시간을 입력해 주세요. (분 단위 숫자)');
        return false;
      }
    }

    return true;
  };

  const pollingPost = selections => {
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
        selections: selections,
        tag: tag,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          console.log('pollingPost ok');
          showToast(toastType.success, '투표등록 성공');
          navigation.dispatch(StackActions.popToTop());
          setPollingRefresh(!pollingRefresh);

          setSpinnerEnable(false);
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(function (error) {
        setSpinnerEnable(false);
        showNetworkError(error.message);
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  const balancePost = selections => {
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
        selections: selections,
        tag: tag,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          console.log('balancePost ok');
          showToast(toastType.success, '투표등록 성공');
          navigation.dispatch(StackActions.popToTop());
          setBalanceRefresh(!balanceRefresh);

          setSpinnerEnable(false);
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(function (error) {
        setSpinnerEnable(false);
        showNetworkError(error.message);
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  const battlePost = selections => {
    return fetch(url.postBattle, {
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
        profileImg: rewardImage,
        prefix: prefix,
        endMinute: endMinute,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          console.log('battlePost ok');
          showToast(toastType.success, '투표등록 성공');
          navigation.dispatch(StackActions.popToTop());
          setBattlesRefresh(!battlesRefresh);

          setSpinnerEnable(false);
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(function (error) {
        setSpinnerEnable(false);
        showNetworkError(error.message);
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  const onClickUpload = () => {
    console.log('onClickUpload: ' + type.toString());

    console.log(isValidData());
    if (isValidData() && !isSpinnerEnable) {
      setSpinnerEnable(true);

      const selections = [];
      selectionData.forEach(value => {
        selections.push({
          label: value.label,
          image: value.image,
        });
      });

      console.log({
        UUID: uuid,
        poll_name: text,
        selections: selections,
        tag: tag,
        prefix: prefix,
        endMinute: endMinute,
      });

      if (type == type_id.polling) {
        pollingPost(selections);
      } else if (type == type_id.balance) {
        balancePost(selections);
      } else if (type == type_id.battle) {
        battlePost(selections);
      }
    }
  };

  return (
    <SafeAreaView style={styles.block}>
      <Spinner
        visible={isSpinnerEnable}
        textContent={'로딩중...'}
        textStyle={{color: '#FFF'}}
        cancelable={true}
      />
      <TopBar navigation={navigation} type={type} isMakePoll={true} />
      <MakePollModeSelector
        mode={type}
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
        {type == type_id.battle ? (
          <MakePollInputReward
            prefix={prefix}
            rewordImage={rewardImage}
            endMinute={endMinute}
            onChangePrefix={setPrefix}
            onChangeRewordImage={setRewardImage}
            onChangeEndMinute={setEndMinute}
          />
        ) : (
          <MakePollInputTag
            type={type}
            selectedTag={tag}
            onClickTagButton={onClickTag}
            contextString={text}
            selectionData={selectionData}
            isSpinnerEnable={isSpinnerEnable}
            setSpinnerEnable={setSpinnerEnable}
          />
        )}
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
  scrollView: {
    backgroundColor: 'white',
  },
  border: {
    backgroundColor: type_color.border,
    borderWidth: 0.3,
  },
});

export default makePoll;
