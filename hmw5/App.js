import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import DetailScreen from './components/DetailScreen';
import AddReceiptScreen from './components/AddReceiptScreen';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailScreen,
    AddReceipt: AddReceiptScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjj6oyuva0me60183ukmxnnms'
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootStack/>
      </ApolloProvider>
    )
  } 
}