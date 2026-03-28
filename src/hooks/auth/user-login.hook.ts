import { db } from "@/app/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

export const useLogin = () => {
  // Form state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Status state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUserLogin = async (e: FormEvent) => {
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

      toast.success("User successfully registered!");
      console.log(`User with ID:", ${docRef.id} successfuly logged in!`);

      // Clear form

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Error creating user:", err);
      toast.error("Failed to create user. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginUser: handleUserLogin,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    success,
  };
};
