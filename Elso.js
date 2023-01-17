import React, { Component } from 'react';
import { ChildComponent, FlatList, Text, StyleSheet, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [""],
            felhasznalonev: "",
        };
    }
    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@felhasznalo')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    componentDidMount() {
        this.getData().then((vissza_adatok2) => {
            this.setState({ felhasznalonev: vissza_adatok2 })
            this.state.felhasznalonev = vissza_adatok2
            var bemenet = {
                bevitel1: this.state.felhasznalonev

            }
            fetch('http://192.168.6.19:3000/felhasznalolistai', {
                method: "POST",
                body: JSON.stringify(bemenet),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }
            )
                .then((response) => response.json())
                .then((responseJson) => {

                    this.setState({

                        data: responseJson,
                    }, function () {

                    });

                })
                .catch((error) => {
                    console.error(error);
                });
        });
        //console.log(this.state.felhasznalonev)
        this.szar
    }
    szar = () => {
        alert(this.state.felhasznalonev)
    }



    render() {
        return (
            <View
                style={{ flexDirection: 'column', flex: 1 }}>
                <View style={{ flex: 1, alignSelf: "center" }} ><Text style={{ fontSize: 30 }}> Üdv!{this.state.felhasznalonev} </Text></View>
                <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
                >{this.state.data.map((item) => <Text>{item.listak_nev}</Text>)}
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
