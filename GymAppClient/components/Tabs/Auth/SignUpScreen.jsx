import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const SignUpScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
        
            <Text>Welcome to GymApp</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
});

export default SignUpScreen;