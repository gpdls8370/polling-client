import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import {type_color} from "./Constants";

function MakePollInputTag() {

    return (
        <View style={styles.titleView}>
            <Text style={styles.titleText}>{display_text['title']}</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}

                    placeholder={display_text['hint']}
                    keyboardType="default"
                />
                <Pressable
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>{ display_text['recommend_button'] }</Text>
                </Pressable>
            </View>

            <View style={styles.pressableView}>
                <Pressable
                    style={styles.pressable}
                >
                    <Text style={styles.buttonText}>동물</Text>
                </Pressable>

                <Pressable
                    style={styles.pressable}
                >
                    <Text style={styles.buttonText}>일상</Text>
                </Pressable>

                <Pressable
                    style={styles.pressable}
                >
                    <Text style={styles.buttonText}>로스트아크</Text>
                </Pressable>

                <Pressable
                    style={styles.pressable}
                >
                    <Text style={styles.buttonText}>KPOP</Text>
                </Pressable>

                <Pressable
                    style={styles.pressable}
                >
                    <Text style={styles.buttonText}>웹툰</Text>
                </Pressable>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    titleView: {
        padding: 15,
    },
    inputView: {
        flexDirection: 'row',
    },
    pressableView: {
        marginTop: 10,
        marginBottom: 7,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    titleText: {
        textAlign: "left",
        textAlignVertical: "center",
        marginHorizontal: 5,
        fontSize: 20,
        fontFamily: 'BMJUA_ttf',
        color: 'black',
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
    buttonText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 17,
        fontFamily: 'BMJUA_ttf',
        color: 'white',
    },
    button: {
        alignSelf: 'center',
        textAlignVertical: 'center',
        height: 35,
        width: 95,
        borderRadius: 10,
        marginStart: 13,
        paddingHorizontal: 9,
        paddingVertical: 8,
        elevation: 2,
        backgroundColor: type_color.makePoll,
    },
    pressable: {
        borderRadius: 14,
        paddingHorizontal: 9,
        paddingVertical: 4,
        marginRight: 21,
        elevation: 2,
        backgroundColor: type_color.disablePressableButton,
    },
});

const display_text = {
    title: '주제 태그 입력',
    hint: '직접 검색',
    recommend_button: '태그 추천',
};

export default MakePollInputTag;
