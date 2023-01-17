import * as React from 'react';
import { Button, View, Text, TextInput, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Kiir from './Elso'
import Listaad from './Lista_input';
import Listainputsr from './Listainputsr';
import Login from './Login'
import Regisztracio from './Regisztracio';
let fh = "";
let x = false;

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => { Felhasznalobelepve = false; console.log(Felhasznalobelepve) }}
        title="Go to notifications"
      />
    </View>
  );
}
function FelhasznaloBelepve() {
  getData().then(fl => {
    fh = fl
  })
  if (!fh) {
    x = true
    console.log(x)
  }

}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@felhasznalo')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}


function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function Elso_lap({ navigation }) {
  return (
    <Listaad navigation={navigation}></Listaad>

  );
}

function Masodik_lap({ navigation }) {
  return (
    <Kiir></Kiir>
  );
}
function Bejelentkezes({ navigation }) {
  return (
    <Login navigation={navigation}></Login>);
}

function Regisztr({ navigation }) {
  return (
    <Regisztracio navigation={navigation}></Regisztracio>);
}


function Root({ navigation }) {
  return (

    <Drawer.Navigator useLegacyImplementation initialRouteName={FelhasznaloBelepve(), x ? "Home" : "Bejelentkezes"}  >
      <Drawer.Screen name="Bejelentkezes" component={Bejelentkezes} options={{
        drawerItemStyle: { height: 0 }, headerShown: false
      }} />
      <Drawer.Screen name="Home" component={HomeScreen} />

      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="ListaLétrehozása" component={Elso_lap} />
      <Drawer.Screen name="Listák" component={Masodik_lap} />
    </Drawer.Navigator>)
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()


const Belepve = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Listalétrehozása" component={Listainputsr} />
        <Stack.Screen name="Regisztráció" component={Regisztracio} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default Belepve;

