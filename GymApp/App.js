import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Button, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text} onPress={toggleModal}>Tap to show bottom sheet</Text>
      <Button title="Show Modal" color="red" onPress={toggleModal} />

      <Modal 
        isVisible={isModalVisible} 
        style={styles.modal} 
        onBackdropPress={toggleModal} 
        backdropOpacity={0.5}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Hello from bottom sheet!</Text>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    color: 'red',
    marginBottom: 20,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    height: '66%', // 2/3 екрану
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});