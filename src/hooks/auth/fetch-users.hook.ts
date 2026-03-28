import { UserData } from "@/@types/auth/auth.types";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useFetchUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsFetching(true);

      try {
        // Oder users by newest
        const usersQuery = query(
          collection(db, "users"),
          orderBy("createdAt", "desc"),
        );

        const snapshot = await getDocs(usersQuery);
        snapshot.forEach((doc) => {
          console.log(doc);
        });

        const fetchedUsers: UserData[] = [];

        snapshot.forEach((doc) => {
          const docData = doc.data() as Omit<UserData, "id">;

          fetchedUsers.push({
            id: doc.id,
            ...docData,
          });
        });

        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, isFetching };
};
