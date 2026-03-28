"use client";
import { useCreateUser } from "@/hooks/auth/create-user.hook";
import Link from "next/link";
import React, { FormEvent } from "react";

// interface SignUpProps {
//   data: CreateUser;
// }

export default function Login() {
  const {
    createUser,
    name,
    setName,
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
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="pt-4 grid grid-cols-[auto_1fr] gap-2">
              <p>Don&apos;t have an account?</p>
              <Link href="auth/sign-up" className="text-primary">
                Sign up here
              </Link>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
