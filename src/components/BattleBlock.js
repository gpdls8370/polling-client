import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import {navigation_id, type_color, type_font} from './Constants';
import Icon from 'react-native-vector-icons/Entypo';

function BattleBlock({
  navigation,
  postId, //'bid_5'
  //posterId, //'빛나는 참새'
  timeLeft,
  userCount,
  selection, //["selectionId' : 'sid_13' "text" : '옵션1'
}) {
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
          onPress={() =>
            navigation.navigate(navigation_id.battlePost, {
              navigation: navigation,
              postId: postId,
              timeLeft: timeLeft,
              userCount: userCount,
              selection: selection,
            })
          }>
          <ImageBackground
            style={[
              {
                width: '100%',
                height: '100%',
                borderRadius: 30,
                overflow: 'hidden',
                borderWidth: 1,
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
                <Text style={styles.text}>{selection[0].text}</Text>
              </View>
              <View style={styles.clickCircle}>
                <Text style={styles.text}>{selection[1].text}</Text>
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
      {timeLeft > 0 ? (
        <View
          style={[
            styles.goBlock,
            {backgroundColor: 'white', borderRadius: 45},
          ]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navigation_id.battlePost, {
                navigation: navigation,
                postId: postId,
                timeLeft: timeLeft,
                userCount: userCount,
                selection: selection,
              })
            }>
            <Icon
              name={'arrow-with-circle-right'}
              size={50}
              color={type_color.gray}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    marginHorizontal: 20,
    marginTop: 30,
    marginVertical: 10,
    height: 135,
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
    width: 90,
    height: 90,
    marginHorizontal: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontFamily: type_font.cafe24,
    color: 'black',
  },
  dataBlock: {
    flexDirection: 'row',
    position: 'absolute',
    marginLeft: 15,
    marginTop: 10,
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
