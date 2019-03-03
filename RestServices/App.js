import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){
    return fetch('https://jsonplaceholder.typicode.com/users') // url to fetch from
    .then((response) => response.json()) // convert response to json
    .then((responseJson) => { // the json response is now referenced by 'responseJson'
      this.setState({
        dataSource: responseJson, // set a new state (dataSource) with the response from the fetch
      }, function(){

      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.header }>Users</Text>
        <FlatList
          data={ this.state.dataSource } // indicate data to render for the list
          renderItem={({item}) => // how the data is going to render. item references each object in the json array
            <View style={ styles.list }>
              <Text>Name: { item.name }</Text>
              <Text>Username: { item.username }</Text>
            </View>
          }
          keyExtractor={({id}, index) => id.toString()} // extract a unique key for a given item at the specified index
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontWeight: 'bold',
    fontSize: 40
  },
  list: {
    paddingBottom: 5
  }
});
