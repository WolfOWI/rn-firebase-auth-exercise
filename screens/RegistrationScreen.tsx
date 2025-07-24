import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { createUserProfile } from "../services/userService";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUser } from "../context/UserContext";

const RegistrationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { setUser } = useUser();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Registration Functionality
  const register = async () => {
    try {
      if (username && email && password && confirmPassword) {
        if (password === confirmPassword) {
          const user = await registerUser(email, password);
          // Create user profile in Firestore
          if (user) {
            await createUserProfile(user, username);
            setUser(user);
          }
          // Registration successful, user will be automatically logged in
          // and the App.tsx will handle navigation to Profile screen
        } else {
          console.log("Passwords don't match.");
        }
      } else {
        console.log("Fill in all the fields.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <TextInput
          style={styles.inputField}
          placeholder="Username"
          onChangeText={(newText) => setUsername(newText)}
          defaultValue={username}
        />

        <TextInput
          style={styles.inputField}
          placeholder="Email"
          onChangeText={(newText) => setEmail(newText)}
          defaultValue={email}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.inputField}
          placeholder="Password"
          onChangeText={(newText) => setPassword(newText)}
          defaultValue={password}
          secureTextEntry={true}
          keyboardType="visible-password"
        />

        <TextInput
          style={styles.inputField}
          placeholder="Confirm Password"
          onChangeText={(newText) => setConfirmPassword(newText)}
          defaultValue={confirmPassword}
          secureTextEntry={true}
          keyboardType="visible-password"
        />

        <TouchableOpacity style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Pressable
          style={{ height: 48, marginTop: 8, justifyContent: "center", alignItems: "center" }}
          onPress={() => navigation.goBack()}
        >
          <Text>
            Already have an account? <Text style={{ fontWeight: "bold" }}>Login.</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 30,
  },
  inputField: {
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "black",
    textAlign: "center",
    padding: 10,
    marginTop: 30,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
});
