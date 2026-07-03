import React from "react";
import type { DemoWorkflowStep as StepData, DemoColorTheme } from "../../constants/demo";
import { WorkflowStep } from "./WorkflowStep";

interface WorkflowTimelineProps {
  steps: StepData[];
  theme: DemoColorTheme;
}

/**
 * WorkflowTimeline – Renders the vertical workflow sequence for the selected demo role.
 * Clearly maps how knowledge or administrative actions progress step-by-step.
 */
export const WorkflowTimeline: React.FC<WorkflowTimelineProps> = React.memo(({
  steps,
  theme,
}) => (
  <div className="p-6 sm:p-8 border-b border-border/60">
    <div className="mb-6">
      <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-1">
        Operational Workflow Pathway
      </h3>
      <p className="text-sm text-slate-400">
        Step-by-step progression of how this role operates within Industrial Brain OS.
      </p>
    </div>

    <div className="space-y-4 relative">
      {steps.map((step, index) => (
        <WorkflowStep
          key={step.step}
          step={step}
          totalSteps={steps.length}
          theme={theme}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  </div>
));

WorkflowTimeline.displayName = "WorkflowTimeline";
