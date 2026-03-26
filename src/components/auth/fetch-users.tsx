"use client";
import { UserData } from "@/@types/auth/auth.types";
import { useFetchUsers } from "@/hooks/auth/fetch-users.hook";
import React, { useEffect, useState } from "react";

export default function FetchUsers() {
  const { userData, isFetching } = useFetchUsers();
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await userData();
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <>
      <div className="pb-4">
        <h1 className="text-center font-bold text-2xl">
          Welcome to Users Fetching Page
        </h1>
      </div>
      <main className="flex min-h-screen items-center justify-center p-8 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-xl font-bold mb-6 text-center text-gray-800">
            Fetch User(s) from Firebase Firestore DB
          </h1>
          <div>
            {isFetching ? (
              <p className="text-center text-gray-500">Loading data...</p>
            ) : users.length > 0 ? (
              users.map((user) => (
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
              <p className="text-center text-gray-500">No user found!</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
