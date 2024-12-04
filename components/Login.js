import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation(); 
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState(''); 
    const users = [
        {userName: 'user@gmail.com', password: '123'},
    ];

    const handleLogin = () => {
        const user = users.find((u) => u.userName === userName && u.password === password);
        if (user) {
            navigation.navigate('Main');
        } else {
            alert('Sai thông tin đăng nhập');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Sign In</Text>
            </View>
            <View style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input}
                        placeholder="UserName"
                        placeholderTextColor="#00000080"
                        value={userName}
                        onChangeText={setUserName}
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#00000080"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
                    <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.forgotPasswordWrapper}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:50
    },
    titleText: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom:40
    },
    inputWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        backgroundColor: '#ECF0F1',
        width: 354,
        height: 50,
        marginHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        fontSize: 14,
        fontWeight: '400',
        paddingLeft: 20,
        textAlign: 'left',
        width: '100%',
    },
    buttonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    signInButton: {
        backgroundColor: '#D35400',
        width: 354,
        height: 50,
        marginHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    forgotPasswordWrapper: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 30,
        paddingRight: 30,
    },
    forgotPasswordText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#34495E',
    },
});

export default Login;
