import { db } from "../firebase";
import { doc, setDoc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { User } from "firebase/auth";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfileData {
  uid: string;
  username: string;
}

export const createUserProfile = async (user: User, displayName: string) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const userProfile: UserProfileData = {
      uid: user.uid,
      username: displayName,
    };

    await setDoc(userRef, userProfile);
    console.log("User profile created in Firestore:", userProfile);
    return userProfile;
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfileData | null> => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data() as UserProfileData;
      return data;
    } else {
      console.log("No user profile found for uid:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};
