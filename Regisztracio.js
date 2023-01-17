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

  async getFelhasznalok() {
    try {
      const response = await fetch('http://192.168.6.19:3000/felhasznalok');
      const json = await response.json();
      console.log(json)
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }
  componentDidMount() {
    this.getFelhasznalok()
  }
  regisztracio = () => {
    let egyezes = 0;
    var adatok = {
      bevitel1: this.state.regisztralfelh,
      bevitel2: this.state.regisztraljelsz,
    };
    this.state.data.map((item) => {
      if (item.felhasznalonev == this.state.regisztralfelh) {
        egyezes = +1
      }
    })
    if (egyezes > 0) {
      alert("A Felhasználónév már használatban van!")
      this.setState({ regisztralfelh: "" })
      this.setState({ regisztraljelsz: "" })
    }
    else {
      try {
        const response = fetch('http://192.168.6.19:3000/regisztracio', {
          method: "POST",
          body: JSON.stringify(adatok),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
      } catch (err) {
        alert("Sikertelen feltöltés");
        this.setState({ regisztralfelh: "" })
        this.setState({ regisztraljelsz: "" })
      } finally {
        this.props.navigation.navigate('Bejelentkezes')
        alert("Sikeres feltöltés");
        this.setState({ regisztralfelh: "" })
        this.setState({ regisztraljelsz: "" })
      }
    }
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