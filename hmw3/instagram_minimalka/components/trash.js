//  {this.getLogin(this.state.nick)}
          
        //  {console.log("data: ", this.state.data)}
          
         // <FlatList data={this.state.data} renderItem={this.renderPhoto}/>
          
          
          <FlatList 
            data={this.state.data} 
            renderItem={this.renderPhoto} 
          />
          <FlatList 
            data={this.state.data} 
            renderItem={this.renderPhoto}
            keyExtractor={item => item.node.thumbnail_src}
          />
          
          <FlatList
            data={this.state.data}
            renderItem={({item}) => <Image style={{width: 200, height: 100, flex: 1, }}
                                      source={{uri: item.node.display_url}}
                                      keyExtractor={item => item.node.display_url}
                                  />}
          />
          
          <FlatList
            data={this.state.data}
            renderItem={({item}) => <Image style={{width: 200, height: 100, flex: 1, }}
                                      source={{uri: item.node.display_url}}
                                  />}/>
          
           <Image style={{width: 200, height: 100, flex: 1, }}
                source={{uri: this.state.data[0].node.display_url}}
                keyExtractor={item => item.node.display_url}
                />}
          />
         