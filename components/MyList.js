import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MyList = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);

  useEffect(() => {
    const fetchPurchasedItems = async () => {
      try {
        const response = await fetch('https://6717ea7cb910c6a6e02a8e4b.mockapi.io/food');
        const data = await response.json();
        setPurchasedItems(data.slice(0, 5)); // Lấy 5 sản phẩm đầu tiên
      } catch (error) {
        console.error('Error fetching purchased items:', error);
      }
    };

    fetchPurchasedItems();
  }, []);

  // Xử lý khi nhấn vào sản phẩm
  const handleItemPress = (item) => {
    Alert.alert('Product Details', `You clicked on: ${item.name}`);
  };

  // Xử lý khi nhấn nút xoá
  const handleDelete = (itemId) => {
    setPurchasedItems(purchasedItems.filter((item) => item.id !== itemId));
    Alert.alert('Deleted', 'The item has been removed from your list.');
  };

  // Xử lý khi nhấn nút thêm vào giỏ hàng
  const handleAddToCart = (item) => {
    Alert.alert('Added to Cart', `${item.name} has been added to your cart.`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleAddToCart(item)}>
          <Icon name="shopping-cart" size={20} color="#4CAF50" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Icon name="trash" size={20} color="#FF6347" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Purchased Items</Text>
      <FlatList
        data={purchasedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginLeft: 10,
  },
});

export default MyList;
