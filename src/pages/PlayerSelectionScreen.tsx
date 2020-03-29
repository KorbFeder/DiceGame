import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, Alert } from 'react-native';
import { Input, Button, Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Player} from '../models/Player-interface';

export default function PlayerSelectionScreen({navigation}) {
    const [textValue, onValueChanged] = useState('');
    const [players, onPlayerChanged] = useState([]);
    const [playerKey, onPlayerKeyChanged] = useState(0);
    const [sliderVal, onSilderChanged] = useState(0.15);
    const [gameMode, onGameModeChanged] = useState('easy');

    return (
        <View style={styles.container}>
            <View style={[styles.card, {marginTop: 30}]}>
                <Text style={[styles.cardText, styles.cardTextHeadline]}>Spiel Modus</Text>
                <Picker 
                    selectedValue={gameMode}
                    style={[styles.picker, styles.cardText]}
                    onValueChange={(mode, index) => onGameModeChanged(mode)}
                >
                    <Picker.Item label="leicht (wenig Trinken)" value="easy"/>
                    <Picker.Item label="normal (normal viel Trinken)" value="medium"/>
                    <Picker.Item  label="geistig (viel Trinken)" value="hard"/>
                </Picker>
            </View>

            <View style={styles.card}>
                <Text style={[styles.cardText, styles.cardTextHeadline]}>Schlücke pro Getränk</Text>
                <Slider minimumTrackTintColor={'blue'} thumbTintColor={'teal'} value={sliderVal} onValueChange={(value) => onSilderChanged(value)}></Slider>
                <Text style={styles.cardText}>{Math.round(sliderVal * 100)}</Text>
            </View>

            <View style={styles.card}>
                <Text style={[styles.cardText, styles.cardTextHeadline]}>Spieler Hinzufügen</Text>
                <Input value={textValue} onChangeText={text => onValueChanged(text)} placeholder='Spieler Name' leftIcon={
                    <Icon style={{paddingRight: 15}} name="user" size={24} color='grey'></Icon>
                }/>
                <Button type="clear" title="Bestätigen" onPress={() => {
                    if(textValue !== '') {
                        const player: Player = {
                            name: textValue, 
                            pkey: playerKey, 
                            isActive: true, 
                            hisTurn: false,
                            beerNr: 1,
                            cupFilled: 100,
                            currentNumber: 1,
                            isWinner: false
                        }
                        onPlayerChanged([...players, player]);
                        onPlayerKeyChanged(playerKey + 1);
                        onValueChanged('');
                    }
                }}/>
           </View>

            <ScrollView>
            {
                players.map((player: Player) => {
                    return (
                        <View key={player.pkey} style={[styles.card, styles.player]}>
                            <Text style={styles.cardText}>{player.name}</Text>
                            <TouchableOpacity onPress={() => onPlayerChanged(players.filter(nplayer => nplayer.pkey !== player.pkey))}>
                                <Icon name="trash" color='rgb(152, 153, 161)' size={25}></Icon>
                            </TouchableOpacity>
                        </View>
                    );
                })
            }
            </ScrollView>

            <View style={[styles.footer, styles.card]}>
                <Button 
                    type="clear" 
                    title="Fertig" 
                    onPress={() => {
                        if(players.length >= 3) {
                            navigation.navigate('Game', { allPlayers: players, sips: Math.round(sliderVal * 100), gameMode: gameMode });
                        } else {
                            Alert.alert('Spieleranzahl', 'Bitte mindestens 3 Spieler hinzufügen');
                        }
                    }}
                ></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(119, 140, 255)',
    },
    picker: {
        height: 50,
        width: '100%'
    },
    card: {
        padding: 10,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 5
    },
    cardText: {
        color: 'rgb(152, 153, 161)',
        fontSize: 18,
        marginLeft: 'auto', 
        marginRight: 'auto', 
    },
    cardTextHeadline: {
        fontWeight: 'bold'
    },
    player: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '96%'
    }
});
