import React, { useState, useCallback } from "react";
import {
  Brain,
  BookOpen,
  Network,
  Shield,
  ShieldCheck,
  Rocket,
  LayoutDashboard,
} from "../constants/icons";
import {
  PROBLEMS,
  SOLUTIONS,
  FEATURES,
  ROLES,
  STATS,
  TECH_STACK,
} from "../constants";
import {
  HeroSection,
  SectionContainer,
  SectionHeading,
  ProblemCard,
  SolutionCard,
  FeatureCard,
  RoleCard,
  StatCard,
  TechBadge,
} from "../components/landing";
import { ModalManager } from "../components/demo";
import type { DemoMetadata } from "../components/landing/HeroSection";

/**
 * LandingPage – Enterprise-grade landing page for Industrial Brain OS.
 *
 * Sections:
 *  1. Hero (id="hero")
 *  2. Problems (id="problems")
 *  3. Solutions (id="solutions")
 *  4. Platform Features (id="features")
 *  5. User Roles (id="roles")
 *  6. Platform Statistics (id="stats")
 *  7. Technology Stack (id="technology")
 *  8. Footer (id="footer")
 *
 * Integrated with ModalManager (Sprint 1 - Step 4 Refactor) for coordinating dialog walkthroughs.
 */
export const LandingPage: React.FC = () => {
  const [activeDemoKey, setActiveDemoKey] = useState<string | null>(null);

  /**
   * Explore Demo click handler – triggers the ModalManager with the corresponding role key.
   */
  const handleExploreDemoClick = useCallback((metadata?: DemoMetadata) => {
    const targetKey = metadata?.role ? metadata.role.toLowerCase() : "general";
    setActiveDemoKey(targetKey);
  }, []);

  const handleCloseDemoModal = useCallback(() => {
    setActiveDemoKey(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 overflow-x-hidden relative">
      {/* ──── Architectural Modal Manager Suite ──── */}
      <ModalManager
        activeModal={activeDemoKey ? "exploreDemo" : null}
        demoKey={activeDemoKey}
        onClose={handleCloseDemoModal}
      />

      {/* ──── 1. Hero Section ──── */}
      <HeroSection onExploreDemoClick={handleExploreDemoClick} />

      {/* ──── 2. Problem Section ──── */}
      <div className="border-t border-border/50">
        <SectionContainer id="problems" ariaLabel="Industry Challenges">
          <SectionHeading
            id="heading-problems"
            badge="The Challenge"
            title="Why Industries Need Industrial Brain OS"
            subtitle="Manufacturing and industrial operations face critical knowledge management challenges that cost billions annually in downtime, rework, and lost expertise."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROBLEMS.map((problem) => (
              <ProblemCard
                key={problem.title}
                icon={problem.icon}
                title={problem.title}
                description={problem.description}
              />
            ))}
          </div>
        </SectionContainer>
      </div>

      {/* ──── 3. Solution Section ──── */}
      <div className="border-t border-border/50 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
        <SectionContainer id="solutions" ariaLabel="Platform Solutions">
          <SectionHeading
            id="heading-solutions"
            badge="Our Solution"
            title="How Industrial Brain OS Solves This"
            subtitle="A comprehensive AI-powered platform that captures, organizes, validates, and delivers industrial knowledge exactly when and where it's needed."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTIONS.map((solution) => (
              <SolutionCard
                key={solution.title}
                icon={solution.icon}
                title={solution.title}
                description={solution.description}
              />
            ))}
          </div>
        </SectionContainer>
      </div>

      {/* ──── 4. Platform Features ──── */}
      <div className="border-t border-border/50">
        <SectionContainer id="features" ariaLabel="AI Modules & Features">
          <SectionHeading
            id="heading-features"
            badge="Platform Capabilities"
            title="Powerful AI Modules"
            subtitle="Eight integrated modules working together to create a unified industrial intelligence platform."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                badge={feature.badge}
              />
            ))}
          </div>
        </SectionContainer>
      </div>

      {/* ──── 5. User Roles Section ──── */}
      <div className="border-t border-border/50 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
        <SectionContainer id="roles" ariaLabel="Role-Based Access Modules">
          <SectionHeading
            id="heading-roles"
            badge="Role-Based Access"
            title="Designed for Every Team Member"
            subtitle="Tailored experiences for different roles in your organization, ensuring the right people have access to the right tools."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {ROLES.map((role) => (
              <RoleCard
                key={role.title}
                icon={role.icon}
                role={role.role}
                title={role.title}
                description={role.description}
                highlights={role.highlights}
                modules={role.modules}
                accentColor={role.accentColor}
                accentBg={role.accentBg}
                accentBorder={role.accentBorder}
                loginPath={role.loginPath}
                onExploreDemoClick={handleExploreDemoClick}
              />
            ))}
          </div>
        </SectionContainer>
      </div>

      {/* ──── 6. Platform Statistics ──── */}
      <div className="border-t border-border/50">
        <SectionContainer id="stats" ariaLabel="Platform Statistics">
          <SectionHeading
            id="heading-stats"
            badge="By the Numbers"
            title="Enterprise-Grade Platform"
            subtitle="Built with enterprise security, scalability, and reliability at its core."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </SectionContainer>
      </div>

      {/* ──── 7. Technology Stack ──── */}
      <div className="border-t border-border/50 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
        <SectionContainer id="technology" ariaLabel="Technology Stack">
          <SectionHeading
            id="heading-technology"
            badge="Technology"
            title="Modern Technology Stack"
            subtitle="Built with industry-leading technologies for performance, reliability, and developer experience."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {TECH_STACK.map((stack) => (
              <div
                key={stack.category}
                className="bg-[#101018]/90 border border-border rounded-2xl p-6 text-center transition-all duration-300 hover:border-primary/30 hover:-translate-y-1"
              >
                <h3 className={`text-lg font-bold mb-5 ${stack.color}`}>
                  {stack.category}
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {stack.items.map((tech) => (
                    <TechBadge
                      key={tech}
                      name={tech}
                      color={stack.color}
                      bgColor={stack.bgColor}
                      borderColor={stack.borderColor}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </div>

      {/* ──── 8. Footer ──── */}
      <footer id="footer" aria-label="Footer" className="border-t border-border/50 bg-card/20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* About */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                  <Brain className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <span className="text-xl font-bold text-slate-100">
                  Industrial Brain OS
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                The AI-powered operating system for industrial knowledge management.
                Transforming how organizations capture, preserve, and deploy expert knowledge
                across every level of their operation.
              </p>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">
                Platform
              </h4>
              <ul className="space-y-3" aria-label="Platform Links">
                {[
                  { label: "AI Copilot", icon: Brain },
                  { label: "Knowledge Repository", icon: BookOpen },
                  { label: "Knowledge Graph", icon: Network },
                  { label: "Expert Vault", icon: Shield },
                  { label: "Compliance Center", icon: ShieldCheck },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors">
                    <item.icon className="h-4 w-4 text-primary/60" aria-hidden="true" />
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Future Roadmap */}
            <div>
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">
                Roadmap
              </h4>
              <ul className="space-y-3" aria-label="Future Roadmap Items">
                {[
                  "Industrial Analytics Dashboard",
                  "Predictive Maintenance AI",
                  "Multi-plant Federation",
                  "Mobile Field Companion",
                  "AR-guided Maintenance",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-400">
                    <Rocket className="h-4 w-4 text-amber-500/60" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Industrial Brain OS. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <LayoutDashboard className="h-4 w-4 text-primary/40" aria-hidden="true" />
              <span>Built for Industrial AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
