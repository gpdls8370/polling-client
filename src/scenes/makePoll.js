import React from 'react';
import {Button, ScrollView, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import TopBar from '../components/TopBar';
import {type_color, type_id} from "../components/Constants";
import MakePollModeSelector from "../components/MakePollModeSelector";

function makePoll({navigation}) {
    const onClickPolling = () => {
        //TODO 구현
    };
    const onClickBalance = () => {
        //TODO 구현
    };
    const onClickBattle = () => {
        //TODO 구현
    };

  return (
    <SafeAreaView style={styles.block}>
      <TopBar navigation={navigation} type={type_id.makePoll} />
        <MakePollModeSelector onClickPoling={onClickPolling} onClickBalance={onClickBalance} onClickBattle={onClickBattle} />
        <View style={[styles.border]} />
        <ScrollView style={styles.scrollView}>
        <View style={styles.block}>
            <Text>투표 생성 컴포넌트들 들어갈 자리</Text>
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        justifyContent: 'center',
    },
    scrollView: {
        marginHorizontal: 20,
    },
    border: {
        backgroundColor: type_color.border,
        borderWidth: 0.3,
    },
});


export default makePoll;
