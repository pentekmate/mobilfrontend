import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Kiir from './Elso'
import Listaad from './Lista_input';
import Listainputsr from './Listainputsr'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
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
function Root({ navigation }) {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="ListaLétrehozása" component={Elso_lap} />
      <Drawer.Screen name="Listák" component={Masodik_lap} />
    </Drawer.Navigator>)
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Listalétrehozása" component={Listainputsr} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}