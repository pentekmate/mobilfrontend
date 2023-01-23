import React, { Component } from 'react';
import { ChildComponent, FlatList, Text, StyleSheet, View, TextInput, Button, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { ipcim } from "./IPcim";
const IP = require('./IPcim')

export default class Regisztracio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      regisztralfelh: "",
      regisztraljelsz: "",
      rosszjelszo: false,
      rosszfelhasznalonev: false,
      fokusz: false,
      fokusz1: false
    };
  }
  regisztracioellen = () => {
    let x = 0;
    let ures = 0
    let specialis = 0;
    var pattern = new RegExp(
      /[A-Z]/
    );
    this.state.data.map((item) => {
      if (item.felhasznalo_nev == this.state.regisztralfelh) {
        x += 1
      }
    })
    if (this.state.regisztralfelh.length == 0 || this.state.regisztraljelsz.length == 0) {
      alert("Üresen hagyott Felhasználónév/jelszó")
      this.setState({ rosszfelhasznalonev: true })
      this.setState({ rosszjelszo: true })
    }
    else {
      if (pattern.test(this.state.regisztraljelsz)) {
        specialis += 1

      }
      if (specialis < 1) {
        alert("Nem tartalmaz nagybetűt a jelszó!")
        console.log(specialis)
        this.setState({ rosszjelszo: true })
      }
      else if (this.state.regisztraljelsz.length < 5) {
        alert("Túl rövid jelszó!")
        this.setState({ rosszjelszo: true })
      }
      else if (x > 0 || ures > 0) {
        alert("Nem megfelelő adatok!")
        this.setState({ rosszfelhasznalonev: true })
        this.setState({ rosszjelszo: true })
      }
      else {
        try {
          var bemenet = {
            bevitel1: this.state.regisztralfelh,
            bevitel2: this.state.regisztraljelsz
          }
          fetch(IP.ipcim + "regisztracio", {
            method: "POST",
            body: JSON.stringify(bemenet),
            headers: { "Content-type": "application/json; charset=UTF-8" }
          }
          )
        }
        catch (e) { console.log(e) }
        finally {
          this.props.navigation.navigate('Bejelentkezes')
          alert("Sikeres regisztráció")
        }
      }
    }

  }
  componentDidMount() {

  }
  regisztracio = () => {
    fetch(IP.ipcim + 'felhasznalok')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
        }
          , function () {
          });
      }).then(this.regisztracioellen)

  }




  render() {
    return (
      <View style={{ flexDirection: 'column', flex: 1, }}>
        <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <View style={styles.divek}>
            <Text style={styles.szoveg}>Felhasználónév:</Text>
            <View style={[this.state.fokusz1 ? styles.felhaszmalodivfocus : styles.felhasznaloodiv, { backgroundColor: this.state.rosszfelhasznalonev ? "red" : "white" }]}>
              <FontAwesome style={{ marginLeft: 5 }} name="user" size={28} color="black" />
              <TextInput
               cursorColor={"rgb(50,50,50)"}
                onFocus={() => this.setState({ fokusz1: true })}
                onBlur={() => this.setState({ fokusz1: false })}
                style={styles.textinputfelh}
                placeholder="Felhasználónév"
                onChangeText={(felhasznalonev_szoveg) => this.setState({ regisztralfelh: felhasznalonev_szoveg })}
                onChange={() => this.setState({ rosszfelhasznalonev: false })}
                value={this.state.regisztralfelh}>
              </TextInput>
            </View>
          </View>
          <View style={styles.divek}>
            <Text style={styles.szoveg}>Jelszó:</Text>

            <View style={[this.state.fokusz ? styles.jelszodivfocus : styles.jelszodiv, { backgroundColor: this.state.rosszjelszo ? "red" : "white" }]}>
              <MaterialCommunityIcons name="lock" size={28} color="black" />
              <TextInput
               cursorColor={"rgb(50,50,50)"}
                onFocus={() => this.setState({ fokusz: true })}
                onBlur={() => this.setState({ fokusz: false })}
                style={styles.textinputjelsz}
                placeholder="Jelszó"
                secureTextEntry={true}
                onChangeText={(jelszoszoveg) => this.setState({ regisztraljelsz: jelszoszoveg })}
                onChange={() => this.setState({ rosszjelszo: false })}
                value={this.state.regisztraljelsz}>
              </TextInput>
            </View>
          </View>

        </View>
        <View style={{ flex: 2 }}>
          <View style={styles.buttondiv}>
            <Text style={{ alignSelf: "center", marginBottom: height * 0.01 }}>Van már fiókod?</Text>
            <Pressable onPress={() => this.props.navigation.navigate('Bejelentkezes')}
              style={{ alignSelf: "center", marginBottom: height * 0.03 }}>
              <Text style={{ fontSize: 18, color: '#01c29a' }}>Jelentkezz be!</Text></Pressable>


            <TouchableOpacity
              onPress={this.regisztracio}
              style={styles.regisztracio}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Regisztrálok</Text>
            </TouchableOpacity>
          </View>



        </View>
      </View>
    );
  }
};
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  buttondiv: {
    width: width * 0.9,
    alignSelf: "center",
    marginTop: height * 0.4,

  },
  divek: {
    width: width * 0.9,
    alignSelf: "center",
    marginTop: height * 0.04,

  },
  szoveg: {
    marginBottom: 10,
    alignSelf: "flex-start",
    fontSize: 20
  },
  textinputjelsz: {
    flex: 1,
    padding: 10,
    justifyContent: "center"
  },
  textinputfelh: {
    flex: 1,
    padding: 10,
    justifyContent: "center"
  },
  jelszodiv: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
  },
  jelszodivfocus: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 3,
    borderColor: '#01c29a',
    paddingBottom: 10,
  },
  felhasznaloodiv: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
  },
  felhaszmalodivfocus:
  {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 3,
    borderColor: '#01c29a',
    paddingBottom: 10,
  },
  regisztracio: {
    backgroundColor: '#202020',
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.9,
    height: height * 0.05,
    borderRadius: 10



  }
});