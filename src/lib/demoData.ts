
export interface Pipeline {
  id: string;
  name: string;
  status: 'success' | 'pending' | 'running' | 'failed';
  startTime: string;
  duration: string;
  stages: PipelineStage[];
}

export interface PipelineStage {
  id: string;
  name: string;
  status: 'success' | 'pending' | 'running' | 'failed';
  startTime: string;
  duration: string;
}

export interface DockerContainer {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'created';
  port: string;
  created: string;
}

export interface InfoCard {
  title: string;
  description: string;
  icon: string;
}

// Demo pipeline data
export const pipelines: Pipeline[] = [
  {
    id: 'p1',
    name: 'Main Branch Deployment',
    status: 'running',
    startTime: '2023-05-08T10:30:00',
    duration: '10m 15s',
    stages: [
      {
        id: 's1',
        name: 'Build',
        status: 'success',
        startTime: '2023-05-08T10:30:00',
        duration: '2m 20s'
      },
      {
        id: 's2',
        name: 'Test',
        status: 'success',
        startTime: '2023-05-08T10:32:20',
        duration: '3m 45s'
      },
      {
        id: 's3',
        name: 'Docker Build',
        status: 'running',
        startTime: '2023-05-08T10:36:05',
        duration: '4m 10s'
      },
      {
        id: 's4',
        name: 'Deploy',
        status: 'pending',
        startTime: '',
        duration: ''
      }
    ]
  },
  {
    id: 'p2',
    name: 'Feature Branch Integration',
    status: 'success',
    startTime: '2023-05-08T09:15:00',
    duration: '15m 30s',
    stages: [
      {
        id: 's1',
        name: 'Build',
        status: 'success',
        startTime: '2023-05-08T09:15:00',
        duration: '3m 10s'
      },
      {
        id: 's2',
        name: 'Test',
        status: 'success',
        startTime: '2023-05-08T09:18:10',
        duration: '5m 20s'
      },
      {
        id: 's3',
        name: 'Docker Build',
        status: 'success',
        startTime: '2023-05-08T09:23:30',
        duration: '4m 00s'
      },
      {
        id: 's4',
        name: 'Deploy',
        status: 'success',
        startTime: '2023-05-08T09:27:30',
        duration: '3m 00s'
      }
    ]
  },
  {
    id: 'p3',
    name: 'Hotfix Deployment',
    status: 'failed',
    startTime: '2023-05-08T08:00:00',
    duration: '5m 45s',
    stages: [
      {
        id: 's1',
        name: 'Build',
        status: 'success',
        startTime: '2023-05-08T08:00:00',
        duration: '1m 30s'
      },
      {
        id: 's2',
        name: 'Test',
        status: 'failed',
        startTime: '2023-05-08T08:01:30',
        duration: '4m 15s'
      },
      {
        id: 's3',
        name: 'Docker Build',
        status: 'pending',
        startTime: '',
        duration: ''
      },
      {
        id: 's4',
        name: 'Deploy',
        status: 'pending',
        startTime: '',
        duration: ''
      }
    ]
  }
];

// Demo docker container data
export const containers: DockerContainer[] = [
  {
    id: 'c1',
    name: 'web-app',
    image: 'nginx:latest',
    status: 'running',
    port: '80:80',
    created: '1 hour ago'
  },
  {
    id: 'c2',
    name: 'api-server',
    image: 'node:18',
    status: 'running',
    port: '3000:3000',
    created: '1 hour ago'
  },
  {
    id: 'c3',
    name: 'database',
    image: 'postgres:14',
    status: 'running',
    port: '5432:5432',
    created: '1 hour ago'
  },
  {
    id: 'c4',
    name: 'cache',
    image: 'redis:latest',
    status: 'stopped',
    port: '6379:6379',
    created: '2 hours ago'
  }
];

// Educational info cards
export const infoCards: InfoCard[] = [
  {
    title: 'Continuous Integration',
    description: 'Automatically build and test code changes to detect problems early.',
    icon: 'GitBranchIcon'
  },
  {
    title: 'Continuous Delivery',
    description: 'Automate the delivery of applications to selected infrastructure environments.',
    icon: 'RocketIcon'
  },
  {
    title: 'Docker Containers',
    description: 'Package applications into standardized units for development, shipment and deployment.',
    icon: 'PackageIcon'
  },
  {
    title: 'Jenkins Pipelines',
    description: 'Define your build pipeline as code with Jenkins Pipeline.',
    icon: 'GitPullRequestIcon'
  }
];

// Function to simulate real-time updates
let updateInterval: ReturnType<typeof setInterval> | null = null;

export function startRealTimeUpdates(updateCallback: () => void) {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
  
  updateInterval = setInterval(() => {
    // Simulate progress in running pipelines
    pipelines.forEach(pipeline => {
      if (pipeline.status === 'running') {
        pipeline.stages.forEach(stage => {
          if (stage.status === 'running') {
            // 25% chance to complete a running stage
            if (Math.random() < 0.25) {
              stage.status = 'success';
              
              // Start the next pending stage if available
              const currentIndex = pipeline.stages.findIndex(s => s.id === stage.id);
              const nextStage = pipeline.stages[currentIndex + 1];
              if (nextStage && nextStage.status === 'pending') {
                nextStage.status = 'running';
                nextStage.startTime = new Date().toISOString();
              } else {
                // All stages complete
                pipeline.status = 'success';
              }
            }
          }
        });
      }
    });
    
    // Randomly change container statuses
    containers.forEach(container => {
      if (Math.random() < 0.1) {
        container.status = container.status === 'running' ? 'stopped' : 'running';
      }
    });
    
    updateCallback();
  }, 3000);
  
  return () => {
    if (updateInterval) {
      clearInterval(updateInterval);
    }
  };
}
