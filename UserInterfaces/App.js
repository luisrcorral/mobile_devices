import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// Home screen
class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = { inputText: '' }; // State that holds text input value
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.text }>Home Screen</Text>
        <TextInput
          style={ styles.text_input }
          placeholder = "Enter text here"
          onChangeText = { data => this.setState({ inputText: data })} // Set state to the value entered as input
        />
        <Button
          title="Go to Second screen"
          onPress={() => {
              this.props.navigation.navigate('Second', { // Go to specified screen
              inputText: this.state.inputText, // Pass this parameter (text input) when navigating
            });
          }}
        />
      </View>
    );
  }
}

// Second screen
class SecondScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const inputText = navigation.getParam('inputText', 'Placeholder'); // Name of parameter expected to receive and a default value if not available

    return (
      <View style={ styles.container }>
        <Text style={ styles.text }>Second Screen</Text>
        <Text>Text Input from Home screen: { JSON.stringify(inputText) }</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()} // Goes back to previous screen
        />
      </View>
    );
  }
}

// Stack of screens
const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
    Second: SecondScreen,
  },
  {
    initialRouteName: 'Home', // Initial screen
  }
);


//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
  },
  text_input:{
    textAlign: 'center',
    fontSize: 16,
  }
});

const AppContainer = createAppContainer(MainStack);

// Renders the stack navigator
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
