import React, { Component } from 'react';
import { Image, FlatList, Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { TextInput } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#E6E6FA',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

const ScreenNames = ["Menu", "Info"]

const makeRequest = username => {
  const path = `https://apinsta.herokuapp.com/u/${username}`
  return fetch(path)
}

class App extends React.Component {
  state = {
    currentScreen: "Menu",
    nick: "",
    name: "",
    data: []
  }
  
  changeScreen = (name1) => {
    this.setState({
      currentScreen: name1,
      name: ""
    })
  }
  
  handleChangeText = text => {
    this.setState({
      nick: text,
      name: text
    })
  }
  
  handleClick = () => {
    if (this.state.nick != "") {
      this.getLogin(this.state.nick)
      this.changeScreen("Info")  
    } else {
      alert("Enter the username!!!")
    }
  }
  
  handleBack = () => {
    this.setState({
      nick: "",
      name: "",
      data: []
    })
    this.changeScreen("Menu")
  }
  
  getLogin = async (username) => {
    try {
      const response = await makeRequest(username)
      const result = await response.json()
      const cutted = result.graphql.user.edge_owner_to_timeline_media.edges
      console.log(cutted[0])
      this.setState({
        data: cutted
      })
    } catch(error) {
      alert("incorrect username!!!")
      console.log(error)
    }
  }
  
  renderPhoto = ({item}) => {
    return <Image
          style={{ width: 150, height: 200 }}
          source={{
            uri: item.node.thumbnail_src
          }}
        />
  }
  
  render() {
    if (this.state.currentScreen == "Menu") {
      return (
        <View style={styles.container}> 
          <Image
            style={{ width: 200, height: 200, alignSelf: 'center'}}
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1024px-Instagram_logo_2016.svg.png',
            }}
            align="middle"
          />
          <TextInput
            label={"Find profile"}
            value={this.state.name}
            onChangeText={this.handleChangeText}
          />
          <Button
            onPress={() => this.handleClick()}
            title="Find"
            color='blue'
          />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
        
          <Text>
            ---------INFO----------- 
            {"\n"}
            Login: {this.state.nick}
          </Text>
          
          <FlatList
            data={this.state.data}
            numColumns={3}
            renderItem={this.renderPhoto}
          />
          
          <Button
            onPress={this.handleBack}
            title="Back"
            color='red'
          />
          
        </View>
      )
    }
  }
}

export default App;