"use client";

import React from "react";

export default function error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="bg-red-600 h-screen grid place-items-center">
      <h1 className="text-4xl text-white">{error.message}</h1>
    </div>
  );
}
