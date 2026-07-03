import React from "react";
import { Link } from "react-router-dom";

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] text-slate-100">
      <h1 className="text-4xl font-extrabold mb-6">Industrial Brain OS</h1>
      <p className="text-lg mb-8">Welcome to the future of industrial knowledge management.</p>
      <div className="flex gap-4">
        <Link
          to="/login/junior"
          className="px-6 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition"
        >
          Junior Login
        </Link>
        <Link
          to="/login/senior"
          className="px-6 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition"
        >
          Senior Login
        </Link>
        <Link
          to="/login/admin"
          className="px-6 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition"
        >
          Admin Login
        </Link>
      </div>
    </div>
  );
};
