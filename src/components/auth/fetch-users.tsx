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
          <h1 className="text-xl font-bold mb-6 text-center">
            Fetch User(s) from Firebase Firestore DB
          </h1>
          <div>
            {isFetching ? (
              <p className="text-center text-gray-500">Loading data...</p>
            ) : users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  className="text-lg mb-4 p-4 border-b border-gray-200 last:border-0 [&>div]:grid [&>div]:grid-cols-[auto_1fr] [&>div]:gap-4  [&_p]:font-semibold [&_p]:w-24 [&_p]:text-black [&_span]:text-gray-600"
                >
                  <div>
                    <p>Fullname:</p>
                    <span>{user.name ?? "Nil"}</span>
                  </div>
                  <div>
                    <p className="">Email: </p>
                    <span className="text-primary">{user.email ?? "Nil"}</span>
                  </div>
                  <div>
                    <p className="">Age: </p>
                    <span>{user.age ?? "Nil"}</span>
                  </div>
                  <div>
                    <p className="">Bio: </p>
                    <span>{user.bio ?? "Nil"}</span>
                  </div>
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
