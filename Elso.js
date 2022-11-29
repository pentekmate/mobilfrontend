import React, { Component } from 'react';
import { Button, StyleSheet, View, Text, ScrollView,RefreshControl,FlatList,Pressable} from 'react-native';
import {DevSettings} from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default class Kiir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            refreshing:false,
            setRefreshing:false
           
        };
    }
  
    componentDidMount(){
        this.getData().then(adatokvissza=>{ 
        this.setState({products:adatokvissza}) 
          })
          
         
    }
    
    getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@lista')
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
        
        }
      }
      wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
       App = () => {
          onRefresh = React.useCallback(() => {
          setRefreshing(true);
          wait(2000).then(() => setRefreshing(false));
        }, []);
        this.getData
      }

    
      
    
    handleChange = (id) => {
        let temp = this.state.products.map((product) => {
            if (id === product.id) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        
        this.setState({products: temp})
    };
    render() {
        return (
          <View>
          {this.staterefreshing ? <ActivityIndicator /> : null}
    <FlatList
      data={this.state.products}
      renderItem={ItemView}
      refreshControl={
        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.App} />
      }
    />
  </View>
        );
    }
}
