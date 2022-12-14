import React from "react";
import { SolutionLayout } from "../../ui/solution-layout/solution-layout";
import { StringVisualizer } from '../../string-visualizer/string-visualizer';

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <StringVisualizer />
    </SolutionLayout>
  );
};
