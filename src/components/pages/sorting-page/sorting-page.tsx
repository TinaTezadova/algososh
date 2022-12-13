import React from "react";
import { SortVisualizer } from "../../sort-visualizer/sort-visualizer";
import { SolutionLayout } from "../../ui/solution-layout/solution-layout";

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <SortVisualizer />
    </SolutionLayout>
  );
};
