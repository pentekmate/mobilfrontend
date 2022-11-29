import React, { Component } from 'react';
import { Button, StyleSheet, View, Text,RefreshControl,FlatList,Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from "@expo/vector-icons";




export default class Kiir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
           
           
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
          <FlatList
                    data={this.state.products}
                    renderItem={({ item }) => (
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    justifyContent: 'space-between',
                                }}>
                                <Pressable onPress={() => this.handleChange(item.id)} >
                                    <MaterialCommunityIcons
                                        name={item.isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color="#000" />
                                </Pressable>
                                <Text>{item.megnevezes}</Text>
                            </View>
                        </View>
                    )}
                />
  </View>
        );
    }
}
