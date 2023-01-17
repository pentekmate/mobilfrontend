import React, { Component } from 'react';
import { ChildComponent, FlatList, Text, StyleSheet, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      felhasznalonev: "",
      jelszo: "",
      felhasznalonevtovabb: ""
    };
  }
  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@felhasznalo', jsonValue)
    } catch (e) {
      // saving error
    }
  }
  async getFelhasznalok() {
    try {
      const response = await fetch('http://192.168.6.19:3000/felhasznalok');
      const json = await response.json();
      this.state.data = json
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
    console.log(this.state.data)
  }
  componentDidMount() {
    this.getFelhasznalok()
  }
  bejelentkezes = () => {
    let talalt = 0;
    let nemtalalt = 0;
    this.state.data.map((item) => {
      if (item.felhasznalo_nev == this.state.felhasznalonev && item.felhasznalo_jelszo == this.state.jelszo) {
        talalt += 1
      }
      else {
        nemtalalt += 1
      }
    })
    if (talalt > 0) {
      this.storeData(this.state.felhasznalonev)

      this.props.navigation.navigate('Home');

    }
    else {
      alert("Nem egyező jelszó/felhasználónév")
    }

  }



  render() {
    return (
      <View
        style={{ flexDirection: 'column', flex: 1 }}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <View style={{ margin: 10 }}>
            <TextInput
              style={{ borderColor: "black", borderWidth: 2 }}
              placeholder="Felhasználónév"
              onChangeText={(felhasznalonev_szoveg) => this.setState({ felhasznalonev: felhasznalonev_szoveg })}
              value={this.state.felhasznalonev}>

            </TextInput>
          </View>
          <View style={{ margin: 10 }}>
            <TextInput
              style={{ borderColor: "black", borderWidth: 2 }}
              placeholder="Jelszó"
              secureTextEntry={true}
              onChangeText={(jelszoszoveg) => this.setState({ jelszo: jelszoszoveg })}
              value={this.state.jelszo}>

            </TextInput>
          </View>

          <View style={{ margin: 10 }}>
            <Button onPress={this.bejelentkezes} title="Bejelentkezés" />
          </View>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontSize: 20, margin: 10 }}>Nincs létrehozva fiókod?</Text>
          <View style={{ margin: 10 }}><Button title="Fiók létrehozása" onPress={() => this.props.navigation.navigate('Regisztráció')}></Button></View>

        </View>
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
