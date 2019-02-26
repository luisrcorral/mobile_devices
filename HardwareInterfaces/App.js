import React from 'react';
import { StyleSheet, View, Button, Vibration } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import GyroscopeInterface from './screens/Gyroscope';
import CameraInterface from './screens/Camera';

const DURATION = 1000; // Duration in ms.

class VibrationInterface extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <Button
          title="Vibrate"
          onPress={() => Vibration.vibrate(DURATION)} // Vibrate for the specified duration. In iOS you can't modify the duration, its always 500ms.
        />
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

// Stack of screens in a Material Bottom Tab navigator
const TabNavigator = createMaterialBottomTabNavigator({
  Vibration: VibrationInterface,
  Gyroscope: GyroscopeInterface,
  Camera: CameraInterface
}, {
  initialRouteName: 'Vibration',
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
