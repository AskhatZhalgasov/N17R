import { createStackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const RootStack = createStackNavigator({
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home', 
  }
}) 

<View>
            <TouchableOpacity 
                style={styles.recipeList}
                onPress={() => this.handleClick(recipe)}>
                <Text style={styles.text}>
                    {recipe.title}
                </Text>
                <Text style={styles.text}>
                    {recipe.shortDescription}
                </Text>
            </TouchableOpacity>
        </View>


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
                        this.props.navigation.goBack();
                      }}
                      color="green"
                  > Save
                  </Button>  
            </View>