import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');

    const handleRegister = () => {
        if (userName && password && password === reEnterPassword) {
            alert("Đăng ký thành công!");
            navigation.navigate("Main");
        } else {
            alert("Thông tin không hợp lệ hoặc mật khẩu không khớp!");
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Sign Up</Text>
            </View>
            <View style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Enter UserName"
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
            <View style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Re-enter Password"
                        placeholderTextColor="#00000080"
                        secureTextEntry
                        value={reEnterPassword}
                        onChangeText={setReEnterPassword}
                    />
                </View>
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                    <Text style={styles.registerText}>Sign Up</Text>
                </TouchableOpacity>
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
        marginTop: 50,
    },
    titleText: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 40,
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
    registerButton: {
        backgroundColor: '#D35400',
        width: 354,
        height: 50,
        marginHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});

export default Register;
