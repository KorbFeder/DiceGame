import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import PlayerStatus from '../components/PlayerStatus';
import DiceRoll from '../components/DiceRoll';
import GameStatus from '../components/GameStatus';
import { ScrollView } from 'react-native-gesture-handler';
import {Player} from '../models/Player-interface';
import GameService from '../services/GameService';
import { gameState } from '../models/gameState';
import { GameInfo } from '../models/GameInfo-interface';

export default function GameScreen({route, navigation}) {
  const sipPercentage: number = 100 / route.params.sips;
  const gameMode: string = route.params.gameMode;
  
  const [currentPlayer, setCurrentPlayer] = useState<number | undefined>(0);
  const [players, setPlayers] = useState<Player[] | undefined>(route.params.allPlayers);
  const [currGameState, setGameState] = useState(gameState.firstWinner);
  const [gameInfo, setGameInfo] = useState<GameInfo | undefined>({currGameState: gameState.firstWinner, playersInvolved: players});

  const gameService: GameService = new GameService(currentPlayer, setCurrentPlayer, players, 
    setPlayers, currGameState, setGameState, sipPercentage, gameMode);

  useEffect(() => {
    players[0].hisTurn = true;
    setPlayers([...players])
  }, []);

  const onRollFinished = (result: number) => {
    const info = gameService.executeGame(result);
    setGameInfo(info);
  }

  return (
      <View style={styles.container}>
        <GameStatus players={players} setPlayers={setPlayers} setGameStat={setGameState} playersInvolved={gameInfo.playersInvolved} currGameState={gameInfo.currGameState} gameMode={gameMode}></GameStatus>
        <ScrollView>
          {
            players.map((player: Player) => {
              return (
                <PlayerStatus 
                  key={player.pkey}
                  pkey={player.pkey} 
                  name={player.name} 
                  beerNr={player.beerNr} 
                  cupFilled={player.cupFilled} 
                  currentNumber={player.currentNumber} 
                  hisTurn={player.hisTurn} 
                  isActive={player.isActive}
                  isWinner={player.isWinner}
                ></PlayerStatus>
              );
            })
          }
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



