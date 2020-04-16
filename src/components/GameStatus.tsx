import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GameInfo } from '../models/GameInfo-interface';
import { gameState } from '../models/gameState';
import { Button } from 'react-native-elements';
import { Player } from '../models/Player-interface';

export default function GameStatus({playersInvolved, setPlayers, currGameState, gameMode, setGameStat, players, setGameInfo, setCurrentPlayer}) {
  let drinkMessage = '';
  if(gameMode === 'hard') {
    drinkMessage = 'und muss/müssen die Augenzahl trinken';
  }
  let textStatus = '';
  switch(currGameState) {
    case gameState.firstWinner: 
      textStatus = playersInvolved[0].name + ' ist dran mit Würfeln und muss versuchen die höchste Augenzahl zu werfen';
      break; 

    case gameState.firstWinnerfound: 
      textStatus = playersInvolved[0].name + ' hat die erste Runde gewonnen und muss nochmal würfeln, diese Zahl muss von den anderen getroffen werden';
      break;

    case gameState.winnersNumber: 
      textStatus = playersInvolved[0].name + ' ist dran und muss ' + playersInvolved[1].currentNumber + ' treffen';
      break;

    case gameState.tryHitWinner: 
      if(gameMode === 'easy') {
        drinkMessage = 'und alle anderen müssen 1 Schluck trinken';
      }
      if(gameMode === 'medium') {
        drinkMessage = 'und alle anderen müssen ihre Augenzahlen trinken';
      }
      textStatus = playersInvolved[0].name + ' und ' + playersInvolved[1].name + ' haben gewonnen';
      break;

    case gameState.restart: 
      if(gameMode === 'easy') {
        drinkMessage = 'und alle anderen müssen 1 Schluck trinken';
      }
      if(gameMode === 'medium') {
        drinkMessage = 'und alle anderen müssen ihre Augenzahlen trinken';
      }
      textStatus = playersInvolved[0].name + ' und ' + playersInvolved[1].name + ' haben gewonnen';
      break;
    


  } 
  return (
       <View style={styles.container}>
        <Text allowFontScaling={false} style={styles.statusText}>Game Status</Text>
        <Text allowFontScaling={false} style={styles.statusText}>{textStatus}</Text>
        <Text allowFontScaling={false} style={styles.statusText}>{drinkMessage}</Text>
        {
          (currGameState === gameState.tryHitWinner || currGameState === gameState.restart) &&
            <Button type="clear" title='nächste Runde' onPress={() => {
              setCurrentPlayer(0);
              setGameStat(gameState.firstWinner);
              setGameInfo(gameState.firstWinner);
              players.forEach((player: Player) => {
                 player.hisTurn = false;
                 player.isActive = true;
                 player.isWinner = false;
              });
              players[0].hisTurn = true;
              setPlayers([...players]);
            }
            }/>
        }
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
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



