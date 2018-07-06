import React from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuInfo: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

import {TextInput,
    Card,
    CardActions,
    CardContent,
    CardCover,
    Title,
    ListSection,
    ListItem,
    Paragraph} from 'react-native-paper'
import { width } from 'window-size';

export default class DetailScreen extends React.Component {

    static navigationOptions = {
        title: "Info",
    };

    renderItem = ({item: recipe}) => (
        <ListItem 
            title={recipe} 
        />
    )

    render() {
      const current = this.props.navigation.getParam("item");
      return (
        <ScrollView>
            <View>
            <Text style={styles.menuInfo}>
                {current.title} 
            </Text>
                <Card>
                    <CardCover 
                        style={{ width: 200, height: 200}}
                        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1024px-Instagram_logo_2016.svg.png'}}/>
                    <CardContent>
                        <Text>
                            Description: {current.description} 
                        </Text>
                    </CardContent>
                </Card>
                <ListSection title="Instructions updated">
                    <FlatList
                        data={current.instructions}
                        renderItem={this.renderItem}
                    />    
                </ListSection>
                <ListSection title="Ingredients">
                    <FlatList
                        data={current.ingredients}
                        renderItem={this.renderItem}
                />    
                </ListSection>
            </View>
        </ScrollView>
      )
    }
  }
