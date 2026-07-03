import React from "react";
import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";

/**
 * NotFoundPage – 404 page displayed for unknown routes.
 * Provides navigation back to the landing page.
 */
export const NotFoundPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] text-slate-100 px-4">
    {/* Icon */}
    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6">
      <FileQuestion className="h-12 w-12 text-amber-400" />
    </div>

    {/* Heading */}
    <h1 className="text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 mb-3">
      404
    </h1>
    <p className="text-xl font-semibold text-slate-200 mb-2">Page Not Found</p>
    <p className="text-sm text-slate-400 mb-8 text-center max-w-md">
      The page you are looking for does not exist or has been moved.
    </p>

    {/* Actions */}
    <div className="flex gap-4">
      <Link
        to="/"
        className="px-6 py-2.5 rounded-xl bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-all font-medium text-sm"
      >
        Go Home
      </Link>
      <Link
        to="/dashboard"
        className="px-6 py-2.5 rounded-xl bg-slate-800/60 text-slate-300 border border-border hover:bg-slate-800 transition-all font-medium text-sm"
      >
        Dashboard
      </Link>
    </div>
  </div>
);
