import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Detail = ({ route }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price}</Text>

      <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryInfo}>Delivery in 30 min</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.restaurantInfo}>Restaurants info</Text>
      <Text style={styles.infoText}>
        Order a Large Pizza but the size is the equivalent of a medium/small from other places
        123 Nguyen Thai Son, Go Vap, Ho Chi Minh
      </Text>

      <Button title="Add to Cart" onPress={() => alert('Added to cart!')} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  container1: {
    alignItems: 'center',
    marginBottom: 25,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deliveryInfo: {
    fontSize: 16,
    marginRight: 10,
    color: '#555',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#4CAF50',
  },
  quantityText: {
    fontSize: 12,
  },
  restaurantInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    marginBottom: 30,
  },
});

export default Detail;
