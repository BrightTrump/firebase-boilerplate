import { MessageData } from "@/@types/home/home.types";
import { db } from "@/app/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

export const useCreateMessage = () => {
  const [loading, setLoading] = useState(false);

  const addMessage = async (data: MessageData): Promise<boolean> => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        ...data,
      });

      console.log("Document written with ID:", docRef.id);
      return true;
    } catch (err) {
      console.error("Error adding document:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addMessage, loading };
};
