
import React from 'react';
import { InfoCard as InfoCardType } from '@/lib/demoData';
import { GitBranch, Rocket, Package, GitPullRequest } from 'lucide-react';

interface InfoCardProps {
  info: InfoCardType;
}

const InfoCard: React.FC<InfoCardProps> = ({ info }) => {
  const getIcon = () => {
    switch (info.icon) {
      case 'GitBranchIcon':
        return <GitBranch className="w-8 h-8 text-jenkins-light" />;
      case 'RocketIcon':
        return <Rocket className="w-8 h-8 text-jenkins-light" />;
      case 'PackageIcon':
        return <Package className="w-8 h-8 text-docker-light" />;
      case 'GitPullRequestIcon':
      default:
        return <GitPullRequest className="w-8 h-8 text-jenkins-light" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="bg-gray-100 p-3 rounded-full">
          {getIcon()}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{info.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{info.description}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
