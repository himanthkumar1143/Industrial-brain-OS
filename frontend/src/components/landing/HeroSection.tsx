import React from "react";
import { Brain, Cpu, Network, Zap, Sparkles, ArrowRight } from "../../constants/icons";
import { CTAButton } from "./CTAButton";

export interface DemoMetadata {
  role?: string;
  title?: string;
  modules?: string[];
}

interface HeroSectionProps {
  onExploreDemoClick?: (metadata?: DemoMetadata) => void;
}

/**
 * HeroSection – Full-screen hero with industrial AI graphics,
 * tagline, value proposition, and dual CTA buttons. Optimized for Lighthouse performance.
 */
export const HeroSection: React.FC<HeroSectionProps> = React.memo(({ onExploreDemoClick }) => (
  <section id="hero" aria-label="Hero section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Static atmospheric background glows (optimized for zero GPU repainting cost) */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/6 rounded-full blur-[90px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[120px]" />
    </div>

    {/* Grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />

    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left – Text content */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold tracking-wider uppercase text-primary">
              AI-Powered Industrial Intelligence
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6">
            <span className="text-slate-100">Industrial</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400">
              Brain OS
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl font-medium text-slate-300 mb-4">
            The Operating System for Industrial Knowledge
          </p>

          {/* Value proposition */}
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            Capture, preserve, and deploy expert knowledge across your entire industrial operation.
            AI-powered intelligence that transforms tribal knowledge into organizational wisdom.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <CTAButton
              label="Explore Demo"
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() =>
                onExploreDemoClick?.({
                  role: "general",
                  title: "Platform Overview",
                  modules: ["AI Copilot", "Knowledge Repository", "Knowledge Graph"],
                })
              }
            />
            <CTAButton
              label="Login"
              onClick={() => {
                const rolesEl = document.getElementById("roles");
                if (rolesEl) {
                  rolesEl.scrollIntoView({ behavior: "smooth" });
                }
              }}
              variant="secondary"
              size="lg"
            />
          </div>
        </div>

        {/* Right – Industrial AI illustration */}
        <div className="hidden lg:flex items-center justify-center" aria-hidden="true">
          <div className="relative w-full max-w-md aspect-square">
            {/* Central brain icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative p-8 rounded-3xl bg-[#12121c] border border-border shadow-[0_8px_60px_rgb(0,0,0,0.5)]">
                <Brain className="h-20 w-20 text-primary" />
                {/* Subtle static ring */}
                <div className="absolute inset-0 rounded-3xl border-2 border-primary/20" />
              </div>
            </div>

            {/* Orbiting nodes (static atmospheric positioning) */}
            <div className="absolute top-4 right-8 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shadow-lg">
              <Cpu className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="absolute bottom-8 left-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 shadow-lg">
              <Network className="h-6 w-6 text-amber-400" />
            </div>
            <div className="absolute top-12 left-8 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 shadow-lg">
              <Zap className="h-6 w-6 text-cyan-400" />
            </div>
            <div className="absolute bottom-16 right-4 p-3 rounded-xl bg-primary/10 border border-primary/20 shadow-lg">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>

            {/* Connection lines (decorative) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <line x1="30%" y1="15%" x2="50%" y2="50%" stroke="hsl(263, 70%, 50%)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="75%" y1="12%" x2="50%" y2="50%" stroke="hsl(160, 60%, 45%)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="15%" y1="80%" x2="50%" y2="50%" stroke="hsl(38, 92%, 50%)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="80%" y1="75%" x2="50%" y2="50%" stroke="hsl(263, 70%, 50%)" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
));

HeroSection.displayName = "HeroSection";
