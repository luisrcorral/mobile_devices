import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component { // Main class
  render() { // Returns some JSX to render
    return (
      <View style={styles.container}>
        <Text style={styles.text}>HelloWorld!</Text>
      </View>
    );
  }
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
  }
});
