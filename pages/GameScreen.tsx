import React from 'react';
import { StyleSheet, View } from 'react-native';
import PlayerStatus from '../components/PlayerStatus';
import DiceRoll from '../components/DiceRoll';
import GameStatus from '../components/GameStatus';
import { ScrollView } from 'react-native-gesture-handler';

export default function GameScreen() {
  const onRollFinished = (result: number) => {
    console.log('number is: ' + result);
  }
  return (
      <View style={styles.container}>
        <GameStatus></GameStatus>
        <ScrollView>
          <PlayerStatus playerName={"Korbi"} beerNr={1} cupFilled={80} currentNumber={1} hisTurn={false} isActive={true}></PlayerStatus>
          <PlayerStatus playerName={"Korbi"} beerNr={1} cupFilled={80} currentNumber={1} hisTurn={false} isActive={false}></PlayerStatus>
          <PlayerStatus playerName={"Korbi"} beerNr={1} cupFilled={80} currentNumber={1} hisTurn={false} isActive={false}></PlayerStatus>
          <PlayerStatus playerName={"Korbi"} beerNr={1} cupFilled={80} currentNumber={1} hisTurn={true} isActive={false}></PlayerStatus>
          <PlayerStatus playerName={"Korbi"} beerNr={1} cupFilled={80} currentNumber={1} hisTurn={false} isActive={false}></PlayerStatus>
          <PlayerStatus playerName={"Korbi"} beerNr={1} cupFilled={80} currentNumber={1} hisTurn={false} isActive={true}></PlayerStatus>
          <PlayerStatus playerName={"Korbi"} beerNr={1} cupFilled={80} currentNumber={1} hisTurn={false} isActive={false}></PlayerStatus>
        </ScrollView>
        <View style={styles.diceContainer}>
          <View style={styles.dice}>
            <DiceRoll onRollFinished={onRollFinished}></DiceRoll>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(119, 140, 255)',
  },
  diceContainer: {
    backgroundColor: 'rgb(119, 140, 255)',
    height: 160
  },
  dice: {
    backgroundColor: 'rgb(119, 140, 255)',
    position: 'absolute',
    bottom: 0,
    left: '50%', 
    marginLeft: -75,
    marginTop: 5,
    marginBottom: 5,
  }
});



