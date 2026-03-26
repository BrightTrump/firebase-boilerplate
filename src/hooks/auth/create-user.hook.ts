import { CreateUser } from "@/@types/auth/auth.types";
import { db } from "@/app/firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { FormEvent, useState } from "react";

export const useCreateUser = () => {
  // Form state
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  // Status state
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<string | null>(null);

  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault();
    setIsError(null);
    setIsSuccess(null);
    setIsLoading(true);

    try {
      //Check if email already exist
      const isEmailExist = query(
        collection(db, "users"),
        where("eamil", "==", data.email),
      );
      const querySnapshot = await getDocs(isEmailExist);
      if (!querySnapshot.empty) {
        alert("Email already exist");
        return false;
      }

      // Password validation
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (!passwordRegex.test(data.password)) {
        alert(
          "Password must be at least 6 characters long and contain both letters and numbers",
        );
        return false;
      }
      // Confirm password match
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

  return { createUser: handleCreateUser, isLoading };
};
