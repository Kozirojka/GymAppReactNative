import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  StyleSheet 
} from 'react-native';


const AddInterval = ({ visible, onClose, onAddInterval }) => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    onAddInterval({ start, end, price });
    onClose(); 
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        onPress={onClose}
        testID="modal-overlay"
      >
        <TouchableOpacity activeOpacity={1} style={styles.container}>
          <Text style={styles.title}>Додати інтервал</Text>

          <TextInput
            style={styles.input}
            placeholder="Початок інтервалу"
            value={start}
            onChangeText={setStart}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Кінець інтервалу"
            value={end}
            onChangeText={setEnd}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Ціна за годину (опційно)"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Затвердити</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '40%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4da6ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddInterval;