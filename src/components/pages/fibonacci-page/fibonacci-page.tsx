import React from "react";
import { SolutionLayout } from "../../ui/solution-layout/solution-layout";
import { FibonacciVisualizer } from '../../fibonacci-visualizer/fibonacci-visualizer';

export const FibonacciPage: React.FC = () => {
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <FibonacciVisualizer />
    </SolutionLayout>
  );
};
