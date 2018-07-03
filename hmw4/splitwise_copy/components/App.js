import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

const styles = StyleSheet.create ({
  container: {
    marginTop: Constants.statusBarHeight
  }
})

const ScreenNames = ["Menu", "FriendInfo", "Event"]

class App extends Component {
  state = {
    balance: 0,
    currentScreen: "Menu"
  }
  
  
  render() {
    return (
      (1 && <View style = {styles.container}> 
        <Text>
          Hello World
        </Text>
        <Text>
          Your balance: {this.state.balance}
        </Text>
      </View>),
      (1 && <View style = {styles.container}> 
        <Text>
          New Menu    
        </Text>
      </View>)
    )
  }
}

export default App;