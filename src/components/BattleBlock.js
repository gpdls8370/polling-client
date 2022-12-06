import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {navigation_id, type_color, type_font} from './Constants';
import Icon from 'react-native-vector-icons/Entypo';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';
import {showToast, toastType} from './ToastManager';

function BattleBlock({
  navigation,
  postId, //'bid_5'
  //posterId, //'빛나는 참새'
  timeLeft,
  userCount,
  textA,
  textB, //["selectionId' : 'sid_13' "text" : '옵션1'
}) {
  const [uuid] = useRecoilState(uuidState);

  var availText;
  if (timeLeft > 0) {
    availText = '진행중';
  } else {
    availText = '종료됨';
  }

  return (
    <>
      <View style={styles.block}>
        <TouchableOpacity
          onPress={() => {
            if (uuid == null) {
              showToast(toastType.error, '로그인이 필요합니다.');
            } else {
              navigation.navigate(navigation_id.battlePost, {
                postId: postId,
                timeLeft: timeLeft,
                userCount: userCount,
                textA: textA,
                textB: textB,
              });
            }
          }}>
          <ImageBackground
            style={[
              {
                width: '100%',
                height: '100%',
                borderRadius: 30,
                overflow: 'hidden',
                elevation: 6,
              },
              timeLeft <= 0 && {opacity: 0.8},
            ]}
            source={
              timeLeft > 0
                ? require('../../assets/images/BattleImage.png')
                : require('../../assets/images/BattleImage_unavail.png')
            }>
            <View style={styles.circleBlock}>
              <View style={styles.clickCircle}>
                <Text style={styles.text}>{textA.text}</Text>
              </View>
              <View style={styles.clickCircle}>
                <Text style={styles.text}>{textB.text}</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={styles.dataBlock}>
        <Text style={[styles.dataText, {backgroundColor: type_color.battle}]}>
          {availText}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    marginHorizontal: 25,
    marginTop: 20,
    marginBottom: 20,
    marginVertical: 10,
    height: 132,
    borderRadius: 30,
  },
  box: {
    borderRadius: 30,
  },
  circleBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clickCircle: {
    borderRadius: 45,
    backgroundColor: 'white',
    width: 95,
    height: 90,
    marginHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 23,
    fontFamily: type_font.cafe24,
    color: 'black',
    textAlign: 'center',
  },
  dataBlock: {
    flexDirection: 'row',
    position: 'absolute',
    marginLeft: 15,
    marginTop: 5,
  },
  dataText: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    paddingTop: 3,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 20,
    fontFamily: type_font.ggodic80,
    color: 'white',
  },
  goBlock: {position: 'absolute', marginLeft: 325, marginTop: 123},
});

export default BattleBlock;
