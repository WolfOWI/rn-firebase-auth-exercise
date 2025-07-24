import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { logOutUser } from "../services/authService";
import { getUserProfile, UserProfileData } from "../services/userService";
import { useUser } from "../context/UserContext";

const ProfileScreen = () => {
  const { user } = useUser();
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };
    fetchUserProfile();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logOutUser();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <Text>Profile</Text>

        <Text>{user?.email}</Text>
        <Text>{userProfile?.username || "No username"}</Text>

        <Button title="Sign Out" color="green" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
