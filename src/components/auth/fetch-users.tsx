"use client";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

// Define the MessageData type
type MessageData = {
  id: string;
  name: string;
  age: number;
  bio: string;
};

// Fetch data from Firestore
// async function fetchDataFromFirestore(): Promise<MessageData[]> {
//   const querySnapshot = await getDocs(collection(db, "users"));
//   const data: MessageData[] = [];
//   querySnapshot.forEach((doc) => {
//     data.push({ id: doc.id, ...(doc.data() as MessageData) });
//   });
//   return data;
// }
async function fetchDataFromFirestore(): Promise<MessageData[]> {
  const querySnapshot = await getDocs(collection(db, "users"));
  const data: MessageData[] = [];
  querySnapshot.forEach((doc) => {
    // Avoid conflict by explicitly defining 'id' and spreading the rest of the data.
    const docData = doc.data() as Omit<MessageData, "id">; // Temporarily exclude 'id' type
    data.push({ id: doc.id, ...docData });
  });
  return data;
}

export default function FetchUsers() {
  const [userData, setUserData] = useState<MessageData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="pb-4">
        <h1 className="text-center font-bold text-2xl">
          Welcome to Data Fetching Page
        </h1>
      </div>
      <main className="flex min-h-screen items-center justify-center p-8 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-xl font-bold mb-6 text-center text-gray-800">
            Fetch Data from Firebase Firestore DB
          </h1>
          <div>
            {userData.length > 0 ? (
              userData.map((user) => (
                <div
                  key={user.id}
                  className="mb-4 p-4 border-b border-gray-200 last:border-0"
                >
                  <p className="text-lg font-semibold text-gray-700">
                    {user.name}
                  </p>
                  <p className="text-gray-500">Age: {user.age}</p>
                  <p className="text-gray-600">{user.bio}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Loading data...</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
