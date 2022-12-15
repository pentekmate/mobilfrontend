import React, { Component } from "react";
import { Button, StyleSheet, View, Text, TouchableOpacity, TextInput, Dimensions, } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ButtonBasics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tomb: [],
            listaelem: "",
            filteredDataSource: ["Articsóka",
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
                "Zöldringló", "Aludttej",
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
                "Vajkrém", "Abonett",
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
            masterDataSource: ["Articsóka",
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
                "Zöldringló", "Aludttej",
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
                "Vajkrém", "Abonett",
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
            latszodik: false,
            helyitomb: []
        };
    }
    getItem = (item) => {
        var x = this.state.tomb.length;

        let uj = [];
        uj.push({
            id: x,
            megnevezes: item,
            isChecked: false,
        });
        this.state.helyitomb.push(item)
        this.setState({ tomb: uj });
        this.state.listaelem = "";

        this.setState({ listaelem: "" })
        this.setState({ latszodik: false })

    };
    searchFilterFunction = (text) => {
        this.state.latszodik = true
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
            this.setState({ filteredDataSource: newData });
            this.setState({ listaelem: text })
        } else {
            this.state.filteredDataSource = this.state.masterDataSource
            this.setState({ listaelem: text })
        }

        if (this.state.listaelem.length < 2) {
            this.setState({ latszodik: false })
        }

    };

    storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@listaelemek', jsonValue)
        } catch (e) {
            // saving error
        }
    }
    tarol = () => {
        // this.props.navigation.navigate('App')
        this.storeData(this.state.tomb)
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "column", flex: 5 }}>

                    <View style={{ flexDirection: "row", flex: 1 }}>
                        <View style={{ flex: 10, }}>
                            <TextInput
                                style={styles.textInputStyle}
                                onChangeText={(text) => this.searchFilterFunction(text)}
                                value={this.state.listaelem}
                                underlineColorAndroid="transparent"
                                placeholder="Termék keresése"
                            ></TextInput>
                            <View style={{ flex: 1 }}>
                                {this.state.latszodik == true ?
                                    this.state.filteredDataSource.map((item, key) =>
                                        <TouchableOpacity key={key} onPress={() => this.getItem(item)}>
                                            <Text style={{ backgroundColor: "darkgrey" }}>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                    : <Text style={{ textAlign: "center", textAlignVertical: "center" }}></Text>}
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={this.tarol}>
                                <Text style={{ textAlignVertical: "center", textAlign: "center", borderWidth: 2, borderColor: "green", width: width * 0.1 }}>Kész</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={{ flex: 5 }}>
                    {this.state.helyitomb.length > 0 ? this.state.helyitomb.map((item, key) =>
                        <View style={{ backgroundColor: "lightgrey", width: width * 0.5, alignSelf: "center", borderColor: "black", borderWidth: 2, margin: 5 }}>
                            <Text style={{ textAlign: "center" }} key={key}>{item}</Text>
                        </View>
                    )
                        : <Text></Text>}
                </View>
            </View>
        );
    }
}
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",

    },
    buttonContainer: {
        margin: 20,
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textInputStyle: {
        borderColor: "purple",
        borderWidth: 2,
        width: width * 0.9
    }

});
