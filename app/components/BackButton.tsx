"use client";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <button
      onClick={handleGoBack}
      className="bg-slate-600 px-4 py-2 rounded-sm text-white"
    >
      Go Back
    </button>
  );
};

export default BackButton;
