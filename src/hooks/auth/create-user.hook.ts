import { CreateUser } from "@/@types/auth/auth.types";
import { db } from "@/app/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

export const useCreateUser = () => {
  // Form state
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
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
      // Check if username already exists
      const usernameQuery = query(
        collection(db, "users"),
        where("username", "==", username),
      );

      const usernameQuerySnapshot = await getDocs(usernameQuery);
      if (!usernameQuerySnapshot.empty) {
        toast.error("Email already exists");
        setIsLoading(false);
        return;
      }

      // Check if email already exists
      const emailQuery = query(
        collection(db, "users"),
        where("email", "==", email),
      );

      const emailQuerySnapshot = await getDocs(emailQuery);
      if (!emailQuerySnapshot.empty) {
        toast.error("Email already exists");
        setIsLoading(false);
        return;
      }

      // Password validation
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
      if (!passwordRegex.test(password)) {
        toast.error(
          "Password must be at least 6 characters long and contain both letters and numbers",
        );
        setIsLoading(false);
        return;
      }

      // Confirm password match
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        setIsLoading(false);
        return;
      }

      // Remove confirmPassword before saving
      const userData: CreateUser = { name, username, email, password, bio };

      const docRef = await addDoc(collection(db, "users"), {
        ...userData,
        createdAt: serverTimestamp(),
      });

      toast.success("User successfully registered!");
      console.log("User created with ID:", docRef.id);

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setBio("");
    } catch (err) {
      console.error("Error creating user:", err);
      toast.error("Failed to create user. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createUser: handleCreateUser,
    name,
    setName,
    username,
    setUsername,
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
