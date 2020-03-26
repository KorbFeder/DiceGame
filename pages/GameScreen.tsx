import React from 'react';
import { StyleSheet, View } from 'react-native';
import PlayerStatus from '../components/PlayerStatus';
import DiceRoll from '../components/DiceRoll';

export default function GameScreen() {
  const onRollFinished = (result: number) => {
    console.log('number is: ' + result);
  }
  return (
      <View style={styles.container}>
        <PlayerStatus playerName={"Korbi"} beerNr={1} cupFilled={80} currentNumber={1}></PlayerStatus>
        <DiceRoll onRollFinished={onRollFinished}></DiceRoll>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(119, 140, 255)',
  },
});



