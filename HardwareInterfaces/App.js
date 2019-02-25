import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import GyroscopeInterface from './screens/Gyroscope';
import CameraInterface from './screens/Camera';

// Home screen
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>Hardware Interfaces</Text>
        <Text>Use the tabs below to move between screens.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
});

// Stack of screens in a Bottom Tab navigator
const TabNavigator = createMaterialBottomTabNavigator({
  Home: HomeScreen,
  Gyroscope: GyroscopeInterface,
  Camera: CameraInterface
}, {
  initialRouteName: 'Home',
  activeColor: '#f0edf6',
  inactiveColor: '#738290',
  barStyle: { backgroundColor: '#15181B' },
});

const AppContainer = createAppContainer(TabNavigator);

// Renders the stack navigator
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
