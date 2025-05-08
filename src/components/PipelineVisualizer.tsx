
import React from 'react';
import { cn } from '@/lib/utils';
import { Play, X, Clock, RefreshCw } from 'lucide-react';
import { Pipeline } from '@/lib/demoData';
import PipelineStage from './PipelineStage';

interface PipelineVisualizerProps {
  pipeline: Pipeline;
}

const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({ pipeline }) => {
  const getStatusIcon = () => {
    switch (pipeline.status) {
      case 'success':
        return <Play className="w-5 h-5 text-pipeline-success" />;
      case 'running':
        return <RefreshCw className="w-5 h-5 text-pipeline-running animate-spin" />;
      case 'failed':
        return <X className="w-5 h-5 text-pipeline-failed" />;
      case 'pending':
      default:
        return <Clock className="w-5 h-5 text-pipeline-pending" />;
    }
  };

  const getStatusBadgeClass = () => {
    switch (pipeline.status) {
      case 'success':
        return 'bg-pipeline-success text-white';
      case 'running':
        return 'bg-pipeline-running text-white';
      case 'failed':
        return 'bg-pipeline-failed text-white';
      case 'pending':
      default:
        return 'bg-pipeline-pending text-white';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">{pipeline.name}</h2>
          <span className={cn("px-2 py-1 rounded-full text-xs", getStatusBadgeClass())}>
            {pipeline.status.charAt(0).toUpperCase() + pipeline.status.slice(1)}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Started: {new Date(pipeline.startTime).toLocaleTimeString()}</span>
          {pipeline.duration && <span>Duration: {pipeline.duration}</span>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {pipeline.stages.map((stage, index) => (
          <PipelineStage 
            key={stage.id} 
            stage={stage} 
            isFirst={index === 0} 
            isLast={index === pipeline.stages.length - 1} 
          />
        ))}
      </div>
    </div>
  );
};

export default PipelineVisualizer;
