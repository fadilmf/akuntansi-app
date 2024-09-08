"use client";

import { useRouter } from "next/navigation";

export default function Profile() {
  //   const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  const handleEdit = () => {
    // Logika untuk edit profile, bisa diarahkan ke halaman lain atau modal
    console.log("Edit profile clicked");
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <img
              src={"/logo_web.png"}
              alt={"User Avatar"}
              className="w-24 h-24 rounded-full shadow-md"
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Nama</h2>
            <p className="text-gray-600 mb-4">Email</p>
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-200"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
