import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import Contributions from './Contributions';
import Carousel from 'react-native-reanimated-carousel';
import Pins from './Pins';
const PAGE_WIDTH = Dimensions.get('window').width;

const mockImages = [
  { uri: 'https://placekitten.com/400/300' },
  { uri: 'https://placebear.com/400/300' },
  { uri: 'https://picsum.photos/400/300' },
];

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(false); 

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>

      {loading ? (
        <Text>Loading...</Text> 
      ) : (
        data && <Text>{JSON.stringify(data)}</Text> 
      )}

      <Carousel
        width={PAGE_WIDTH * 0.9}
        height={200}
        autoPlay={true}
        data={mockImages}
        scrollAnimationDuration={3000}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.uri }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      />

      <Pins/>
      <View style={{ height: 30 }} />
      <Contributions />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    marginVertical: 20,
  },
  image: {
    width: PAGE_WIDTH * 0.9,
    height: 200,
    borderRadius: 12,
  },
});

export default HomeScreen;
