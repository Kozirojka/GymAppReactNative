import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Subscription = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Subscription Details</Text>
            <Text style={styles.text}>Your subscription is active until:</Text>
            <Text style={styles.date}>December 31, 2025</Text>
            <Button title="Renew Subscription" onPress={() => alert('Renew Subscription')} />

            <Button title="Go back" onPress={() => navigation.goBack()} />

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default Subscription;