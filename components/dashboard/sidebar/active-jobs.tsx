'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Timer, Users } from 'lucide-react';

interface ActiveJob {
  id: string;
  name: string;
  progress: number;
  status: 'running' | 'paused';
  type: 'snapshot' | 'distribution';
  estimatedTime: string;
  exportFormat?: 'csv' | 'json';
  rewardType?: 'uos' | 'uniq';
}

const mockActiveJobs: ActiveJob[] = [
  {
    id: '1',
    name: 'Ultra heroes collection',
    progress: 75,
    status: 'running',
    type: 'snapshot',
    estimatedTime: '15 min',
    exportFormat: 'csv'
  },
  {
    id: '2',
    name: 'Ultra heroes collection',
    progress: 30,
    status: 'running',
    type: 'distribution',
    estimatedTime: '45 min',
    rewardType: 'uos'
  },
  {
    id: '3',
    name: 'Ultra heroes collection',
    progress: 60,
    status: 'running',
    type: 'distribution',
    estimatedTime: '45 min',
    rewardType: 'uniq'
  },
];

export function ActiveJobs() {
  return (
    <Card className="mb-4 bg-primary/20 shadow-sm shadow-secondary">
      <CardHeader className="pb-4">
        <CardTitle className="text-md font-bold text-white">Jobs Actifs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {mockActiveJobs.map((job) => (
          <div key={job.id} className="space-y-2 bg-secondary/10 p-4 rounded-md">
            <div className="flex flex-col gap-2">
              <div className="space-y-2">
                <p className="text-sm font-medium leading-none text-white">{job.name}</p>
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-row items-center space-x-1">
                      <Calendar size={15} color='#FFFFFF'/>
                    <span className="text-xs text-white">
                      Weekly
                    </span>
                  </div>

                  <div className="flex flex-row items-center space-x-1">
                      <Timer size={15} color='#FFFFFF'/>
                    <span className="text-xs text-white">
                    Within 2 days
                    </span>
                  </div>

                  <div className="flex flex-row items-center space-x-1">
                      <Users size={15} color='#FFFFFF'/>
                    <span className="text-xs text-white">
                      3,403
                    </span>
                  </div>

                </div>
              </div>
              <Badge
                variant="secondary"
                className={`w-fit ${
                  job.type === 'snapshot'
                    ? 'bg-orange-800 text-white'
                    : job.rewardType === 'uos'
                      ? 'bg-green-900 text-white'
                      : 'bg-blue-900 text-white'
                }`}
              >
                {job.type === 'snapshot' 
                  ? `Export ${job.exportFormat?.toUpperCase()}`
                  : job.rewardType === 'uos'
                    ? 'UOS Airdrop'
                    : 'UNIQs Airdrop'
                }
              </Badge>
              <div className='flex flex-row justify-between'>
                <span className="text-xs font-medium text-white">Progression</span>
                <span className="text-xs font-medium text-white">{job.progress}%</span>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <Progress value={job.progress} className="h-2" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

const styles = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
} 