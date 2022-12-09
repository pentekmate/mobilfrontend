import React, { Component } from 'react';
import { FlatList, Text, StyleSheet, View, Pressable } from 'react-native';
import { List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
            products: [],
            tartalom: [],
        };
    }

    componentDidMount() {
        this.getData().then(adatokvissza => {
            this.setState({ products: adatokvissza })
        })
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
            const response = await fetch('http://pentek-mate-miklos.dszcbaross.tk/listak');
            const json = await response.json();
            this.setState({ data: json });
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




                        /*<TouchableOpacity onPress={() => this.funkcio()}>
                    <View style={{ backgroundColor: "lightgreen", margin: 10, borderRadius: 10, padding: 5 }}>
                        <Text style={{ fontSize: 20 }}>{item.listak_nev}</Text>
                        <Text style={{ fontSize: 20 }}>{this.getParsedDate(item.listak_datum)}</Text>
                    </View>
                </TouchableOpacity>*/
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