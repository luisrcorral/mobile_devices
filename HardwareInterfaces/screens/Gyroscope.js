import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Gyroscope } from 'expo';

const Value = ({name, value}) => (
    <View style={styles.valueContainer}>
      <Text style={styles.valueName}>{name}:</Text>
      <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
    </View>
  )

export default class GyroscopeInterface extends React.Component {
    state = {
      gyroscopeData: {}, // Storage for the gyroscope data.
    }
  
    // Start the subscription
    componentDidMount(){
      this._toggle();
    }
  
    componentWillUnmount(){
      this._unsubscribe();
    }
  
    // function to toggle on or off.
    _toggle = () => {
      if (this._subscription) {
        this._unsubscribe();
      } else {
        this._subscribe();
      }
    }
  
    // Subscribe for updates to the gyroscope.
    _subscribe = () => {
      this._subscription = Gyroscope.addListener(gyroscopeData => { // callback that is invoked when a gyroscope update is available.
        this.setState({ gyroscopeData });
      });
    }
  
    // Unsubscribe the listener.
    _unsubscribe = () => {
      this._subscription && this._subscription.remove();
      this._subscription = null;
    }
  
    render() {
      let { x, y, z } = this.state.gyroscopeData;
  
      return (
        <View style={styles.container}>
          <Value name="x" value={ round(x) } />
          <Value name="y" value={ round(y) } />
          <Value name="z" value={ round(z) } />
          <View>
            <Button
              title="Toggle"
              onPress={ this._toggle }
            />
          </View>
        </View>
      );
    }
  }

  // Round the values to two decimals.
  function round(n) {
    if (!n) {
      return 0;
    }
    return Math.floor(n * 100) / 100;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    valueContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    valueValue: {
      width: 200,
      fontSize: 20
    },
    valueName: {
      width: 50,
      fontSize: 20,
      fontWeight: 'bold'
    },
  });