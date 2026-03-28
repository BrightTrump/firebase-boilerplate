import { LoginRequestBody } from "@/@types/auth/auth.types";
import { db } from "@/app/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
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
      if (querySnapshot.empty) {
        toast.error("No user found with this email!");
        setIsLoading(false);
        return;
      }

      // Get user data
      const doc = querySnapshot.docs[0];
      const userData = doc.data() as LoginRequestBody;

      // Password match
      if (userData.password !== password) {
        toast.error("Incorrect password!");
        setIsLoading(false);
        return;
      }

      // Success
      toast.success(`Welcome back, ${userData.username}!`);
      setSuccess(`Logged in as ${userData.username}`);
      console.log(`User with ID: ${doc.id} successfully logged in!`);

      // Clear form
      setEmail("");
      setPassword("");

      // Redirect to dashboard
      router.push("/dashboard");
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
