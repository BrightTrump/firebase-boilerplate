"use client";
import { Icon, Icons } from "@/components/ui";
import { useLogin } from "@/hooks/auth/user-login.hook";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

export default function Login() {
  const [isRememberMe, setIsRememberMe] = useState(false);
  const { loginUser, email, setEmail, password, setPassword, isLoading } =
    useLogin();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    loginUser(e);
  };

  const handleToggleIsRemeberMe = () => {
    setIsRememberMe(!isRememberMe);
  };
  return (
    <main className="flex min-h-screen items-center justify-center p-8 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
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

            <div className="flex items-center justify-between py-4">
              <button
                type="button"
                onClick={handleToggleIsRemeberMe}
                className="grid grid-flow-col items-center gap-3 text-right text-sm font-semibold"
              >
                <span
                  className={`w-[18px] h-[18px] grid place-content-center rounded-sm border-2 transition-all ${
                    isRememberMe
                      ? "bg-primary border-primary"
                      : "bg-white border-gray-500"
                  }`}
                >
                  <Icon type={Icons.Check} className="text-sm text-[#FFFFFF]" />
                </span>
                Remember Me
              </button>

              <Link href={"#"} className="text-primary text-sm">
                Forgot Password?
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

          <div className="pt-4 grid grid-cols-[auto_1fr] gap-2">
            <p>Don&apos;t have an account?</p>
            <Link href="auth/sign-up" className="text-primary">
              Sign up here
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
