"use client"

import { ActiveJobs } from './sidebar/active-jobs';
import { RecentActivities } from './sidebar/recent-activities';

export function Sidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="h-full overflow-hidden px-4">
        <div className="space-y-2 h-auto">
          <ActiveJobs />
          <RecentActivities />
        </div>
      </div>
    </div>
  );
} 