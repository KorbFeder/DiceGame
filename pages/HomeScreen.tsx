import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const iconSize = 70;

export default function HomeScreen({navigation}) {
    return (
        <ImageBackground style={styles.backgroundImage} source={require('../assets/beerAndDice.jpg')}>
            <Text style={styles.headline}>
                SCHWALLWÜRFELN
            </Text>
            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Selection')}>
                    <View style={styles.menuCycle}>
                        <Icon name="user" size={iconSize} color='white'></Icon>
                    </View>
                    <Text style={styles.menuText}>NORMALES SPIEL</Text>
                    <Text style={styles.menuText}>(nur 1 Smartphone)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButton} onPress={() => console.log('settings')}>
                    <View style={styles.menuCycle}>
                        <Icon name="cog" size={iconSize} color='white'></Icon>
                    </View>
                    <Text style={styles.menuText}>EINSTELLUNGEN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButton} onPress={() => console.log('multi')}>
                    <View style={styles.menuCycle}>
                        <Icon name="users" size={iconSize} color='white'></Icon>
                    </View>
                    <Text style={styles.menuText}>MULTI (nicht verfügbar)</Text>
                    <Text style={styles.menuText}>(mehrere Smartphone)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButton} onPress={() => console.log('info')}>
                    <View style={styles.menuCycle}>
                        <Icon name="info" size={iconSize} color='white'></Icon>
                    </View>
                    <Text style={styles.menuText}>INFORMATIONEN</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    menuButton: {
        flex: 1,
        minWidth: '43%',
        minHeight: '43%',
        backgroundColor: 'rgb(0, 162, 211)',
        opacity: 0.9,
        marginLeft: 8,
        marginBottom: 8,
        marginTop: 8,
        marginRight: 8,
        elevation: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonGroup: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',

        width: '100%',
        height: '50%',
        position: 'absolute',
        bottom: 0
    },
    menuText: {
        color: 'white',
        opacity: 0.9,
    },
    menuCycle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
 
        borderRadius: 50,
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 3,
        width: iconSize * 1.5,
        height: iconSize * 1.5,
        opacity: 0.9,
    },
    headline: {
        padding: 7,
        fontSize: 35,
        color: 'white',
        marginTop: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
    }
});