"use client";

import Board from "@/components/Board";
import { useAuth } from "@/contexts/AuthContext";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user.uid) {
      router.push("/");
    }
  }, [user]);

  return (
    <main>
      <div className="p-6 w-full sm:ml-64 mt-14 mb-6">
        <Board />
      </div>
    </main>
  );
};

export default Dashboard;
