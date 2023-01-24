import React, { useState } from 'react';
import { Button, View, Text, TextInput, Alert, NativeEventEmitter, } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Kiir from './Elso'
import Listaad from './Lista_input';
import Listainputsr from './Listainputsr';
import Login from './Login'
import Regisztracio from './Regisztracio';
import Profil from './Profilom';
import Toltokep from './Tolto'
import { color } from 'react-native-reanimated';





const Tab = createBottomTabNavigator();
let Profilom = "Home"



function HomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgb(50,50,50)" }}>
    </View>,
    <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: "#01c29a" }, headerShown: false, tabBarActiveTintColor: "white", tabBarActiveBackgroundColor: "rgb(18,18,18)" }}>
      <Tab.Screen
        listeners={{
          tabPress: () => Profilom = "Home"
        }}

        options={{
          tabBarIcon: ({ }) => {
            return (
              <AntDesign name="home" size={24} color="white" />
            );
          },
          title: ""
        }} name="TabA" component={TabAScreen} />
      <Tab.Screen listeners={{
        tabPress: () => Profilom = "Profilom"
      }}

        options={{
          tabBarIcon: ({ }) => {
            return (
              <AntDesign name="user" size={24} color="white" />
            );
          },
          title: "",
        }} name="TabB" component={TabBScreen} />
    </Tab.Navigator>
  );
}
function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgb(50,50,50)" }}>

    </View>
  );
}
function TabAScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabA Home" component={Home} />
    </Stack.Navigator>
  );
}
function TabBScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabA Home" component={Prof} />
    </Stack.Navigator>
  );
}



function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgb(50,50,50)" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function Elso_lap({ navigation }) {
  return (
    <Listaad navigation={navigation}></Listaad>

  );
}
function Toltes({ navigation }) {
  return (
    <Toltokep navigation={navigation}></Toltokep>
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
    <Drawer.Navigator
      screenOptions=
      {{ headerStyle: { backgroundColor: '#01c29a' }, headerTintColor: '#181818', drawerStyle: { backgroundColor: 'rgb(32,32,32)' }, drawerActiveBackgroundColor: "rgb(18,18,18)", drawerActiveTintColor: "white", drawerInactiveTintColor: "white", headerTitleAlign: "center" }} >

      <Drawer.Screen name="Toltokep" component={Toltes} options={{
        drawerItemStyle: { height: 0 }, headerShown: false,
      }} />

      <Drawer.Screen name="Bejelentkezes" component={Bejelentkezes} options={{
        drawerItemStyle: { height: 0 }, headerShown: false,
      }} />
      <Drawer.Screen name="Home" component={HomeScreen} options={{
        title: Profilom,
        drawerIcon: ({ }) => (
          <AntDesign name="home" size={24} color="white" />
        ),

      }} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="Listalétrehozás" component={Elso_lap} options={{
        title: 'Listalétrehozása',
        drawerIcon: ({ }) => (
          <MaterialIcons name="post-add" size={24} color="white" />
        ),
      }} />
      <Drawer.Screen name="Listák" component={Masodik_lap} options={{
        title: 'Listák',
        drawerIcon: ({ }) => (
          <MaterialCommunityIcons name="clipboard-list-outline" size={24} color="white" />
        ),
      }} />
      <Drawer.Screen name="Profilom" component={Prof} options={{
        title: 'Profilom',
        drawerIcon: ({ }) => (
          <AntDesign name="user" size={24} color="white" />
        ),
        headerRightContainerStyle: { marginRight: 10 },

      }} />

    </Drawer.Navigator>
  )


}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()

const menu = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Listalétrehozása" component={Listainputsr} options={{ title: "Keresés", headerTitle: "Keresés", headerStyle: { backgroundColor: '#01c29a', headerTintColor: '#181818' } }} />
        <Stack.Screen name="Regisztráció" component={Regisztracio} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


export default menu;

