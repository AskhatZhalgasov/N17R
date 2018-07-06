import React from 'react';
import { KeyboardAvoidingView, FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import {TextInput,
  Card,
  CardActions,
  CardContent,
  CardCover,
  Button,
  Title,
  ListSection,
  ListItem, 
  Paragraph} from 'react-native-paper';
import gql from "graphql-tag";
import {Mutation} from 'react-apollo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CREATE_RECIPE = gql`
  mutation createRecipe($title: String!, $shortDescription: String!, $description: String!, 
    $instructions: [String!]!, $ingredients: [String!]!) {
    createRecipe(title: $title, shortDescription: $shortDescription, description: $description,
    ingredients: $ingredients, instructions: $instructions) {
      id
    }
  }
`;

export default class AddReceiptScreen extends React.Component {

    static navigationOptions = {
      title: "Add new recipe",
    };

    state = {
      title: "",
      shortDescription: "",
      currentIngredient: "",
      currentInstruction: "",
      description: "",
      instructions: [],
      ingredients: [],
    };

    renderItem = ({item: now}) => (
      <ListItem 
          title={now} 
      />
    )

    handleAddIngredient = () => {
      if (this.state.currentIngredient != '') {
          const tmp = this.state.currentIngredient;
          this.setState({
            currentIngredient: "",
            ingredients: [...this.state.ingredients, tmp],
          })
      }
    }

    handleAddInstruction = () => {
      if (this.state.currentInstruction != '') {
          const tmp = this.state.currentInstruction;
          this.setState({
            currentInstruction: "",
            instructions: [...this.state.instructions, tmp],
          })
      }
    }

    render() {
      return (
        <KeyboardAwareScrollView enableOnAndroid={true} enableAutomaticScroll={true} extraHeight={50} extraScrollHeight={50}>
              <Mutation mutation={CREATE_RECIPE}>
              {(createRecipe, {data, loading, error}) => (
                <View>
                  <Card>
                    <CardContent>
                        <TextInput
                          label="Recipe title"
                          value={this.state.title}
                          onChangeText={text=>this.setState({title: text})}
                        />
                        <TextInput
                          label="Recipe description"
                          value={this.state.description}
                          onChangeText={text=>this.setState({description: text})}
                        />
                        <TextInput
                          label="Recipe shortDescription"
                          value={this.state.shortDescription}
                          onChangeText={text=>this.setState({shortDescription: text})}
                        />
                    </CardContent>
                  </Card>
                  <ListSection title="Ingredients">
                    <FlatList
                        data={this.state.ingredients}
                        renderItem={this.renderItem}
                    />
                  </ListSection>
                  <Card>
                    <CardContent>
                        <TextInput
                          label="Enter the ingredient!"
                          value={this.state.currentIngredient}
                          onChangeText={text=>this.setState({currentIngredient: text})}
                        />
                    </CardContent>
                    <CardActions>
                      <Button
                        onPress={this.handleAddIngredient}
                        color="green"
                      > Add Ingredient
                      </Button>
                    </CardActions>
                  </Card>
                  <ListSection title="Instructions">
                    <FlatList
                        data={this.state.instructions}
                        renderItem={this.renderItem}
                    />
                  </ListSection>
                  <Card>
                    <CardContent>
                        <TextInput
                          label="Enter the instruction!"
                          value={this.state.currentInstruction}
                          onChangeText={text=>this.setState({currentInstruction: text})}
                        />
                    </CardContent>
                    <CardActions>
                      <Button
                        onPress={this.handleAddInstruction}
                        color="green"
                      > Add Instruction
                      </Button>
                    </CardActions>
                  </Card>
                  <Button
                      onPress={() => {
                        if (this.state.title != '') {
                          createRecipe({
                            variables: {
                              title: this.state.title,
                              shortDescription: this.state.shortDescription,
                              description: this.state.description,
                              ingredients: this.state.ingredients,
                              instructions: this.state.instructions
                            }
                          })   
                        }
                        this.props.navigation.goBack();
                      }}
                      color="green"
                  > Save
                  </Button>  
                </View>
              )}
              </Mutation>      
        </KeyboardAwareScrollView>
      )
    }
  }