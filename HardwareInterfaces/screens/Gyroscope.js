import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Gyroscope } from 'expo';

const Value = ({name, value}) => (
    <View style={styles.valueContainer}>
      <Text style={styles.valueName}>{name}:</Text>
      <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
    </View>
  )

export default class GyroscopeInterface extends React.Component {
    state = {
      gyroscopeData: {},
    }
  
    componentDidMount(){
      this._toggle();
    }
  
    componentWillUnmount(){
      this._unsubscribe();
    }
  
    _toggle = () => {
      if (this._subscription) {
        this._unsubscribe();
      } else {
        this._subscribe();
      }
    }
  
    _slow = () => {
      Gyroscope.setUpdateInterval(1000); 
    }
  
    _fast = () => {
      Gyroscope.setUpdateInterval(16);
    }
  
    _subscribe = () => {
      this._subscription = Gyroscope.addListener(gyroscopeData => {
        this.setState({ gyroscopeData });
      });
    }
  
    _unsubscribe = () => {
      this._subscription && this._subscription.remove();
      this._subscription = null;
    }
  
    render() {
      let { x, y, z } = this.state.gyroscopeData;
  
      return (
        <View style={styles.container}>
          <Text>Gyroscope</Text>
          <Value name="x" value={x} />
          <Value name="y" value={y} />
          <Value name="z" value={z} />
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