import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, Image, TouchableOpacity, StyleSheet, View } from 'react-native';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
        };
    }

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

    componentDidMount() {
        this.getLista();
    }

    render() {
        const { data, isLoading } = this.state;

        return (
            <View >
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity >
                            <View style={{ backgroundColor: "lightgreen", margin: 10, borderRadius: 10, padding: 5 }}>
                                <Text style={{ fontSize: 20 }}>{item.listak_nev}</Text>
                                <Text style={{ fontSize: 20 }}>{this.getParsedDate(item.listak_datum)}</Text>
                            </View>
                        </TouchableOpacity>
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
