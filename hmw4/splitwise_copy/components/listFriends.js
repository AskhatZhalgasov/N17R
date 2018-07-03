import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';

const styles = StyleSheet.create ({
  container: {
    marginTop: Constants.statusBarHeight,
    margin: 10,
    color: '000',
  },
  friendInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '000',
  },
})

class ListFriends extends React.Component {

  click = friend => {
    this.props.handleClick(friend)
  }
  
  renderPrint = (friend) => {
    if (friend.balance === 0) {
      return (
        <View>
          <TouchableOpacity onPress={() => this.click(friend)}>
            <Text style={styles.info}>{friend.name} {friend.balance == 0 ? "no expenses" : friend.balance} </Text>
          </TouchableOpacity>
        </View>
      )  
    } else {
      if (friend.balance > 0) {
        return (
          <View style>
            <TouchableOpacity onPress={() => this.click(friend)}>
              <Text style={styles.info}>{friend.name} you owe: {-friend.balance} </Text>
            </TouchableOpacity>
          </View>
        )
      } else {
        return (
          <View>
            <TouchableOpacity onPress={() => this.click(friend)}>
              <Text style={styles.info}>{friend.name} you are owed: {-friend.balance} </Text>
            </TouchableOpacity>
          </View>
        )  
      }
      
    }
    
  }
  
  render() {
    return (
      <View>
        {this.props.listOfFriends.length == 0 && <Text style={styles.info}>You don't have friends</Text>}
        {this.props.listOfFriends.map(friend => this.renderPrint(friend))}
      </View>
    )
  }
}

export default ListFriends;