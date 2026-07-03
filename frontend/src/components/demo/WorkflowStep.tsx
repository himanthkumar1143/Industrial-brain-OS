import React from "react";
import type { DemoWorkflowStep as StepData, DemoColorTheme } from "../../constants/demo";
import { ArrowDown } from "../../constants/icons";

interface WorkflowStepProps {
  step: StepData;
  totalSteps: number;
  theme: DemoColorTheme;
  isLast: boolean;
}

/**
 * WorkflowStep – Individual node in the role workflow timeline sequence.
 * Renders step indicator as a circular numbered badge without '#', icon, module name, and connecting arrow.
 */
export const WorkflowStep: React.FC<WorkflowStepProps> = React.memo(({
  step,
  totalSteps,
  theme,
  isLast,
}) => {
  const Icon = step.icon;

  return (
    <div className="relative flex flex-col items-center text-center sm:text-left sm:flex-row sm:items-start gap-4 p-4 rounded-xl bg-[#13131e] border border-border/60 hover:border-border transition-colors">
      {/* Circular Numbered Badge & Icon Node */}
      <div className="flex items-center gap-3 shrink-0">
        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs text-white ${theme.timelineColor} shadow-md`}>
          {step.step}
        </div>
        <div className={`p-2.5 rounded-xl border ${theme.primaryBg} ${theme.primaryBorder}`}>
          <Icon className={`h-5 w-5 ${theme.primaryText}`} aria-hidden="true" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Step {step.step} of {totalSteps}
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <h4 className="text-base font-bold text-slate-100">{step.title}</h4>
          </div>
          <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${theme.primaryBg} ${theme.primaryText} ${theme.primaryBorder}`}>
            {step.moduleName}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Vertical timeline connector arrow on mobile/desktop */}
      {!isLast && (
        <div className="sm:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 text-slate-600">
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </div>
      )}
    </div>
  );
});

WorkflowStep.displayName = "WorkflowStep";
