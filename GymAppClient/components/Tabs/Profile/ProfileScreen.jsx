import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  
  useEffect(() => {
    
    /*fetch('https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FUser_%2528computing%2529&psig=AOvVaw3fgLnb4val-_24doCQN-za&ust=1744117995351000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLjHlf__xYwDFQAAAAAdAAAAABAE') 
      .then(response => response.json())
      .then(data => setProfileImage(data.imageUrl))
      .catch(error => console.error('Error fetching image:', error));
    */

      setProfileImage("https://images.unsplash.com/photo-1601071160139-446ba0bc1492")
    }, []);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.subscription}>
            Subscription Start: Jan 1, 2025
          </Text>
          <Text style={styles.subscription}>
            Subscription End: Jan 1, 2026
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Saved Exercise" onPress={() => alert('Saved Exercise')} />
        <Button title="Renew Subscription" onPress={() => navigation.navigate('Subscription')} />
      </View>
      

      <View style={styles.nfcModule}>
        <Text style={styles.nfcText}>NFC Module</Text>
        <Image
          source={{ uri: 'https://example.com/nfc-image.png' }} 
          style={styles.nfcImage}
        />
        <Text style={styles.nfcText}>Use NFC here!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subscription: {
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  nfcModule: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  nfcImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  nfcText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;
