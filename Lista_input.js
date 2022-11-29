import React, { Component} from 'react';
import { Button, StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Listaad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      listaelem:"",
    };
  }
 /*-*/

  
  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@lista', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@lista')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
    
    }
  }

  componentDidMount() {
    this.getData().then(vissza_adatok2=>{ 
      console.log(vissza_adatok2)
      this.setState({data:vissza_adatok2}) 
    })

    

  }
  felvitel=()=>{
     var x=this.state.data.length
    
      let uj=[]
      if(this.state.listaelem!=null)
      {
        uj=this.state.data
      }
      uj.push({
        "id":x,
        "megnevezes":this.state.listaelem,
        "isChecked":false
       
      })
      
      this.setState({data:uj})
      this.storeData(uj)
     
 
  }
  mindentorles=()=>{
    this.setState({ data : []})
    this.storeData([])
  }
  
 
  

  render() {
    return (
      <View style={styles.container}>
      
      
      <View style={{width:300,borderWidth:1,borderColor:"purple",borderRadius:5,alignSelf:"center"}} >
      <TextInput
        style={{height: 40}}
        placeholder="Hozzáad!"
        onChangeText={szoveg => this.setState({listaelem : szoveg})}
        value={this.state.listaelem}
      />       
        </View>
 
 

      <Button title="Hozzáad"
      onPress={this.felvitel}></Button>
       <Button title="torles"
      onPress={this.mindentorles}></Button>
      <View style={{flexDirection:"row",marginTop:20,marginBottom:20}}>
        <View style={{flex:1}}> 
        <Text style={{margin:0}}>            
        </Text>                          
        </View>
      </View>
      <FlatList
            data={this.state.data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.liladoboz}   >
                 
                <Text>{item.id},{item.megnevezes}</Text>
                </View>
                 )}
                />
        
         
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
marginTop:50
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  liladoboz:{
    borderColor:"purple",
    borderWidth:1,
    margin:10,
    padding:10,
    borderRadius:5
  }



});