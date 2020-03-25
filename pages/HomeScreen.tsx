import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({navigation}) {
    return (
        <View>
            <Text> hallo welt </Text>
            <Button title="Go to Details" onPress={() => navigation.navigate('Game')}/>
        </View>
    );
}