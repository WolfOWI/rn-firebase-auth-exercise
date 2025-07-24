import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./screens/ProfileScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import { UserProvider, useUser } from "./context/UserContext";

const Stack = createNativeStackNavigator();

function AppContent() {
  const { user } = useUser();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // User is logged in
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        ) : (
          // User is NOT logged in
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name="Register"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
