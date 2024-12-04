import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, TextInput} from 'react-native';

const Order = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('COD'); 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          'https://6717ea7cb910c6a6e02a8e4b.mockapi.io/food'
        );
        const data = await response.json();
        const items = data.slice(0, 2).map((item) => ({
          ...item,
          quantity: 1,
        }));
        setCartItems(items);
        calculateTotal(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    const subtotal = items.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
    const total = subtotal - discount;
    setTotalPrice(total > 0 ? total : 0); 
  };

  const handleQuantityChange = (itemId, action) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantity:
              action === 'increase'
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
          }
        : item
    );
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const handleApplyDiscount = () => {
    if (discountCode === 'SAVE10') {
      setDiscount(10);
      calculateTotal(cartItems);
      Alert.alert('Success', 'Discount code applied successfully!');
    } else {
      Alert.alert('Error', 'Invalid discount code.');
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    calculateTotal(updatedItems); 
  };

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      `Your total is $${totalPrice.toFixed(
        2
      )}. Payment method: ${
        paymentMethod === 'COD' ? 'Cash on Delivery' : 'Credit Card'
      }. Thank you for your purchase!`
    );
    setCartItems([]);
    setTotalPrice(0);
    setDiscount(0);
    setDiscountCode('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() => handleQuantityChange(item.id, 'decrease')}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleQuantityChange(item.id, 'increase')}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.paymentSection}>
            <Text style={styles.paymentTitle}>Payment Method:</Text>
            <TouchableOpacity
              onPress={() => setPaymentMethod('COD')}
              style={[
                styles.radio,
                paymentMethod === 'COD' && styles.selectedRadio,
              ]}
            >
              <Text>Cash on Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPaymentMethod('Card')}
              style={[
                styles.radio,
                paymentMethod === 'Card' && styles.selectedRadio,
              ]}
            >
              <Text>Credit Card</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.checkoutSection}>
            <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty!</Text>
      )}
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
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 4,
  },
  quantityText: {
    fontSize: 16,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  removeText: {
    fontSize: 14,
    color: '#FF6347',
    fontWeight: 'bold',
  },
  paymentSection: {
    marginBottom: 20,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  selectedRadio: {
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  checkoutSection: {
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyCartText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default Order;
