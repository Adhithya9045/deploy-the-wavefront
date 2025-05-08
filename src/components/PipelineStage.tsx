
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle, AlertCircle, Clock } from 'lucide-react';
import { PipelineStage as PipelineStageType } from '@/lib/demoData';

interface PipelineStageProps {
  stage: PipelineStageType;
  isFirst?: boolean;
  isLast?: boolean;
}

const PipelineStage: React.FC<PipelineStageProps> = ({ stage, isFirst = false, isLast = false }) => {
  const getStatusIcon = () => {
    switch (stage.status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-pipeline-success" />;
      case 'running':
        return <Circle className="w-5 h-5 text-pipeline-running animate-pulse-opacity" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-pipeline-failed" />;
      case 'pending':
      default:
        return <Clock className="w-5 h-5 text-pipeline-pending" />;
    }
  };

  const getStatusClass = () => {
    switch (stage.status) {
      case 'success':
        return 'border-pipeline-success bg-green-50';
      case 'running':
        return 'border-pipeline-running bg-blue-50 animate-pulse-opacity';
      case 'failed':
        return 'border-pipeline-failed bg-red-50';
      case 'pending':
      default:
        return 'border-pipeline-pending bg-yellow-50';
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!isFirst && (
        <div className="pipeline-connector w-full mb-2"></div>
      )}
      <div className={cn(
        "border-2 rounded-md p-3 w-full",
        getStatusClass()
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <h3 className="font-medium">{stage.name}</h3>
          </div>
          {stage.duration && (
            <span className="text-xs text-gray-500">{stage.duration}</span>
          )}
        </div>
      </div>
      {!isLast && (
        <div className="pipeline-connector w-full mt-2"></div>
      )}
    </div>
  );
};

export default PipelineStage;
