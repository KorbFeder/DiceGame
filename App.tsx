import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import DiceRoll from './components/DiceRoll';
import BeerMug from './components/BeerMug';

export default function App() {
  const onRollFinished = (result: number) => {
    console.log('number is: ' + result);
  }
  return (
    <View style={styles.container}>
      <View style={styles.beerStatus}>
        <BeerMug percentageFilled={90}></BeerMug>
        <BeerMug percentageFilled={90}></BeerMug>
        <BeerMug percentageFilled={90}></BeerMug>
        <BeerMug percentageFilled={90}></BeerMug>
        <BeerMug percentageFilled={90}></BeerMug>
        <BeerMug percentageFilled={90}></BeerMug>
        <BeerMug percentageFilled={90}></BeerMug>
      </View>
      <DiceRoll onRollFinished={onRollFinished}></DiceRoll>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
  },
  beerStatus: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
