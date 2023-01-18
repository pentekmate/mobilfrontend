import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DialogInput from "react-native-dialog-input";
import { Entypo } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';


export default class Listaad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertMutatasa: false,
      data: [],
      listanev: "",
      vissza_adatok2: [],
      termekektomb: [
        { id: 0, megnevezes: "Cukor", isChecked: false },
        { id: 1, megnevezes: "Liszt", isChecked: false },
        { id: 2, megnevezes: "Kenyér", isChecked: false },
        { id: 3, megnevezes: "Kávé", isChecked: false },
        { id: 4, megnevezes: "Cola", isChecked: false },
        { id: 5, megnevezes: "Wc-papír", isChecked: false },
      ],
      visible: false,
      setVisible: false,
      bevittadat: "",
      felhasznalonev: ""
    };
  }



  getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return year + "-" + month + "-" + date + ". napi lista";
  };
  adatatad = () => {
    var tartalom = [];
    this.state.data.map((item) => tartalom.push(item.megnevezes));
    if (tartalom.length == 0) {
      this.setState({ alertMutatasa: true })
    } else {
      this.setState({ visible: true });
    }
  };
  submit_atad = (input) => {
    var tartalom = [];
    this.state.data.map((item) => tartalom.push(item.megnevezes));
    this.state.listanev = input;
    var adatok = {
      bevitel1: this.state.listanev,
      bevitel2: tartalom,
      bevitel3: this.state.felhasznalonev
    };
    try {
      const response = fetch('http://192.168.1.173:3000/tartalomfel', {
        method: "POST",
        body: JSON.stringify(adatok),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
    } catch (err) {
      alert("Sikertelen feltöltés");
    } finally {
      alert("Sikeres feltöltés");
    }
    this.setState({ visible: false });
  };
  getData1 = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@felhasznalo')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }



  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@listaelemek')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }

  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@listaelemek', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  componentDidMount() {
    this.navFocusListener = this.props.navigation.addListener('focus', () => {
      this.getData().then((vissza_adatok2) => {
        this.setState({ data: vissza_adatok2 })
        //console.log(this.state.vissza_adatok2)
        console.log(this.state.data)
      });
      this.getData1().then((fh) => {
        this.setState({ felhasznalonev: fh })
        //console.log(this.state.vissza_adatok2)
        console.log(this.state.felhasznalonev)
      });
    });

  }
  componentWillUnmount() {
    this.navFocusListener();
  }

  mindentorles = () => {
    this.setState({ data: [] });
    this.storeData([]);

    this.state.termekektomb.map((product) => {
      product.isChecked = false;
    });
    this.state.listanev = "";
  };


  handleChange = (id, nev) => {
    var tomb = this.state.data;
    let temp = this.state.termekektomb.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }

      return product;
    });
    let x = this.state.data.length;
    this.setState({ termekektomb: temp });

    x = this.state.data.length
    this.state.termekektomb.map((termek) => {
      if (id === termek.id && termek.isChecked == false) {
        this.state.data.push({
          id: x,
          megnevezes: termek.megnevezes,
          isChecked: false,
        });
      }
      if (nev == termek.megnevezes && termek.isChecked == true) {
        let index = this.state.data.findIndex((item) => item.megnevezes == nev)
        console.log(this.state.data)
        if (index !== -1) {
          tomb.splice(index, 1);
          this.setState({ data: tomb });
          console.log(this.state.data)
        }
      }

    });

  };
  ListaelemTorles = (termeknev) => {
    console.log(this.state.data)
    let tomb = this.state.data
    let tomb1 = this.state.termekektomb
    //fenti checklist elemeinek vissza állítása------------
    this.state.termekektomb.map((termekvissza) => {
      if (termeknev == termekvissza.megnevezes) {
        termekvissza.isChecked = false
        this.setState({ termekektomb: tomb1 })
        //this.setState({ data: tomb1 });
      }
    })
    //

    this.state.termekektomb.map((termek) => {
      if (termeknev == termek.megnevezes) {
        let index = this.state.data.findIndex((item) => item.megnevezes == termeknev)
        if (index !== -1) {
          tomb.splice(index, 1);
          this.setState({ data: tomb });
        }
      }
    })
    this.state.data.map((termek) => {
      if (termeknev == termek.megnevezes) {
        let index = this.state.data.findIndex((item) => item.megnevezes == termeknev)
        if (index !== -1) {
          tomb.splice(index, 1);
          this.setState({ data: tomb });

        }
      }
    })
    this.storeData([])
    this.storeData(this.state.data)

  }
  render() {
    return (

      <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
        {/*----------------------------LISTAELNEVEZÉSE,MENTÉSE-------------------- */}
        <AwesomeAlert
          show={this.state.alertMutatasa}
          showProgress={false}
          title="Hiba"
          message="A listád üres!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          confirmText="OK"
          cancelText="Lista készítése"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.setState({ alertMutatasa: false });
          }}
          onCancelPressed={() => {
            this.setState({ alertMutatasa: false });
          }}
        />
  
        <View style={{ flexDirection: "row", backgroundColor: "rgb(18,18,18) ", flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: "rgb(18,18,18) " }}>
            <TouchableOpacity
              onPress={this.mindentorles}>
              <Text style={styles.mentes}>Törlés</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 4, alignItems: "center" }}>
            <View style={{ flexDirection: "row", backgroundColor: "rgb(18,18,18) ", flex: 1, }}>
              <View style={{ flex: 1, backgroundColor: "696969", justifyContent: "center" }}>
                <View style={styles.image}>
                  <Image
                    source={require('./feher-removebg-preview.png')}
                    style={{ width: 20, height: 20, left: -5 }}
                  />
                </View>
              </View>
              <View style={{ backgroundColor: "#116466", flex: 9, justifyContent: "center", borderRadius: 15 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Listalétrehozása')}
                  style={styles.textInputStyle} >
                  <Text style={{ fontStyle: "italic", color: "#f5fffa" }}>Termék keresése..</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "rgb(18,18,18) " }}>
            <TouchableOpacity onPress={this.adatatad}>
              <Text style={styles.mentes}>Mentés</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ backgroundColor: "brown" }}>
          <DialogInput
            isDialogVisible={this.state.visible}
            message={"Nevezed el a listádat!"}
            submitInput={(text) => {
              this.submit_atad(text);
            }}
            closeDialog={() => this.setState({ visible: false })}
          ></DialogInput>
        </View>
        {/*----FELSŐ CHECKBOX ELEMEI----*/}
        <View style={{ flex: 9, backgroundColor: "rgb(18,18,18) " }}>

          <FlatList
            //horizontal={true} 
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            getItemCount={this.get}
            style={{ marginTop: 100 }}
            index={0}
            data={this.state.termekektomb}
            renderItem={({ item }) => (
              <View
                style={styles.felsocheck}
              >
                <View style={styles.icon}>
                  <Pressable onPress={() => this.handleChange(item.id, item.megnevezes)}>
                    <MaterialCommunityIcons
                      name={
                        item.isChecked
                          ? "check"
                          : "plus"
                      }
                      size={24}
                      color="#black"
                    />
                  </Pressable>
                </View>
                <Text style={{ color: "#f5fffa", fontSize: 15 }}>{item.megnevezes}</Text>
              </View>
            )}
          />

        </View>
        {/*----lISTA ELEMEINEK MUTATÁSA----*/}
        <View style={{ flex: 9, backgroundColor: "rgb(18,18,18) ", paddingTop: height * 0.1 }}>
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => (
              <View style={styles.listatartalom}>

                <View style={{ flexDirection: "row", flex: 1 }}>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Entypo style={{ marginLeft: 10 }} name="shop" size={25} color="#f5fffa" />
                  </View>
                  <View style={{ flex: 13, justifyContent: "center" }}>
                    <Text style={{ color: "#f5fffa", marginLeft: 10 }}>{item.megnevezes}</Text>
                  </View>
                  <View style={styles.torlesgomb}>
                    <TouchableOpacity onPress={() => this.ListaelemTorles(item.megnevezes)}>
                      <MaterialCommunityIcons
                        name="delete"
                        size={24}
                        color="#black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>


            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  listatartalom: {
    backgroundColor: "#116466",
    height: height * 0.05,
    width: width * 1,
    alignSelf: "center",
    borderRadius: 15,
    margin: 10


  },
  text: { textAlign: "center", fontSize: 18 },
  listaneve: {
    height: 40,
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    width: width * 0.8,
  },
  mentes: {
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    // width: width * 0.2,
    textAlignVertical: "center",
  },
  textInputStyle: {
    textAlignVertical: "top",
    borderRadius: 15,
    textAlignVertical: "auto",
    width: width * 1
  },
  image: {
    backgroundColor: "#808080",
    width: 30,
    height: 55,
    justifyContent: "center",
    alignSelf: "flex-end",
    right: -10,
    alignItems: "center",
    borderRadius: 15

  }
  , felsocheck: {
    backgroundColor: "red",
    flexDirection: "row",
    width: width * 0.5,
    margin: 5,
    backgroundColor: "#116466",
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    color: "#f5fffa"
  },
  icon: {
    backgroundColor: "#ffcb9a",
    borderRadius: 50,
    margin: 5,
    marginRight: 10
  },
  torlesgomb:
  {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffcb9a",
    width: 30,


  }
});
