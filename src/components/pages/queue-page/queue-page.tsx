import React from "react";
import { QueueVisualizer } from "../../queue-visualizer/queue-visualizer";
import { SolutionLayout } from "../../ui/solution-layout/solution-layout";

export const QueuePage: React.FC = () => {
  return (
    <SolutionLayout title="Очередь">
      <QueueVisualizer />

    </SolutionLayout>
  );
};
