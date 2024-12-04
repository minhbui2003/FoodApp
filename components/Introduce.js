import React from "react";
import { View, Image, TouchableOpacity , Text } from "react-native";
import { useNavigation } from '@react-navigation/native'; 

const Introduce = () => {

    const navigation = useNavigation();

    return(
        <View style={{flex:2,backgroundColor:'#FFFFFF'}}>
            <View style={{
                flex:1,
                alignItems:'center',
                justifyContent:'center',
                marginTop: 80,
            }}>
                <Image
                    source={require('../assets/img/HamburgerCenter.png')}
                    style={{width: 300, height: 300, borderWidth: 1, borderRadius: 20}}
                />
            </View>
            <View style={{
                justifyContent:'center',
                alignItems:'center',
                marginBottom:20,
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}
                style={{
                    backgroundColor:'#D35400',
                    borderRadius:30,
                    height:50,
                    width:354,
                    alignItems:'center',
                    justifyContent:'center',
                    marginHorizontal: 20, 
                    marginTop:20,
                }}>
                    <Text style={{
                        fontSize:18,
                        fontWeight:'700',
                        color:'white',
                        width:61,
                        height:27,
                    }}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                justifyContent:'center',
                alignItems:'center',
                marginBottom:20, 
            }}>
                <TouchableOpacity onPress={ () => navigation.navigate('Register')}
                style={{
                    backgroundColor:'#ECF0F1',
                    borderRadius:30,
                    width:354,
                    height:50,
                    alignItems:'center',
                    justifyContent:'center',
                    marginHorizontal: 50,
                    marginBottom:80
                }}>
                    <Text style={{
                        fontSize:18,
                        fontWeight:'700',
                        color:'#000000',
                        width:68,
                        height:27,

                    }}>Sign Up</Text>
                </TouchableOpacity>
            </View> 
        </View>
    )
};

export default Introduce;
