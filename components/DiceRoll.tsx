import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity } from 'react-native';
import Dice from './Dice';


export default function DiceRoll({onRollFinished}) {
    const [currentNumber, setCurrentNumber] = useState(1);
    const [amountDiced, setAmountDiced] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        setAmountDiced(amountDiced+1);
        if(amountDiced > 10) {
            clearInterval(intervalId);
            onRollFinished(currentNumber);
            setIntervalId(null);
        }
    }, [currentNumber]);

    const onDiceTouched = () => {
        if(intervalId === null) {
            setAmountDiced(0);

            const newIntervallID = setInterval(() => {
                setCurrentNumber(Math.floor(Math.random() * 6) + 1);
            }, 150);
            setIntervalId(newIntervallID);
        }
    }

    return (
        <TouchableOpacity onPress={onDiceTouched}>
            <Dice currentNumber={currentNumber} diceSize={150}></Dice>
        </TouchableOpacity>
    );
}