import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import {type_font} from './Constants';
import {useRecoilState} from 'recoil';

function VoteItemBattle({postId, textA, textB, onPressVote, select}) {
  return (
    <View style={styles.block}>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={
          select == 'A'
            ? image.selectA
            : select == 'B'
            ? image.selectB
            : image.idle
        }>
        <View style={styles.cicleBlock}>
          <TouchableOpacity
            style={styles.clickCircle}
            onPress={() => {
              onPressVote(textA.selectionId, 'A');
            }}>
            <Text style={styles.text}>{textA.text}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clickCircle}
            onPress={() => {
              onPressVote(textB.selectionId, 'B');
            }}>
            <Text style={styles.text}>{textB.text}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 145,
  },
  cicleBlock: {
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
    marginHorizontal: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontFamily: type_font.cafe24,
    color: 'black',
  },
});

const image = {
  idle: require('../../assets/images/BattleImage.png'),
  selectA: require('../../assets/images/BattleA.png'),
  selectB: require('../../assets/images/BattleB.png'),
};

export default VoteItemBattle;
