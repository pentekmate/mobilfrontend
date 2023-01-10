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

export default class Listaad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      listanev: "",
      termekektomb: [
        { id: 1, megnevezes: "Cukor", isChecked: false },
        { id: 2, megnevezes: "Liszt", isChecked: false },
        { id: 3, megnevezes: "Kenyér", isChecked: false },
        { id: 4, megnevezes: "Kávé", isChecked: false },
        { id: 6, megnevezes: "Cola", isChecked: false },
        { id: 7, megnevezes: "Wc-papír", isChecked: false },
        { id: 8, megnevezes: "Szalvéta", isChecked: false },
        { id: 9, megnevezes: "Tej", isChecked: false },
        { id: 10, megnevezes: "Mosószer", isChecked: false },
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
   
    this.getData().then((vissza_adatok2) => {
      //console.log(vissza_adatok2) 
      this.setState({data:vissza_adatok2})
    });
  }

  mindentorles = () => {
    this.setState({ data: [] });
    this.storeData([]);

    this.state.termekektomb.map((product) => {
      product.isChecked = false;
    });
    this.state.listanev = "";
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

    x=this.state.data.length
    this.state.termekektomb.map((termek) => {
      if (id === termek.id && termek.isChecked == false) {
        this.state.data.push({
          id: x,
          megnevezes: termek.megnevezes,
          isChecked: false,
        });
      }
    });
    
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, flexDirection: "column"}}>
        {/*----------------------------LISTAELNEVEZÉSE,MENTÉSE-------------------- */}

        <View style={{ flexDirection: "row",backgroundColor:"#2c3531",flex:1}}>
          <View style={{ flex: 1, backgroundColor: "#2c3531" }}>
            <TouchableOpacity
              onPress={this.mindentorles}>
              <Text style={styles.mentes}>Törlés</Text>
            </TouchableOpacity>
          </View>

          <View style={{flex:4,alignItems:"center"}}>
              <View style={{ flexDirection: "row",backgroundColor:"#2c3531",flex:1,}}>
              <View style={{flex:1,backgroundColor:"696969",justifyContent:"center"}}>
                <View style={styles.image}>
                    <Image
                      source={require('./feher-removebg-preview.png')}
                      style={{width:20,height:20,left:-5}}
                      />
                    </View>
                  </View>
                    <View style={{backgroundColor:"#116466",flex:9,justifyContent:"center",borderRadius:15}}>
                      <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('Listalétrehozása')}
                        style={styles.textInputStyle} >
                        <Text style={{fontStyle:"italic",color: "#f5fffa"}}>Termék keresése..</Text>
                      </TouchableOpacity>
                    </View>
                </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "#2c3531" }}>
            <TouchableOpacity onPress={this.adatatad}>
              <Text style={styles.mentes}>Mentés</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{backgroundColor:"brown"}}>
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
        <View style={{ flex: 9,backgroundColor:"#2c3531" }}>
        
          <FlatList
            //horizontal={true} 
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            getItemCount={this.get}
            style={{marginTop:100}}
            index={0}
            data={this.state.termekektomb}
            renderItem={({ item }) => (
              <View
                style={styles.felsocheck}
              >
                <View style={styles.icon}>
                <Pressable onPress={() => this.handleChange(item.id)}>
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
                <Text style={{color: "#f5fffa",fontSize:15}}>{item.megnevezes}</Text>
              </View>
            )}
          />
          
        </View>
        {/*----lISTA ELEMEINEK MUTATÁSA----*/}
        <View style={{ flex: 9 ,backgroundColor:"#2c3531", paddingTop:height*0.1}}>
          <FlatList
            data={this.state.data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.listatartalom}>
              
                        <View style={{ flexDirection: "row",flex:1}}>
                          <View style={{flex:1,justifyContent:"center"}}>
                          <Entypo style={{marginLeft:10}} name="shop" size={25} color="#f5fffa" />
                          </View> 
                        <View style={{flex:13,justifyContent:"center"}}>
                         <Text style={{color:"#f5fffa",marginLeft:10}}>{item.megnevezes}</Text>
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
const { width,height } = Dimensions.get("window");

const styles = StyleSheet.create({
  listatartalom:{
    backgroundColor:"#116466",
    height:height*0.05,
    width:width*1,
    alignSelf:"center",
    borderRadius:15,
    margin:10
   

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
    textAlignVertical:"top",
    borderRadius:15,
    textAlignVertical:"auto",
    width:width*1
},
image:{
  backgroundColor:"#808080",
  width:30,
  height:55,
  justifyContent:"center",
  alignSelf:"flex-end",
  right:-10,
  alignItems:"center",
  borderRadius:15

}
,felsocheck:{
  backgroundColor:"red",
  flexDirection: "row",
  width:width*0.5,
  margin: 5,
  backgroundColor:"#116466",
  height:50,
  borderRadius:15,
  alignItems:"center",
  color: "#f5fffa"
},
icon:{
  backgroundColor:"#ffcb9a",
  borderRadius:50,
  margin:5,
  marginRight:10
}
});
