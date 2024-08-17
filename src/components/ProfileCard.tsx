import React from "react";

export default function ProfileCard() {
  return (
    <div className="flex gap-2 border-t p-4">
      <div className="rounded-full h-12 w-12 bg-blue-400 text-white flex items-center justify-center">
        <p>FF</p>
      </div>
      <div>
        <h1 className="font-bold text-lg">Fadil Fauzan</h1>
        <p className="text-neutral-500 text-sm">fadil@email.com</p>
      </div>
    </div>
  );
}
