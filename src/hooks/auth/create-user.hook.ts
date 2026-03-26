import { CreateUser } from "@/@types/auth/auth.types";
import { db } from "@/app/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (data: CreateUser): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Validation
      if (data.password !== data.confirmPassword) {
        alert("Passwords do not match");
        return false;
      }

      // Remove confirmPassword before saving
      const { confirmPassword, ...userData } = data;

      const docRef = await addDoc(collection(db, "users"), {
        ...userData,
        createdAt: new Date(),
      });

      console.log("User created with ID:", docRef.id);

      return true;
    } catch (err) {
      console.error("Error creating user:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { createUser, isLoading };
};
