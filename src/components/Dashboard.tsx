
import React, { useState, useEffect } from 'react';
import PipelineVisualizer from './PipelineVisualizer';
import DockerContainer from './DockerContainer';
import InfoCard from './InfoCard';
import { pipelines, containers, infoCards, startRealTimeUpdates } from '@/lib/demoData';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Play, Square } from 'lucide-react';

const Dashboard = () => {
  const [pipelinesData, setPipelinesData] = useState(pipelines);
  const [containersData, setContainersData] = useState(containers);
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);

  // Real-time updates
  useEffect(() => {
    if (isAutoRefresh) {
      const cleanupFn = startRealTimeUpdates(() => {
        setPipelinesData([...pipelines]);
        setContainersData([...containers]);
      });
      
      return cleanupFn;
    }
  }, [isAutoRefresh]);

  const handleManualRefresh = () => {
    setPipelinesData([...pipelines]);
    setContainersData([...containers]);
  };

  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">CI/CD Pipeline Dashboard</h1>
          <p className="text-gray-600">
            Real-time visualization of Jenkins Pipelines and Docker Containers
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Active Pipelines</h2>
          <div className="flex space-x-2">
            <Button
              variant={isAutoRefresh ? "secondary" : "outline"}
              size="sm"
              onClick={() => setIsAutoRefresh(!isAutoRefresh)}
              className="flex items-center space-x-1"
            >
              {isAutoRefresh ? (
                <Square className="h-4 w-4 mr-1" />
              ) : (
                <Play className="h-4 w-4 mr-1" />
              )}
              <span>{isAutoRefresh ? "Stop Auto Refresh" : "Start Auto Refresh"}</span>
            </Button>
            <Button
              variant="outline" 
              size="sm"
              onClick={handleManualRefresh}
              className="flex items-center space-x-1"
              disabled={isAutoRefresh}
            >
              <RefreshCcw className="h-4 w-4 mr-1" />
              <span>Refresh</span>
            </Button>
          </div>
        </div>

        <div className="mb-8">
          {pipelinesData.map(pipeline => (
            <PipelineVisualizer key={pipeline.id} pipeline={pipeline} />
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Docker Containers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {containersData.map(container => (
              <DockerContainer key={container.id} container={container} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">CI/CD Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {infoCards.map((info, index) => (
              <InfoCard key={index} info={info} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
