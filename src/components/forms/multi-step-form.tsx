"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui-shadcn/button";

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface MultiStepFormProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  children: React.ReactNode;
  isSubmitting?: boolean;
  canGoNext?: boolean;
  completedSteps?: Set<number>;
}

export function MultiStepForm({
  steps,
  currentStep,
  onStepChange,
  onComplete,
  children,
  isSubmitting = false,
  canGoNext = true,
  completedSteps = new Set(),
}: MultiStepFormProps) {
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="space-y-8">
      {/* Stepper */}
      <nav aria-label="Progresso">
        <ol className="flex items-center">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.has(index) || index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <li
                key={step.id}
                className={cn(
                  "relative flex-1",
                  index !== steps.length - 1 && "pr-8 sm:pr-20"
                )}
              >
                {/* Connector line */}
                {index !== steps.length - 1 && (
                  <div
                    className="absolute left-0 top-4 -right-4 sm:-right-10 h-0.5"
                    aria-hidden="true"
                  >
                    <div
                      className={cn(
                        "h-full w-full ml-8",
                        isCompleted ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"
                      )}
                    />
                  </div>
                )}

                <button
                  type="button"
                  className="group relative flex items-center"
                  onClick={() => {
                    if (isCompleted || index <= currentStep) {
                      onStepChange(index);
                    }
                  }}
                  disabled={!isCompleted && index > currentStep}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full relative z-10">
                    {isCompleted ? (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500">
                        <Check className="h-4 w-4 text-white" />
                      </span>
                    ) : isCurrent ? (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-500 bg-white dark:bg-gray-900">
                        <span className="text-sm font-semibold text-brand-500">
                          {index + 1}
                        </span>
                      </span>
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900">
                        <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
                          {index + 1}
                        </span>
                      </span>
                    )}
                  </span>
                  <span className="ml-3 hidden min-w-0 sm:flex sm:flex-col">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isCurrent
                          ? "text-brand-500"
                          : isCompleted
                          ? "text-gray-800 dark:text-white/90"
                          : "text-gray-400 dark:text-gray-500"
                      )}
                    >
                      {step.title}
                    </span>
                    {step.description && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {step.description}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Step Content */}
      <div className="min-h-[200px]">{children}</div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Button
          type="button"
          variant="outline"
          onClick={() => onStepChange(currentStep - 1)}
          disabled={currentStep === 0}
        >
          Voltar
        </Button>

        {isLastStep ? (
          <Button
            type="button"
            onClick={onComplete}
            disabled={isSubmitting || !canGoNext}
          >
            {isSubmitting ? "Enviando..." : "Concluir"}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => onStepChange(currentStep + 1)}
            disabled={!canGoNext}
          >
            Próximo
          </Button>
        )}
      </div>
    </div>
  );
}
