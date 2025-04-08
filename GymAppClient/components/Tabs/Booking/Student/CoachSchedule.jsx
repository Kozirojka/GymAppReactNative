import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

//820
<<<<<<< HEAD:GymAppClient/components/Tabs/Booking/CoachSchedule.jsx

=======
// цей скрін потрінбий у тому випадку коли користувач нажме на кнопку "Schedule" у BookingScreen
>>>>>>> 3d7431d54f6ba61bdfcc10278bb6e67adff7a1ea:GymAppClient/components/Tabs/Booking/Student/CoachSchedule.jsx
const CoachSchedule = ({navigation}) => {

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

export default CoachSchedule;