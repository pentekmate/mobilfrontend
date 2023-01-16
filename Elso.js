import React, { Component } from 'react';
import { FlatList, Text, StyleSheet, View, Pressable } from 'react-native';
import { List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            felhasznalonev:"",
            data: [],
            isLoading: true,
            products: [],
            tartalom: [],
            felhasznaloId:"",
            felhasznalok:[]
        };
    }
    getData1 = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@felhasznalo')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {

        }
    }
    async getFelhasznalok() {
        try {
          const response = await fetch('http://192.168.1.173:3000/felhasznalok');
          const json = await response.json();
          //console.log(json)
          this.setState({ felhasznalok: json });
          console.log(this.state.felhasznalok)
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({ isLoading: false });
        }

        this.state.felhasznalok.map((item)=>{
            if(item.felhasznalonev==this.state.felhasznalonev)
            {
               this.state.felhasznaloId=item.id
               console.log(item.id)
            }
        })


      }

    componentDidMount() {
        console.log(this.state.felhasznalonev)
        this.getData().then(adatokvissza => {
            this.setState({ products: adatokvissza })
        })

        this.getData1().then(fh => {
          this.state.felhasznalonev=fh
        })
        this.getFelhasznalok();

        
        this.getLista();
    }

    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@lista')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {

        }
    }

    handleChange = (id) => {
        let temp = this.state.tartalom.map((product) => {
            if (id === product.id) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        this.setState({ tartalom: temp })
    };

    getlistakid = (id) => {
        let uj = [];
        let megujabb = [];
        this.state.data.map((item) => {
            if (item.listak_id == id) {
                megujabb = item.listak_tartalom.split(',')
                console.log(megujabb)

            }
        });
        for (let i = 0; i < megujabb.length; i++) {
            uj.push({ nev: megujabb[i], isChecked: false, id: i })
            this.setState({ tartalom: uj })

        }
    };

    async getLista() {
        try {
            let adatok={
              bevitel1:this.state.felhasznaloId
            }
            const response = await fetch('http://192.168.1.173:3000/felhsznalolistai',
            {
              method: "POST",
              body: JSON.stringify(adatok),
              headers: {"Content-type": "application/json; charset=UTF-8"}
            }
            );
            const json = await response.json();
            this.setState({ data: json });
            console.log("json")
            console.log(JSON.stringify(json))
          } catch (error) {
            console.log(error);
          } finally {
            this.setState({ isLoading: false });
          }
        }
    

    getParsedDate(strDate) {
        var strSplitDate = String(strDate).split(' ');
        var date = new Date(strSplitDate[0]);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        date = yyyy + "-" + mm + "-" + dd;
        return date.toString();
    }



    render() {
        return (
            <View >
                <Text style={{fontSize:20,alignSelf:"center"}}>{this.state.felhasznalonev} listái.</Text>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <List.Section >
                            <List.Accordion title={item.listak_nev} onPress={() => this.getlistakid(item.listak_id)}>
                                <FlatList style={{ marginTop: 10 }}
                                    data={this.state.tartalom}
                                    renderItem={({ item }) => (
                                        <View >
                                            <View style={{ marginLeft: 10, flexDirection: 'row', flex: 1 }}>
                                                <Pressable onPress={() => { this.handleChange(item.id) }}>
                                                    <MaterialCommunityIcons
                                                        name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={30} color="#000" />
                                                </Pressable>
                                                <Text style={{ fontSize: 20 }} > {item.nev}</Text>

                                            </View>
                                        </View>
                                    )}
                                />



                            </List.Accordion>
                        </List.Section>
                    )}
                />


            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10
    },
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