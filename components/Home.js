import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icon
import axios from 'axios';

const Home = ({ navigation }) => {
  const [foods, setFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('https://6717ea7cb910c6a6e02a8e4b.mockapi.io/food');
        setFoods(response.data);
        setFilteredFoods(response.data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };
    fetchFoods();
  }, []);

  const categories = [
    { id: '1', name: 'Drink', image: require('../assets/img/cup.png') },
    { id: '2', name: 'Food', image: require('../assets/img/Cake_.png') },
    { id: '3', name: 'Cake', image: require('../assets/img/hamburger_1.png') },
    { id: '4', name: 'Snack', image: require('../assets/img/Snack_.png') },
  ];

  const filterByCategory = useCallback(
    (category) => {
      const filtered = foods.filter((food) => food.category === category);
      setFilteredFoods(filtered);
    },
    [foods]
  );

  useEffect(() => {
    if (searchQuery) {
      const searchResults = foods.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFoods(searchResults);
    } else if (selectedCategory) {
      filterByCategory(selectedCategory);
    } else {
      setFilteredFoods(foods);
    }
  }, [searchQuery, selectedCategory, filterByCategory, foods]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    filterByCategory(category);
  };

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.foodContainer}
      onPress={() => navigation.navigate('Detail', { item })}
    >
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#D35400" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for food..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setSelectedCategory(null);
          }}
        />
      </View>

      {/* Category Icons */}
      <View style={styles.categoryContainer}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(item.name)}
          >
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Banner */}
      <Image source={require('../assets/img/banner.jpg')} style={styles.bannerImage} />

      {/* Categories Label */}
      <Text style={styles.labelText}>Categories</Text>

      {/* Food List */}
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.id}
        renderItem={renderFoodItem}
        numColumns={2}
        contentContainerStyle={styles.foodList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: '#D35400',
    borderWidth: 1,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  bannerImage: {
    width: '100%',   // Chiều rộng toàn màn hình
    height: 120,     // Chiều cao tùy chỉnh cho banner
    resizeMode: 'cover', // Căn chỉnh ảnh cho phù hợp
    borderRadius: 10,
    marginBottom: 12, // Khoảng cách dưới banner
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryItem: {
    alignItems: 'center',
    width: 50, 
    padding: 6,
    borderWidth: 1,
    borderRadius: 8,
  },
  categoryImage: {
    width: 35,
    height: 35, 
    marginBottom: 2,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  foodList: {
    paddingVertical: 16,
  },
  foodContainer: {
    width: '48%',
    marginHorizontal: '1%',
    marginVertical: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D35400',
    borderRadius: 8,
    overflow: 'hidden',
  },
  foodImage: {
    width: '100%',
    height: 120,
  },
  foodInfo: {
    padding: 8,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  foodPrice: {
    fontSize: 14,
    color: 'red',
  },
});


export default Home;
