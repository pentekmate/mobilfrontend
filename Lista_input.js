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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DialogInput from "react-native-dialog-input";

export default class Listaad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      listaelem: "",
      listanev: "",
      termekektomb: [
        { id: 1, megnevezes: "Cukor", isChecked: false },
        { id: 2, megnevezes: "Liszt", isChecked: false },
        { id: 3, megnevezes: "Kenyér", isChecked: false },
        { id: 4, megnevezes: "Kávé", isChecked: false },
      ],
      visible: false,
      setVisible: false,
      bevittadat: "",
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
    // alert(this.state.listanev)
    if (tartalom.length == 0) {
      alert("Nincs semmi a listában");
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
    };
    try {
      const response = fetch('http://pentek-mate-miklos.dszcbaross.tk/tartalomfel', {
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

  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@lista", jsonValue);
    } catch (e) {}
  };

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@lista");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {}
  };

  componentDidMount() {
    this.getData().then((vissza_adatok2) => {
      
      this.setState({ data: vissza_adatok2 });
    });
  }
  felvitel = () => {
    var x = this.state.data.length;

    let uj = [];
    if (this.state.listaelem != null) {
      uj = this.state.data;
    }
    uj.push({
      id: x,
      megnevezes: this.state.listaelem,
      isChecked: false,
    });

    this.setState({ data: uj });
    this.storeData(uj);
    this.state.listaelem = "";
  };
  mindentorles = () => {
    this.setState({ data: [] });
    this.storeData([]);

    this.state.termekektomb.map((product) => {
      product.isChecked = false;
    });
    this.state.listanev = "";
    this.state.listaelem = "";
  };

  handleChange = (id) => {
    let temp = this.state.termekektomb.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }

      return product;
    });
    let x = this.state.data.length;
    let uj = [];

    this.setState({ termekektomb: temp });
    let nev = this.state.termekektomb.map((product) => {
      if (id === product.id && product.isChecked == false) {
        if (this.state.listaelem != null) {
          uj = this.state.data;
        }
        uj.push({
          id: x,
          megnevezes: product.megnevezes,
          isChecked: false,
        });

        this.setState({ data: uj });
        this.storeData(uj);
      }
    });
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, flexDirection: "column", marginTop: 10 }}>
        {/*----------------------------LISTAELNEVEZÉSE,MENTÉSE-------------------- */}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 2, backgroundColor: "yellow" }}>
              <TouchableOpacity onPress={this.adatatad}>
                <Text style={styles.mentes}>Mentés</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <DialogInput
            isDialogVisible={this.state.visible}
            message={"Nevezed el a listádat!"}
            submitInput={(text) => {
              this.submit_atad(text);
            }}
            closeDialog={() => this.setState({ visible: false })}
          ></DialogInput>
        </View>

        {/*----LISTÁBA TÖLTÉS INPUTTAL---*/}
        <View style={{ flex: 1, backgroundColor: "lime" }}>
          <View
            style={{
              width: 300,
              borderWidth: 1,
              borderColor: "purple",
              borderRadius: 5,
              alignSelf: "center",
            }}
          >
            <TextInput
              style={{ height: 40 }}
              placeholder="Hozzáad!"
              onChangeText={(szoveg) => this.setState({ listaelem: szoveg })}
              value={this.state.listaelem}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 5, backgroundColor: "red" }}>
              <TouchableOpacity style={styles.button} onPress={this.felvitel}>
                <Text style={styles.gomb}>Hozzáad</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 5, backgroundColor: "yellow" }}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.mindentorles}
              >
                <Text style={styles.gomb}>Minden törlése</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/*----FELSŐ CHECKBOX ELEMEI----*/}
        <View style={{ flex: 1 }}>
          <FlatList
            index={0}
            data={this.state.termekektomb}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  width: width * 0.5,
                  margin: 5,
                }}
              >
                <Pressable onPress={() => this.handleChange(item.id)}>
                  <MaterialCommunityIcons
                    name={
                      item.isChecked
                        ? "checkbox-marked"
                        : "checkbox-blank-outline"
                    }
                    size={24}
                    color="#000"
                  />
                </Pressable>
                <Text>{item.megnevezes}</Text>
              </View>
            )}
          />
        </View>
        {/*----lISTA ELEMEINEK MUTATÁSA----*/}
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.liladoboz}>
                <Text>
                  {item.id},{item.megnevezes}
                </Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  liladoboz: {
    borderColor: "purple",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  gomb: {
    width: width * 0.4,
    textAlign: "center",
    alignSelf: "center",
    backgroundColor: "lightblue",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
  },

  child: {
    width: width,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
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
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    width: width * 0.2,
    height: 40,
    textAlignVertical: "center",
  },
});
