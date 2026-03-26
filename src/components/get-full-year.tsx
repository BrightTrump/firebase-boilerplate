"use client";
import { useEffect, useState } from "react";

export default function GetFullYear() {
  const [isYear, setIsYear] = useState<number | null>(null);
  useEffect(() => {
    setIsYear(new Date().getFullYear());
  }, []);
  return <span>{isYear}</span>;
}
