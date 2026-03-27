import { CreateUser } from "@/@types/auth/auth.types";
import { db } from "@/app/firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useState, FormEvent } from "react";

export const useCreateUser = () => {
  // Form state
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  // Status state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Check if email already exists
      const emailQuery = query(
        collection(db, "users"),
        where("email", "==", email),
      );
      const querySnapshot = await getDocs(emailQuery);
      if (!querySnapshot.empty) {
        setError("Email already exists");
        return;
      }

      // Password validation
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (!passwordRegex.test(password)) {
        setError(
          "Password must be at least 6 characters long and contain both letters and numbers",
        );
        return;
      }

      // Confirm password match
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Remove confirmPassword before saving
      const userData: CreateUser = { name, email, password, bio };

      const docRef = await addDoc(collection(db, "users"), {
        ...userData,
        createdAt: new Date(),
      });

      setSuccess("User successfully registered!");
      console.log("User created with ID:", docRef.id);

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setBio("");
    } catch (err) {
      console.error("Error creating user:", err);
      setError("Failed to create user. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createUser: handleCreateUser,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    bio,
    setBio,
    isLoading,
    error,
    success,
  };
};
