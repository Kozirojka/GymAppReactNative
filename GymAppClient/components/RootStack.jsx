import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './Tabs/Home/HomeScreen';
import ProfileScreen from './Tabs/Profile/ProfileScreen';
import BookingScreen from './Tabs/Booking/BookingScreen';
import KnowledgeLibrary from './Tabs/KnowledgeLibrary/KnowledgeLibrary';
import DetailsScreen from './Tabs/Home/DetailsScreen'; 

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="HomeMain" 
          component={HomeScreen} 
          options={{ title: "Home" }} 
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: "Details" }} 
        />
      </Stack.Navigator>
    );
  };
  

const MainNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'Profile') iconName = 'person-outline';
            else if (route.name === 'Booking') iconName = 'calendar-outline';
            else if (route.name === 'Library') iconName = 'book-outline';
  
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Booking" component={BookingScreen} />
        <Tab.Screen name="Library" component={KnowledgeLibrary} />
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };
  
export default MainNavigator;
