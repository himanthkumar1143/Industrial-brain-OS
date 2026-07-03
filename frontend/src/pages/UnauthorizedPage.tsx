import React from "react";
import { Link } from "react-router-dom";

export const UnauthorizedPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] text-slate-100">
    <h1 className="text-5xl font-extrabold mb-4 text-rose-400">403 – Access Denied</h1>
    <p className="text-lg mb-6">You do not have permission to view this page.</p>
    <Link to="/" className="px-5 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition">
      Return to Home
    </Link>
  </div>
);
