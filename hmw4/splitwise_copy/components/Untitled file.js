  <View style={styles.container}>
        <CheckBox
          vallue={person.clicked} 
          onPress={() => this.handleClick(person)}
        />
        <Text>{person.name}</Text>
      </View>
      
      <FlatList
        data={this.props.listOfFriends}
        renderItem={this.renderItem}
      />