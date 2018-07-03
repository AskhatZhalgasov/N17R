import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { TextInput } from 'react-native-paper';

class AddFriend extends React.Component {
  
  state = { 
    name: ''
  };
  
  handleChangeText = text => {
    this.setState({name: text})
  }
  
  handleClick = () => {
    if (this.state.name != '') {
      this.props.onAddFriend(this.state.name)
    } else {
      alert("Enter the name!!!")
    }
    this.setState({name: ''})
  }
  render() {
    return (
      <View>
        <TextInput
          style={{
            margin: 15
          }}
          label={"Enter the name"}
          value={this.state.name}
          onChangeText={this.handleChangeText}
        />
        <Button
            onPress={this.handleClick}
            title="Add"
            color='blue'
          />
      </View>
    )
  }
}

export default AddFriend;