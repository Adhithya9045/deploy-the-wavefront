
import React from 'react';
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Dashboard />
      </main>
      <footer className="bg-jenkins-dark text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>CI/CD Pipeline Visualization with Jenkins and Docker</p>
          <p className="text-sm text-gray-400 mt-1">
            An educational tool for understanding CI/CD workflows and container deployments
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
