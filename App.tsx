import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import DiceRoll from './components/DiceRoll';

export default function App() {
  const onRollFinished = (result: number) => {
    console.log('number is: ' + result);
  }
  return (
    <View style={styles.container}>
      <DiceRoll onRollFinished={onRollFinished}></DiceRoll>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
