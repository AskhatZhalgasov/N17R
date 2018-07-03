import React, { Component } from 'react';
import {
  FlatList,
  CheckBox,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';

const drawBorder = (color = 'black', width = 2) => ({ borderWidth: width, borderColor: color});

const styles = {
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  info: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '000',
  },
}

class TickPeople extends React.Component {
  
  state = {
    involvedFriends: ["You"]
  }
  
  handleClick = person => {
    person.item.clicked = !person.item.clicked
  };
  renderPrint = (person) => {
    console.log("person: ", person)
    return (
      <View>
        <TouchableOpacity onPress={() => this.handleClick(person)}>
          <Text style={styles.info}>
            {person.item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
   return (
      <View> 
        <FlatList
          data={this.props.listOfFriends}
          renderItem={this.renderPrint}
        />
        <Text> 
          len: {this.props.listOfFriends.length}
        </Text>
      </View>
    );
  }
}

export default TickPeople;
