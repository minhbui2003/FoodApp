import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground , Image} from 'react-native';

const Start = ({ navigation }) => {
  return (
      <View style={styles.container}>
        <Text style={styles.title}>Food App</Text>
        <Image
        source={require('../assets/img/pict.png')}
        style={{with:271, height:312}}
      />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Introduce')}>
        
          <Text style={styles.buttonText}>Started</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFA500',
  },
  title: {
    fontSize: 40,
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#D35400', 
    borderRadius: 25, 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, 
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Start;