import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import Contributions from './Contributions';
import Carousel from 'react-native-reanimated-carousel';

const PAGE_WIDTH = Dimensions.get('window').width;

const mockImages = [
  { uri: 'https://placekitten.com/400/300' },
  { uri: 'https://placebear.com/400/300' },
  { uri: 'https://picsum.photos/400/300' },
];

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Text style={styles.title}>🏠 Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />

      <Text style={styles.subTitle}>🖼 Галерея з залу</Text>
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
