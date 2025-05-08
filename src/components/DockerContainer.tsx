
import React from 'react';
import { cn } from '@/lib/utils';
import { DockerContainer as DockerContainerType } from '@/lib/demoData';
import { Box, Play, Square, Clock } from 'lucide-react';

interface DockerContainerProps {
  container: DockerContainerType;
}

const DockerContainer: React.FC<DockerContainerProps> = ({ container }) => {
  const getStatusIcon = () => {
    switch (container.status) {
      case 'running':
        return <Play className="w-4 h-4 text-green-500" />;
      case 'stopped':
        return <Square className="w-4 h-4 text-red-500" />;
      case 'created':
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusClass = () => {
    switch (container.status) {
      case 'running':
        return 'bg-green-100 border-green-200 text-green-800';
      case 'stopped':
        return 'bg-red-100 border-red-200 text-red-800';
      case 'created':
      default:
        return 'bg-yellow-100 border-yellow-200 text-yellow-800';
    }
  };

  return (
    <div className="docker-container border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="bg-docker-dark p-2 text-white flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Box className="w-5 h-5" />
          <span className="font-medium">{container.name}</span>
        </div>
        <div className="text-xs bg-docker-light rounded px-2 py-1">
          {container.image}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">Port Mapping:</span>
          <span className="text-sm font-mono">{container.port}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">Created:</span>
          <span className="text-sm">{container.created}</span>
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-sm text-gray-500">Status:</span>
          <div className={cn(
            "flex items-center space-x-1 px-2 py-1 rounded text-xs",
            getStatusClass()
          )}>
            {getStatusIcon()}
            <span>{container.status.charAt(0).toUpperCase() + container.status.slice(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DockerContainer;
