import * as React from 'react';
import { Button, View, Text, TextInput, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import Kiir from './Elso'
import Listaad from './Lista_input';
import Listainputsr from './Listainputsr';
import Login from './Login'
import Regisztracio from './Regisztracio';
import Profil from './Profilom';
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
  if (fh.length>0) {
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
    <Kiir navigation={navigation}></Kiir>
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
function Prof({ navigation }) {
  return (
    <Profil navigation={navigation}></Profil>);
}


function Root({ navigation }) {
  return (
    FelhasznaloBelepve(),
    <Drawer.Navigator useLegacyImplementation initialRouteName={x ? "Home" : "Bejelentkezes"}
     screenOptions=
     {{headerStyle:{backgroundColor:'#01c29a'},headerTintColor: '#181818',drawerStyle: { backgroundColor: 'rgb(32,32,32)'},drawerActiveBackgroundColor: "rgb(18,18,18)", drawerActiveTintColor: "white", drawerInactiveTintColor: "white",headerTitleAlign:"center"}} >
      <Drawer.Screen name="Bejelentkezes" component={Bejelentkezes} options={{
        drawerItemStyle: { height: 0 }, headerShown: false,
      }} />
      <Drawer.Screen name="Home"  component={HomeScreen} options={{
           title: 'Home',
           drawerIcon: ({}) => (
            <AntDesign name="home" size={24} color="white" />
        ),}}/>
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="Listalétrehozás" component={Elso_lap} options={{
           title: 'Listalétrehozása',
           drawerIcon: ({}) => (
            <MaterialIcons name="post-add" size={24} color="white" />
        ),}}/> 
      <Drawer.Screen name="Listák" component={Masodik_lap}  options={{
           title: 'Listák',
           drawerIcon: ({}) => (
            <MaterialCommunityIcons name="clipboard-list-outline" size={24} color="white" />
        ),}}/> 
      <Drawer.Screen name="Profilom" component={Prof}  options={{
           title: 'Profilom',
           drawerIcon: ({}) => (
            <AntDesign name="user" size={24} color="white" />
        ),}}/> 
    </Drawer.Navigator>)
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()


const Belepve = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Listalétrehozása" component={Listainputsr} options={{headerTitle:""}} />
        <Stack.Screen name="Regisztráció" component={Regisztracio} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default Belepve;

