import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity } from 'react-native';


const cupHeight: number = 100;
const cupWidth: number = cupHeight * 0.735;

export default function BeerMug({percentageFilled}) {
    return (
            <View style={styles.container}>
                <View style={styles.handle}></View>
                <View style={[styles.beer, {height: percentageFilled + '%'}]}></View>
            </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(230, 230, 230, 1.0)',
        marginRight: 0.3 * cupWidth,
        marginLeft: 0.03 * cupWidth,
        marginBottom: 0.05 * cupHeight,
        marginTop: 0.05 * cupHeight,
        width: cupWidth,
        height: cupHeight,
        position: 'relative',
        borderColor: 'lightgrey',
        borderWidth: 0.06 * cupWidth,
        borderStyle: 'solid',
        borderTopColor: 'transparent',
        borderRadius: 0.06 * cupWidth / 2,
    },
    handle: {
        top: 0.22 * cupWidth,
        position: 'absolute',
        right: -0.28 * cupWidth,
        width: 0.28 * cupWidth,
        height: 0.45 * cupHeight,
        borderWidth: 0.06 * cupWidth,
        borderStyle: 'solid',
        borderColor: 'lightgrey',
        borderRadius: 0.06 * cupWidth

    },
    beer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        borderTopColor: 'rgba(246, 246, 227, 1.0)',
        borderTopWidth: 0.2 * cupHeight,
        borderStyle: 'solid',
        backgroundColor: '#f28e1c',
    }
});