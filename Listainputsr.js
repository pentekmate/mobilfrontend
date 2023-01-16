import React, { Component } from "react";
import { Button, StyleSheet, View, Text, TouchableOpacity, TextInput, Dimensions, FlatList, Image } from "react-native";
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




        };
    }
    componentDidMount() {
        this.getData().then((vissza_adatok2) => {

            this.setState({ tomb: vissza_adatok2 })
        });
    }

    getItem = (item) => {
        
        var x = this.state.tomb.length;


        this.state.tomb.push({
            id: x,
            megnevezes: item
        })

        this.state.listaelem = "";

        this.setState({ listaelem: "" })
        this.setState({ latszodik: false })


    };

    searchFilterFunction = (text) => {
        this.state.latszodik = true

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
    //adatok mentése asyncstorageba majd képernyő visszaugratása
    tarol = () => {

        this.props.navigation.navigate('ListaLétrehozása')
        try {
            this.storeData(this.state.tomb)
        }
        catch (err) { }
        finally {
            console.log("Sikeres felvitel")
        }

    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "column", flex: 1, backgroundColor: "#2c3531", }}>

                    {/*------------------------------------------------------------------VIEW RENDEZÉSE SEARCHBAR---------------------------------------------------------------------------------------------------------*/}


                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", flex: 1 }}>
                            <View style={{ flex: 1, backgroundColor: "696969", justifyContent: "center" }}>
                                <View style={styles.image}>
                                    <Image
                                        source={require('./feher-removebg-preview.png')} 
                                        style={{ width: 23, height: 23 }}
                                    />
                                </View>
                            </View>
                            <View style={{ backgroundColor: "#2c3531", flex: 9, justifyContent: "center" }}>
                                <TextInput
                                    style={styles.textInputStyle}
                                    onChangeText={(text) => this.searchFilterFunction(text)}
                                    value={this.state.listaelem}
                                    placeholderTextColor="#f5fffa"
                                    placeholder="Termék keresése.."
                                ></TextInput>
                            </View>

                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: "696969" }}>
                        {this.state.tomb.length > 0 ? <TouchableOpacity
                            onPress={(this.tarol)}
                            style={{ backgroundColor: "#116466", width: 65, alignSelf: "flex-end", alignItems: "center", borderRadius: 150 / 2, height: 65, justifyContent: "center", zIndex: 1, bottom: -width * 1.57, left: -width * 0.03 }}>
                            <Image
                                source={require('./save-removebg-preview.png')} 
                                style={{ width: 50, height: 50 }}
                            />
                        </TouchableOpacity> : <Text></Text>}

                    </View>
                    <View style={{ flex: 9 }}>
                        {this.state.latszodik == true ?
                            <FlatList
                                data={this.state.filteredDataSource}
                                keyExtractor={(item, index) => String(index)}
                                renderItem={({ item, key }) => (

                                    <View style={styles.listaelemek} key={key}>

                                        <View key={key} style={styles.listaelemektext} >
                                            <Image
                                                source={require('./feher-removebg-preview.png')} //Change your icon image here
                                                style={{ width: 23, height: 23 }}
                                            />
                                            <Text key={key} style={{ fontSize: 15, color: "white", fontWeight: "bold", position: "absolute", paddingLeft: 25 }}>{item}</Text>
                                            <View key={item.key} style={styles.segedview}></View>
                                        </View>
                                        <TouchableOpacity key={key} style={styles.pluszjel}
                                            onPress={() => this.getItem(item)}
                                        ><Text key={key} style={{ textAlign: "center", fontSize: 18 }}>+</Text>
                                        </TouchableOpacity>

                                    </View>

                                )}
                            />
                            : <Text style={{ textAlign: "center", textAlignVertical: "center" }}></Text>}
                    </View>


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
    textInputStyle: {
        backgroundColor: "#116466",
        height: 55,
        textAlignVertical: "top",
        borderRadius: 15,
        width: width * 0.95,
        alignSelf: "center",
        textAlignVertical: "auto",
        fontStyle: "italic",
        color: "#f5fffa"
    }
    ,
    image: {
        backgroundColor: "#808080",
        width: 30,
        height: 55,
        width: width * 0.1,
        justifyContent: "center"
    }, listaelemek: {
        margin: 10,
        backgroundColor: "#116466",
        borderRadius: 15,
        height: 100,
    },
    listaelemektext: {
        margin: 20,
        height: 40,
        width: width * 0.5


    },
    segedview: {
        marginTop: 20,
        backgroundColor: "green",
        width: width * 0.7,
        borderBottomWidth: 1,
        borderBottomColor: "#d9b08c",
    },
    pluszjel: {
        backgroundColor: "#ffcb9a",
        width: width * 0.09,
        alignSelf: "flex-end",
        margin: 20,
        position: "absolute",
        marginBottom: 25,
        borderRadius: 50,



    }

});
