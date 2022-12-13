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
      filteredDataSource:["Articsóka",
            "Bimbós kel",
            "Brokkoli",
            "Burgonya (nyári)",
            "Burgonya (téli)",
            "Céklarépa",
            "Cikória",
            "Csicsóka",
            "Cukkini",
            "Édes kömény",
            "Endívia saláta",
            "Fejes saláta",
            "Fekete retek",
            "Fokhagyma",
            "Halványító zeller",
            "Jégcsapsaláta",
            "Káposzta",
            "Káposzta, savanyított",
            "Karalábé",
            "Karfiol",
            "Kelkáposzta",
            "Kínai kel",
            "Kukorica, tejes",
            "Mangold",
            "Olívabogyó",
            "Padlizsán",
            "Paradicsom",
            "Paraj (spenót)",
            "Pasztinák",
            "Patisszon",
            "Petrezselyem zöldje",
            "Petrezselyemgyökér",
            "Póréhagyma",
            "Rebarbara",
            "Retek, hónapos",
            "Sárgarépa",
            "Sóska",
            "Spárga",
            "Sütőtök",
            "Torma",
            "Tök, főző",
            "Uborka",
            "Újhagyma",
            "Vöröshagyma",
            "Zellergumó",
            "Zöldbab",
            "Zöldborsó",
            "Zöldpaprika",
            "Név",
            "Alma",
            "Ananász",
            "Banán",
            "Birsalma",
            "Citrom",
            "Cseresznye",
            "Csipkebogyó, friss",
            "Cukordinnye/sárgadinnye",
            "Datolya",
            "Egres",
            "Eper, fa",
            "Füge, friss",
            "Füge, szárított",
            "Gránátalma",
            "Grapefruit",
            "Görögdinnye",
            "Kajszibarack",
            "Kivi",
            "Körte",
            "Licsi",
            "Málna",
            "Mandarin",
            "Mangó",
            "Mazsola",
            "Meggy",
            "Mirabella",
            "Narancs",
            "Naspolya",
            "Nektarin",
            "Őszibarack",
            "Papaya",
            "Ribiszke, fekete",
            "Ribiszke, piros",
            "Szamóca, földieper",
            "Szeder",
            "Szilva, besztercei",
            "Szilva, vörös",
            "Szőlő",
            "Zöldringló","Aludttej",
            "Bivalytej",
            "Brick sajt",
            "Brie sajt",
            "Camembert sajt",
            "Cheddar sajt",
            "Cheshire sajt",
            "Colby sajt",
            "Edámi sajt",
            "Ementáli sajt",
            "Fagylalt",
            "Feta sajt",
            "Fontina sajt",
            "Főzőtejszín 10%-os",
            "Főzőtejszín 20%-os",
            "Gomolya sajt",
            "Gomolyatúró",
            "Gorgonzola sajt",
            "Gouda sajt",
            "Görög joghurt",
            "Gruyere sajt",
            "Habtejszín 30%-os",
            "Halloumi sajt",
            "Havarti sajt",
            "Író",
            "Jégkrém",
            "Joghurt",
            "Juhsajt",
            "Juhtej",
            "Juhtúró",
            "Kávétejszín",
            "Kecskesajt",
            "Kecsketej",
            "Kefir",
            "Kéksajt",
            "Köményes sajt",
            "Körözött",
            "Krémsajt",
            "Krémtúró",
            "Limburger sajt",
            "Márványsajt",
            "Mascarpone sajt",
            "Monterey sajt",
            "Mozzarella sajt",
            "Muenster sajt",
            "Neufchatel sajt",
            "Óvári sajt",
            "Pálpusztai sajt",
            "Parenyica sajt",
            "Parmezán sajt",
            "Provolone sajt",
            "Puding",
            "Ricotta sajt",
            "Rokfort sajt",
            "Romano sajt",
            "Sűrített tej",
            "Tehéntej (0,1%-os)",
            "Tehéntej (1,5%-os)",
            "Tehéntej (2,8%-os)",
            "Tehéntej (3,5%-os)",
            "Tehéntej (3,6%-os)",
            "Tehéntúró (félzsíros)",
            "Tehéntúró (sovány)",
            "Tejföl (12%-os)",
            "Tejföl (20%-os)",
            "Tejpor (sovány)",
            "Tejpor (zsíros)",
            "Tejszínhab",
            "Tilsiti sajt",
            "Trappista sajt",
            "Túró Rudi",
            "Vaj",
            "Vajkrém","Abonett",
            "Alföldi kenyér",
            "Bakonyi barna kenyér",
            "Briós",
            "Burgonyás kenyér",
            "Búzacsírás kenyér",
            "Búzakorpás kenyér",
            "Diós csiga",
            "Erzsébet kenyér",
            "Fánk",
            "Fehér kenyér",
            "Félbarna kenyér",
            "Francia kenyér",
            "Gofri",
            "Graham kenyér",
            "Kakaós csiga",
            "Kalács",
            "Kétszersült",
            "Kifli",
            "Kuglóf",
            "Kukoricás kenyér",
            "Lekváros bukta",
            "Lenmagos barnakenyér",
            "Magos kenyér",
            "Magvas barnakenyér",
            "Mazsolás kenyér",
            "Muffin",
            "Olasz kenyér",
            "Palacsinta",
            "Pirítós",
            "Piskótatekercs",
            "Pita (fehér lisztből)",
            "Pita (teljes kiőrlésű)",
            "Pogácsa (tepertős)",
            "Pogácsa (vajas)",
            "Pumpernickel",
            "Rozskenyér",
            "Teljes kiőrlésű kenyér",
            "Teljes kiőrlésű kifli",
            "Teljes kiőrlésű zsemle",
            "Tökmagos kenyér",
            "Túrós batyu",
            "Zabkorpás kenyér",
            "Zsemle",
      ],
      masterDataSource:["Articsóka",
            "Bimbós kel",
            "Brokkoli",
            "Burgonya (nyári)",
            "Burgonya (téli)",
            "Céklarépa",
            "Cikória",
            "Csicsóka",
            "Cukkini",
            "Édes kömény",
            "Endívia saláta",
            "Fejes saláta",
            "Fekete retek",
            "Fokhagyma",
            "Halványító zeller",
            "Jégcsapsaláta",
            "Káposzta",
            "Káposzta, savanyított",
            "Karalábé",
            "Karfiol",
            "Kelkáposzta",
            "Kínai kel",
            "Kukorica, tejes",
            "Mangold",
            "Olívabogyó",
            "Padlizsán",
            "Paradicsom",
            "Paraj (spenót)",
            "Pasztinák",
            "Patisszon",
            "Petrezselyem zöldje",
            "Petrezselyemgyökér",
            "Póréhagyma",
            "Rebarbara",
            "Retek, hónapos",
            "Sárgarépa",
            "Sóska",
            "Spárga",
            "Sütőtök",
            "Torma",
            "Tök, főző",
            "Uborka",
            "Újhagyma",
            "Vöröshagyma",
            "Zellergumó",
            "Zöldbab",
            "Zöldborsó",
            "Zöldpaprika",
            "Név",
            "Alma",
            "Ananász",
            "Banán",
            "Birsalma",
            "Citrom",
            "Cseresznye",
            "Csipkebogyó, friss",
            "Cukordinnye/sárgadinnye",
            "Datolya",
            "Egres",
            "Eper, fa",
            "Füge, friss",
            "Füge, szárított",
            "Gránátalma",
            "Grapefruit",
            "Görögdinnye",
            "Kajszibarack",
            "Kivi",
            "Körte",
            "Licsi",
            "Málna",
            "Mandarin",
            "Mangó",
            "Mazsola",
            "Meggy",
            "Mirabella",
            "Narancs",
            "Naspolya",
            "Nektarin",
            "Őszibarack",
            "Papaya",
            "Ribiszke, fekete",
            "Ribiszke, piros",
            "Szamóca, földieper",
            "Szeder",
            "Szilva, besztercei",
            "Szilva, vörös",
            "Szőlő",
            "Zöldringló","Aludttej",
            "Bivalytej",
            "Brick sajt",
            "Brie sajt",
            "Camembert sajt",
            "Cheddar sajt",
            "Cheshire sajt",
            "Colby sajt",
            "Edámi sajt",
            "Ementáli sajt",
            "Fagylalt",
            "Feta sajt",
            "Fontina sajt",
            "Főzőtejszín 10%-os",
            "Főzőtejszín 20%-os",
            "Gomolya sajt",
            "Gomolyatúró",
            "Gorgonzola sajt",
            "Gouda sajt",
            "Görög joghurt",
            "Gruyere sajt",
            "Habtejszín 30%-os",
            "Halloumi sajt",
            "Havarti sajt",
            "Író",
            "Jégkrém",
            "Joghurt",
            "Juhsajt",
            "Juhtej",
            "Juhtúró",
            "Kávétejszín",
            "Kecskesajt",
            "Kecsketej",
            "Kefir",
            "Kéksajt",
            "Köményes sajt",
            "Körözött",
            "Krémsajt",
            "Krémtúró",
            "Limburger sajt",
            "Márványsajt",
            "Mascarpone sajt",
            "Monterey sajt",
            "Mozzarella sajt",
            "Muenster sajt",
            "Neufchatel sajt",
            "Óvári sajt",
            "Pálpusztai sajt",
            "Parenyica sajt",
            "Parmezán sajt",
            "Provolone sajt",
            "Puding",
            "Ricotta sajt",
            "Rokfort sajt",
            "Romano sajt",
            "Sűrített tej",
            "Tehéntej (0,1%-os)",
            "Tehéntej (1,5%-os)",
            "Tehéntej (2,8%-os)",
            "Tehéntej (3,5%-os)",
            "Tehéntej (3,6%-os)",
            "Tehéntúró (félzsíros)",
            "Tehéntúró (sovány)",
            "Tejföl (12%-os)",
            "Tejföl (20%-os)",
            "Tejpor (sovány)",
            "Tejpor (zsíros)",
            "Tejszínhab",
            "Tilsiti sajt",
            "Trappista sajt",
            "Túró Rudi",
            "Vaj",
            "Vajkrém","Abonett",
            "Alföldi kenyér",
            "Bakonyi barna kenyér",
            "Briós",
            "Burgonyás kenyér",
            "Búzacsírás kenyér",
            "Búzakorpás kenyér",
            "Diós csiga",
            "Erzsébet kenyér",
            "Fánk",
            "Fehér kenyér",
            "Félbarna kenyér",
            "Francia kenyér",
            "Gofri",
            "Graham kenyér",
            "Kakaós csiga",
            "Kalács",
            "Kétszersült",
            "Kifli",
            "Kuglóf",
            "Kukoricás kenyér",
            "Lekváros bukta",
            "Lenmagos barnakenyér",
            "Magos kenyér",
            "Magvas barnakenyér",
            "Mazsolás kenyér",
            "Muffin",
            "Olasz kenyér",
            "Palacsinta",
            "Pirítós",
            "Piskótatekercs",
            "Pita (fehér lisztből)",
            "Pita (teljes kiőrlésű)",
            "Pogácsa (tepertős)",
            "Pogácsa (vajas)",
            "Pumpernickel",
            "Rozskenyér",
            "Teljes kiőrlésű kenyér",
            "Teljes kiőrlésű kifli",
            "Teljes kiőrlésű zsemle",
            "Tökmagos kenyér",
            "Túrós batyu",
            "Zabkorpás kenyér",
            "Zsemle",
      ],
      latszodik:false
    };
  }
        searchFilterFunction = (text) => {
        this.state.latszodik=true
        //alert(this.state.latszodik)
        if (text) {
          const newData = this.state.masterDataSource.filter(
            function (item) {
              const itemData = item
                ? item.toUpperCase()
                : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
          });
          this.setState({filteredDataSource:newData});
          this.setState({listaelem:text})
        } else {
          this.state.filteredDataSource=this.state.masterDataSource
          this.setState({listaelem:text})
        }
        
        if(this.state.listaelem.length<2)
        {
            this.setState({latszodik:false})
        }
        
  };
   getItem = (item) => {
    var x = this.state.data.length;

    let uj = [];
    if (this.state.listaelem != null) {
      uj = this.state.data;
    }
    uj.push({
      id: x,
      megnevezes: item,
      isChecked: false,
    });

    this.setState({ data: uj });
    this.storeData(uj);
    this.state.listaelem = "";
  
    
    this.setState({listaelem:""})
    this.setState({latszodik:false})
        
      };
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
        
          <View style={{ flexDirection: "row" }}>
             <View style={{ flex: 4, backgroundColor: "yellow" }}>
              <TouchableOpacity
                onPress={this.mindentorles}>
                <Text style={styles.mentes}>Minden törlése</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, backgroundColor: "yellow" }}>
              <TouchableOpacity onPress={this.adatatad}>
                <Text style={styles.mentes}>Mentés</Text>
              </TouchableOpacity>
            </View>
          </View>
       
        <View>
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
        <View style={{ flex: 1}}>
          <View style={styles.input}>
          <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => this.searchFilterFunction(text)}
          value={this.state.listaelem}
          underlineColorAndroid="transparent"
          placeholder="Termék keresése"
            ></TextInput>
           
          {this.state.latszodik==true?
         this.state.filteredDataSource.map((item,key)=>
         <TouchableOpacity key={key} onPress={()=>this.getItem(item)}><Text style={{backgroundColor:"darkgrey"}}>{item}</Text></TouchableOpacity>)
         :<Text style={{textAlign:"center",textAlignVertical:"center"}}></Text>}
         
          </View>
          <View style={{ flexDirection: "row" }}>
         
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
  input: {
      margin:20,
      width: width*1,
      borderWidth: 1,
      borderColor: "purple",
      borderRadius: 5,
      alignSelf: "center",
  },
});
