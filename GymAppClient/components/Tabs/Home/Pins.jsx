    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';

    const Pins = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pins</Text>
                <Text style={styles.description}>This is the Pins component.</Text>
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 10,
        },
        description: {
            fontSize: 16,
            color: '#666',
        },
    });

    export default Pins;