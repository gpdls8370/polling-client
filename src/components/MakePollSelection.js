import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

function MakePollSelection() {

    return (
        <View style={styles.titleView}>
            <View >
                <Text style={styles.titleText}>{display_text['title']}</Text>
            </View>
            <View >

                <TextInput
                    style={styles.input}
                    placeholder={display_text['hint']}
                    keyboardType="default"
                />
                <TextInput
                    style={styles.input}
                    placeholder={display_text['hint']}
                    keyboardType="default"
                />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder={display_text['hint']}
                        keyboardType="default"
                    />
                    <Image
                        source={require('../../assets/images/minus-circle.png')}
                        style={styles.icon}
                    />
                </View>

                <Image
                    source={require('../../assets/images/plus-circle.png')}
                    style={styles.icon}
                />

            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    titleView: {
        padding: 15,
    },
    titleText: {
        textAlign: "left",
        textAlignVertical: "center",
        marginHorizontal: 5,
        fontSize: 20,
        fontFamily: 'BMJUA_ttf',
        color: 'black',
    },
    inputView: {
        flexDirection: 'row',
    },
    input: {
        flexDirection: 'row',
        flex: 1,
        textAlign: 'left',
        textAlignVertical: 'top',
        multiline: true,
        width: 'auto',
        height: 45,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#B1B1B1',
        padding: 15,
        fontFamily: 'BMJUA_ttf',
    },
    icon: {
        width: 28,
        height: 28,
        alignSelf: 'center',
        textAlignVertical: 'center',
        marginHorizontal: 5,
        marginTop: 10,
    },
});

const display_text = {
    title: '선택지 입력',
    hint: '내용',
};

export default MakePollSelection;
