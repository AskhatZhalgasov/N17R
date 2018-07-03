import React, { Component } from 'react';
import {
  Button,
  CheckBox,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import { TextInput } from 'react-native-paper';
import ListFriends from './components/listFriends';
import AddFriend from './components/AddFriend';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    flexDirection: 'column',
  },
  mainWindow: {
    margin: 10,
    marginTop: Constants.statusBarHeight,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  menuInfo: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '000',
  },
  text: {
    margin: 5,
    fontSize: 20,
    textAlign: 'center',
    color: '000',
  },
  info: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '000',
  },
  infoForEvent: {
    fontSize: 20,
    margin: 10,
    color: '000',
  },
  flatView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const ScreenNames = ['Menu', 'AddFriend', 'FriendInfo', 'Event'];

class App extends React.Component {
  state = {
    currentScreen: 'Menu',
    debt: 0,
    own: 0,
    friend: 0,
    bill: 0,
    listOfFriends: [],
    involvedFriends: ['You'],
    whoPaid: 0,
    description: '',
    amount: 0,
  };

  changeScreen = name => {
    this.setState({
      currentScreen: name,
    });
  };

  handleClick = friend => {
    this.setState({
      friend: friend,
    });
    this.changeScreen('FriendInfo');
  };

  handleAddFriend = name => {
    const item = {
      name: name,
      balance: 0,
      events: [],
    };
    this.setState({
      listOfFriends: [...this.state.listOfFriends, item],
    });
    this.changeScreen('Menu');
  };

  handleSaveBill = () => {
    if (this.state.involvedFriends.length == 1) {
      alert('Select friends');
      return;
    }
    if (this.state.whoPaid === '') {
      alert('Select the person who is paying');
      return;
    }
    if (this.state.amount === 0 || this.state.description === '') {
      if (this.state.amount === 0 && this.state.description === '') {
        alert('Please fill the fields');
      } else {
        if (this.state.amount === 0) {
          alert('Please enter the amount');
        } else {
          alert('Please fill the description');
        }
      }
      this.setState({
        amount: 0,
        description: '',
      });
      return;
    }

    let amountInt = this.state.amount;
    let individualAmount = amountInt / this.state.involvedFriends.length;
    individualAmount = Math.floor(individualAmount);

    // let newList = this.state.listOfFriends
    if (this.state.whoPaid == 'You') {
      this.setState({
        own: this.state.own + amountInt - individualAmount,
      });

      const newList = this.state.listOfFriends.map(friend => {
        if (this.state.involvedFriends.includes(friend.name)) {
          let answer = friend;
          const obj = {
            amount: -individualAmount,
            name: this.state.description,
          };
          answer.balance = answer.balance - individualAmount;
          answer.events = [...answer.events, obj];
          return answer;
        } else {
          return friend;
        }
      });
    } else {
      this.setState({
        debt: this.state.debt + individualAmount,
      });

      const newList = this.state.listOfFriends.map(friend => {
        if (friend.name == this.state.whoPaid) {
          // let answer = friend
          const obj = {
            amount: individualAmount,
            name: this.state.description,
          };
          // answer.events = [...answer.events, obj]
          // answer.balance = answer.balance + individualAmount
          return {
            ...friend,
            events: [...friend.events, obj],
            balance: friend.balance + individualAmount,
          };
        } else {
          return friend;
        }
      });
    }

    this.setState({
      whoPaid: '',
      description: '',
      amount: 0,
      listOfFriends: newList,
      involvedFriends: ['You'],
    });
    this.changeScreen('Menu');
  };

  handleClickedPerson = person => {
    if (!this.state.involvedFriends.includes(person.item.name)) {
      this.setState({
        involvedFriends: [...this.state.involvedFriends, person.item.name],
      });
    } else {
      this.setState({
        involvedFriends: this.state.involvedFriends.filter(
          friend => friend != person.item.name
        ),
      });
    }
  };

