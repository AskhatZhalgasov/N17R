import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Button, ScrollView} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {TextInput,
    Card,
    CardActions,
    CardContent,
    CardCover,
    Title,
    ListSection,
    ListItem,
    Paragraph} from 'react-native-paper'
   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeList: {
    flex: 1, 
    flexDirection: "row",
    justifyContent: "space-between"
  }, 
  text: {
    fontSize: 20,
    margin: 10
  }
});

const GET_ALL_RECIPES = gql`
{
    allRecipes {
        id 
        title 
        shortDescription
        description
        instructions
        ingredients
    }
}
`;

export default class HomeScreen extends React.Component {

    static navigationOptions = {
      title: "CookBook",
    };

    handleClick = (recipe) => {
        this.props.navigation.navigate("Details", {item: recipe});
    }
    
    handleAdd = () => {
        this.props.navigation.navigate("AddReceipt");
    }

    renderItem = ({item: recipe}) => (
        <ListItem 
            title={recipe.title} 
            description={recipe.shortDescription} 
            onPress={() => this.handleClick(recipe)}
        />
    )

    render() {
      return (
        <ScrollView>
            <View>
                <Query query={GET_ALL_RECIPES}>
                    {({loading, data, error, refetch}) => (
                        loading 
                        ? <ActivityIndicator /> 
                        : (<FlatList
                            data={data ? data.allRecipes : []}
                            renderItem={this.renderItem}
                            refreshing={loading}
                            onRefresh={()=>refetch()}
                        />)  
                    )}
                </Query>
                <Button
                    onPress={this.handleAdd}
                    title="Add recipe"
                    color="blue"
                />   
            </View>
        </ScrollView>
      )   
    }
  }