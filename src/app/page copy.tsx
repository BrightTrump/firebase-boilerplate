"use client";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import React, { useState, FormEvent } from "react";

interface MessageData {
  name: string;
  email: string;
  message: string;
}

async function addDataToFirestore({
  name,
  email,
  message,
}: MessageData): Promise<boolean> {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      name,
      email,
      message,
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (err) {
    console.error("Error adding document: ", err);
    return false;
  }
}

export default function Home(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const added = await addDataToFirestore({ name, email, message });
    if (added) {
      setName("");
      setEmail("");
      setMessage("");
      alert("Data added to Firestore DB!");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-8 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add Data to Firestore
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
