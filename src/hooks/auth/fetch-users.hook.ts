import { UserData } from "@/@types/auth/auth.types";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";

export const useFetchUsers = () => {
  const [isFetching, setIsFetching] = useState(false);

  const fetchUsers = async (): Promise<UserData[]> => {
    setIsFetching(true);

    try {
      const querySnapshot = await getDocs(collection(db, "users"));

      const users: UserData[] = [];

      querySnapshot.forEach((doc) => {
        const docData = doc.data() as Omit<UserData, "id">;

        users.push({
          id: doc.id,
          ...docData,
        });
      });

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    } finally {
      setIsFetching(false);
    }
  };

  return { userData:fetchUsers, isFetching };
};
