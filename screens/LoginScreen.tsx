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
import { loginUser } from "../services/authService";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUser } from "../context/UserContext";

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login Functionality
  const login = async () => {
    try {
      if (email && password) {
        const user = await loginUser(email, password);
        setUser(user);
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
        <Text style={styles.title}>Login</Text>

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

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Pressable
          style={{ height: 48, marginTop: 8, justifyContent: "center", alignItems: "center" }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text>
            Not a user? <Text style={{ fontWeight: "bold" }}>Register.</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
