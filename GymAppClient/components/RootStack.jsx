
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./Tabs/Home/HomeScreen";
import ProfileScreen from "./Tabs/Profile/ProfileScreen";
import BookingScreen from "./Tabs/Booking/Student/BookingScreen";
import KnowledgeLibrary from "./Tabs/KnowledgeLibrary/KnowledgeLibrary";
import DetailsScreen from "./Tabs/Home/DetailsScreen";
import Subscription from "./Tabs/Profile/Subscription";
import CoachScheduleDetail from "./Tabs/Booking/Student/CoachScheduleDetail";
import CoachScheduleOwn from "./Tabs/Booking/Coach/CoachSheduleOwn";
import IntervalsDetails from "./Tabs/Booking/Coach/IntervalsDetails";
import ExcerciseDetails from "./Tabs/KnowledgeLibrary/ExerciseDetails";
import EditProfile from "./Tabs/Profile/EditProfile";

import { useAuth } from "../Context/AuthProvider";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

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

const BookingStack = () => {
  const role = useAuth() || "coach"; 
  
  return (  
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {role === "coach" ? (
        <Stack.Screen name="CoachOwn" component={CoachScheduleOwn} />
      ) : (
        <Stack.Screen name="BookingMain" component={BookingScreen} />
      )}
      
      <Stack.Screen name="Schedule" component={CoachScheduleDetail} />
      <Stack.Screen name="IntervalsDetails" component={IntervalsDetails} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <ProfileStack.Screen
        name="Subscription"
        component={Subscription}
        options={{ title: "Subscription" }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: "EditProfile" }}
      />
    </ProfileStack.Navigator>
  );
};


const KnowledgeLibraryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="KnowledgeLibraryMain"
        component={KnowledgeLibrary}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="ExerciseDetails"
        component={ExcerciseDetails}
        options={{ title: "ExerciseDetails" }}
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
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Profile") iconName = "person-outline";
          else if (route.name === "Booking") iconName = "calendar-outline";
          else if (route.name === "Library") iconName = "book-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Booking" component={BookingStack} />
      <Tab.Screen name="Library" component={KnowledgeLibraryStack} />
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