  renderPrint = person => {
    console.log('person: ', person);
    return (
      <View>
        <TouchableOpacity onPress={() => this.handleClickedPerson(person)}>
          <Text style={styles.info}>{person.item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderPrintInvolved = person => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ whoPaid: person.item })}>
          <Text style={styles.info}>{person.item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderPrintEvent = event => {
    if (event.item.amount > 0) {
      return (
        <View style={styles.flatView}>
          <Text style={styles.infoForEvent}>{event.item.name}</Text>
          <Text style={styles.infoForEvent}>
            You borrowed: {event.item.amount}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.flatView}>
        <Text style={styles.infoForEvent}>{event.item.name}</Text>
        <Text style={styles.infoForEvent}>You lent: {-event.item.amount}</Text>
      </View>
    );
  };

  handleBack = () => {
    this.setState({
      description: '',
      amount: '',
      whoPaid: '',
      involvedFriends: ['You'],
    });
    this.changeScreen('Menu');
  };

  render() {
    if (this.state.currentScreen == 'Menu') {
      return (
        <View style={{ marginTop: Constants.statusBarHeight }}>
          <Text style={styles.mainWindow}>Splitwise</Text>
          <Text style={styles.menuInfo}>
            you owe: {this.state.debt}
            {'\n'} you are owed: {this.state.own}
            {'\n'} total balance: {this.state.own - this.state.debt}
          </Text>
          <ListFriends
            listOfFriends={this.state.listOfFriends}
            handleClick={this.handleClick}
          />
          <Button
            onPress={() => this.changeScreen('AddFriend')}
            title="Add Friend"
            color="green"
          />
          <Button
            onPress={() => this.changeScreen('Event')}
            title="Add Event"
            color="blue"
          />
        </View>
      );
    }
    if (this.state.currentScreen == 'AddFriend') {
      return (
        <View style={{ marginTop: Constants.statusBarHeight }}>
          <Text style={styles.mainWindow}>New Friend</Text>
          <AddFriend onAddFriend={this.handleAddFriend} />
          <Button onPress={this.handleBack} title="Back" color="red" />
        </View>
      );
    }
    if (this.state.currentScreen == 'FriendInfo') {
      return (
        <View
          style={{
            flex: 1,
            marginTop: Constants.statusBarHeight,
          }}>
          <Text style={styles.mainWindow}> {this.state.friend.name} </Text>
          {this.state.friend.events.length === 0 && (
            <Text style={styles.info}>No history yet</Text>
          )}
          <FlatList
            data={this.state.friend.events}
            renderItem={this.renderPrintEvent}
          />
          <Button onPress={this.handleBack} title="Back" color="red" />
        </View>
      );
    }
    if (this.state.currentScreen == 'Event') {
      return (
        <View>
          <Text style={styles.mainWindow}> Event </Text>
          <Text style={styles.text}> Involved Friends: {'\n'}</Text>

          {this.state.listOfFriends.length == 0 && (
            <Text style={styles.text}>No friends yet</Text>
          )}
          <FlatList
            data={this.state.listOfFriends}
            renderItem={this.renderPrint}
          />

          <Text style={styles.text}> Who paid? </Text>

          <FlatList
            data={this.state.involvedFriends}
            renderItem={this.renderPrintInvolved}
          />

          {this.state.whoPaid != '' && (
            <Text style={{ fontSize: 15 }}>
              {' '}
              Who is paying: {this.state.whoPaid}
            </Text>
          )}

          <TextInput
            label={'Enter the description'}
            value={this.state.description}
            onChangeText={text => this.setState({ description: text })}
          />

          <TextInput
            label={'Enter the amount'}
            value={this.state.amount}
            type="number"
            onChangeText={text => this.setState({ amount: text })}
          />

          <Button onPress={this.handleSaveBill} title="Add" color="blue" />

          <Button onPress={this.handleBack} title="Back" color="red" />
        </View>
      );
    }
  }
}

export default App;
