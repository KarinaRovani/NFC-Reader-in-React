/* eslint-disable no-undef */
import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AppNfc from './pages/ReadNfc';

const Stack = createStackNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Ler Tags" onPress={() => navigation.navigate('AppNfc')} />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{title: 'Leitor de NFC'}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen 
          options={{title: 'Lista de Produtos'}}
          name="AppNfc" 
          component={AppNfc}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#F5F5f5',
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  Button: {
    height: 60,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 25,
    marginTop: 250,
    marginHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
