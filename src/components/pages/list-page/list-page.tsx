import React from "react";
import { ListVisualizer } from "../../list-visualizer/list-visualizer";
import { SolutionLayout } from "../../ui/solution-layout/solution-layout";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <ListVisualizer />

    </SolutionLayout>
  );
};
