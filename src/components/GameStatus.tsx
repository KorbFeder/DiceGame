import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GameInfo } from '../models/GameInfo-interface';

export default function GameStatus({playersInvolved, currGameState}: GameInfo) {
  return (
      <View style={styles.container}>
        <Text style={styles.statusText}>Game Status</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 3,
    paddingRight: 3,
    marginTop: 30,
    marginBottom: 20, 
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  statusText: {
    color: 'rgb(152, 153, 161)',
  }
});



