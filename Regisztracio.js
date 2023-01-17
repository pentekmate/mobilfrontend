import React, { Component } from 'react';
import { ChildComponent, FlatList, Text, StyleSheet, View, TextInput, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

export default class Regisztracio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      regisztralfelh: "",
      regisztraljelsz: ""

    };
  }
  regisztracioellen=()=>{
    let x=0;
    let ures=0
    this.state.data.map((item)=>
    {
      if(item.felhasznalo_nev==this.state.regisztralfelh)
      {
       x+=1
        
      }
    
    })
      if(this.state.regisztralfelh.length==0||this.state.regisztraljelsz.length==0)
      {
        ures+=1
        alert("Üresen hagyott Felhasználónév/jelszó")
      }
      if(x>0||ures>0)
      {
        alert("Nem megfelelő adatok!")
      }
      else{
        try{
        var bemenet={
          bevitel1:this.state.regisztralfelh,
          bevitel2:this.state.regisztraljelsz
        }
        fetch("http://192.168.1.173:3000/regisztracio", {
          method: "POST",
          body: JSON.stringify(bemenet),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        }
      )
    }
    catch(e){console.log(e)}
    finally{
      this.props.navigation.navigate('Bejelentkezes')
      alert("Sikeres regisztráció")
    }
    }
   

  }
  componentDidMount() {
   
  }
  regisztracio = () => {
    fetch('http://192.168.1.173:3000/felhasznalok'    )
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        data: responseJson,
      }
      , function(){
      });
    }).then(this.regisztracioellen)
    
  }




  render() {
    return (
      <View
        style={{ flexDirection: 'column', flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'red' }} />
        <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <View style={{ margin: 10, width: 380 }}>
            <TextInput
              style={{ borderColor: "black", borderWidth: 2 }}
              placeholder="Felhasználónév"
              onChangeText={(felhasznalonev_szoveg) => this.setState({ regisztralfelh: felhasznalonev_szoveg })}
              value={this.state.regisztralfelh}>

            </TextInput>
          </View>
          <View style={{ margin: 10, width: 380 }}>
            <TextInput
              style={{ borderColor: "black", borderWidth: 2 }}
              placeholder="Jelszó"
              secureTextEntry={true}
              onChangeText={(jelszoszoveg) => this.setState({ regisztraljelsz: jelszoszoveg })}
              value={this.state.regisztraljelsz}>

            </TextInput>

          </View>
          <Button
            color="#841584"
            onPress={this.regisztracio} title="Regisztrálok" />
        </View>
        <View style={{ flex: 1, backgroundColor: 'green' }} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "blue",
    width: 180
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});