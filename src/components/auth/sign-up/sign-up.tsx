"use client";
import { useCreateUser } from "@/hooks/auth/create-user.hook";
import Link from "next/link";
import React, { FormEvent } from "react";

// interface SignUpProps {
//   data: CreateUser;
// }

export default function SignUp() {
  const {
    createUser,
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
  } = useCreateUser();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    createUser(e);
  };
  return (
    <main className="flex min-h-screen items-center justify-center p-8 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Register
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 [&_label]:block [&_label]:text-sm [&_label]:font-medium [&_label]:text-gray-700 [&_input]:mt-1 [&_input]:px-4 [&_input]:py-2 [&_input]:w-full [&_input]:border [&_input]:border-gray-300 [&_input]:rounded-md [&_input]:shadow-sm [&_input]:focus:outline-none [&_input]:focus:ring-2 [&_input]:focus:ring-blue-500 [&_input]:focus:border-blue-500"
        >
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
              rows={4}
            />

            <div className="pt-4 grid grid-cols-[auto_1fr] gap-2">
              <p>Already have an account?</p>
              <Link href="/" className="text-primary">
                Login here
              </Link>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
}
