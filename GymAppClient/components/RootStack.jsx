import React, { useEffect, useReducer, useMemo, createContext, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

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

import SignInScreen from "./Tabs/Auth/SignInScreen";
import SignUpScreen from "./Tabs/Auth/SignUpScreen";
import SplashScreen from "./Tabs/Auth/SplashScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};


const authReducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        userRole: action.userRole,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
        userRole: action.userRole,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        userRole: null,
      };
  }
};

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
  const { userRole } = useAuth();
  
  return (  
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userRole === "Coach" ? (
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
        options={{ title: "Knowledge Library" }}
      />
      <Stack.Screen
        name="ExerciseDetails"
        component={ExcerciseDetails}
        options={{ title: "ExerciseDetails" }}
      />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
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

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

const AppNavigator = () => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
    userRole: null,
  });

  const decodeToken = (token) => {
    try {
      const decoded = jwt_decode(token);
      return {
        token,
        role: decoded.role,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return { token: null, role: null };
    }
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        
        if (userToken) {
          const { role } = decodeToken(userToken);
          dispatch({ type: 'RESTORE_TOKEN', token: userToken, userRole: role });
        } else {
          dispatch({ type: 'RESTORE_TOKEN', token: null, userRole: null });
        }
      } catch (e) {
        console.error("Failed to get token from storage:", e);
        dispatch({ type: 'RESTORE_TOKEN', token: null, userRole: null });
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(() => ({
    signIn: async (data) => {
      try {
        const { accessToken } = data;
        
        if (!accessToken) {
          throw new Error('Token not provided');
        }
        
        await AsyncStorage.setItem('userToken', accessToken);
        
        const { role } = decodeToken(accessToken);
        
        dispatch({ type: 'SIGN_IN', token: accessToken, userRole: role });
      } catch (error) {
        console.error("Sign in error:", error);
        throw error;
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        dispatch({ type: 'SIGN_OUT' });
      } catch (error) {
        console.error("Sign out error:", error);
      }
    },
    userToken: state.userToken,
    userRole: state.userRole,
  }), [state.userToken, state.userRole]);

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken ? (
          <MainTabNavigator />
        ) : (
          <AuthStackNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default AppNavigator;