import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="bg-gray-100 shadow-md">
      <div className="container mx-auto">
        <div className="navbar">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">
              Firebase
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 text-primary text-md">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/fetch-data">Fetch Data</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
