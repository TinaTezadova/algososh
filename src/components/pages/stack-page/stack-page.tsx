import React from "react";
import { StackVisualizer } from "../../stack-visualizer/stack-visualizer";
import { SolutionLayout } from "../../ui/solution-layout/solution-layout";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <StackVisualizer />
    </SolutionLayout>
  );
};
