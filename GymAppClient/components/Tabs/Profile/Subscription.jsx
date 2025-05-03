import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

import rooster1 from "../../../assets/rooster1.jpg";
import rooster2 from "../../../assets/rooster2.jpg";
import rooster3 from "../../../assets/rooster3.jpg";

const mockSubscriptions = [
  {
    id: '1',
    title: 'Morning Access',
    description: ['Available from 07:00 to 12:00', 'Access to the gym in the morning hours'],
    price: '$5',
    color: '#4da6ff',
    image: rooster1,
  },
  {
    id: '2',
    title: 'Premium subscription',
    description: [
      'Unlimited enter to the gym',
      'Own coach any time of day',
      'from 10 - 19',
    ],
    price: '$30',
    color: '#FFD700',
    image: rooster2,
  },
  {
    id: '3',
    title: 'Basic Access',
    description: ['Without personal trainer', 'Limited gym access during off-peak hours'],
    price: '$15',
    color: '#80d4a0',
    image: rooster3,
  },
];

const Subscription = ({ navigation }) => {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(1);
  const flatListRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: 1, animated: false });
      }
    }, 1000);
  }, []);

  const renderItem = ({ item, index }) => (
    <View 
      style={[
        styles.card, 
        { backgroundColor: item.color, width: screenWidth * 0.8 }
      ]}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      {item.description.map((line, i) => (
        <Text key={i} style={styles.cardText}>{line}</Text>
      ))}
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  const getItemLayout = (_, index) => ({
    length: screenWidth * 0.8,
    offset: screenWidth * index,
    index,
  });

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(newIndex);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00aaff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your Subscription</Text>

      <FlatList
        ref={flatListRef}
        data={subscriptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={screenWidth}
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={handleScroll}
        initialScrollIndex={1}
        onScrollToIndexFailed={() => {
          setTimeout(() => {
            if (flatListRef.current) {
              flatListRef.current.scrollToIndex({ index: 1, animated: false });
            }
          }, 100);
        }}
      />

      <View style={styles.paginationContainer}>
        {subscriptions.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.paginationDot, 
              currentIndex === index && styles.activePaginationDot
            ]} 
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (subscriptions[currentIndex]) {
            alert('Subscribed to ' + subscriptions[currentIndex].title);
          }
        }}
      >
        <Text style={styles.buttonText}>
          Subscribe to {subscriptions[currentIndex]?.title || ''}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.goBackText}>⬅️ Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: 40,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  flatListContent: {
    paddingHorizontal: screenWidth * 0.1,
  },
  card: {
    width: screenWidth * 0.8,
    marginHorizontal: screenWidth * 0.1,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    height: 350, 
  },
  cardImage: {
    width: 150,
    height: 150,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 75,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#00aaff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  goBackButton: {
    marginTop: 20,
  },
  goBackText: {
    color: '#555',
    fontSize: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activePaginationDot: {
    backgroundColor: '#00aaff',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});