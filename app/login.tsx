import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Dimensions } from "react-native";
import { auth } from "../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { router } from "expo-router";
import { Button, TextInput } from "react-native";
import { red } from "react-native-reanimated/lib/typescript/Colors";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.credentialsBox}>
          <TextInput
            style={styles.input}
            placeholder="email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <Button title="Sign In" onPress={signIn} />
        <Button title="Sign Up" onPress={signUp} />
      </View>
    </SafeAreaView>
  );
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: "5%",
  },
  credentialsBox: {
    gap: 10,
    marginBottom: "5%",
  },
  input: {
    backgroundColor: "white",
    width: screenWidth * 0.6,
    height: screenHeight * 0.055,
    borderRadius: 10,
    textAlign: "center",
  },
});
