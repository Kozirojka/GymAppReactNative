import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// цей скрін потрінбий у тому випадку коли користувач нажме на кнопку "Schedule" у BookingScreen
const CoachScheduleDetail = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Coach Schedule</Text>
            <Text style={styles.text}>Your schedule is available until:</Text>
            <Text style={styles.date}>December 31, 2025</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default CoachScheduleDetail;