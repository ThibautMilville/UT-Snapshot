'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreVertical, Play, Pause, Trash, Edit, Download } from 'lucide-react';

interface Snapshot {
  id: string;
  name: string;
  collection: string;
  type: 'full' | 'specific' | 'criteria';
  status: 'running' | 'paused' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  nextRun: string;
  cost: number;
}

const mockSnapshots: Snapshot[] = [
  {
    id: '1',
    name: 'Snapshot Collection A',
    collection: 'Collection A',
    type: 'full',
    status: 'running',
    progress: 75,
    createdAt: '2024-03-20T10:00:00Z',
    nextRun: '2024-03-21T10:00:00Z',
    cost: 17,
  },
  {
    id: '2',
    name: 'Snapshot Collection B',
    collection: 'Collection B',
    type: 'specific',
    status: 'paused',
    progress: 30,
    createdAt: '2024-03-19T15:00:00Z',
    nextRun: '2024-03-20T15:00:00Z',
    cost: 12,
  },
  {
    id: '3',
    name: 'Snapshot Collection B',
    collection: 'Collection B',
    type: 'specific',
    status: 'paused',
    progress: 30,
    createdAt: '2024-03-19T15:00:00Z',
    nextRun: '2024-03-20T15:00:00Z',
    cost: 12,
  },
  {
    id: '4',
    name: 'Snapshot Collection B',
    collection: 'Collection B',
    type: 'specific',
    status: 'paused',
    progress: 30,
    createdAt: '2024-03-19T15:00:00Z',
    nextRun: '2024-03-20T15:00:00Z',
    cost: 12,
  },
  {
    id: '5',
    name: 'Snapshot Collection B',
    collection: 'Collection B',
    type: 'specific',
    status: 'paused',
    progress: 30,
    createdAt: '2024-03-19T15:00:00Z',
    nextRun: '2024-03-20T15:00:00Z',
    cost: 12,
  },
  {
    id: '6',
    name: 'Snapshot Collection B',
    collection: 'Collection B',
    type: 'specific',
    status: 'paused',
    progress: 30,
    createdAt: '2024-03-19T15:00:00Z',
    nextRun: '2024-03-20T15:00:00Z',
    cost: 12,
  },
  {
    id: '7',
    name: 'Snapshot Collection B',
    collection: 'Collection B',
    type: 'specific',
    status: 'paused',
    progress: 30,
    createdAt: '2024-03-19T15:00:00Z',
    nextRun: '2024-03-20T15:00:00Z',
    cost: 12,
  },
  {
    id: '8',
    name: 'Snapshot Collection B',
    collection: 'Collection B',
    type: 'specific',
    status: 'paused',
    progress: 30,
    createdAt: '2024-03-19T15:00:00Z',
    nextRun: '2024-03-20T15:00:00Z',
    cost: 12,
  },
];

export function SnapshotListFixed() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>(mockSnapshots);

  const getStatusColor = (status: Snapshot['status']) => {
    switch (status) {
      case 'running':
        return 'bg-[#AC46E7]';
      case 'paused':
        return 'bg-[#8757B2]';
      case 'completed':
        return 'bg-[#622C6C]';
      case 'failed':
        return 'bg-[#28274A]';
      default:
        return 'bg-[#28274A]';
    }
  };

  const handleAction = (id: string, action: string) => {
    console.log(`Action ${action} on snapshot ${id}`);
  };
  return (
    <Card className="bg-primary/20 border-none mt-20 shadow-sm shadow-secondary">
      <CardHeader>
        <CardTitle className
="text-white text-sm text-left">Jobs of snapshots on chain</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <Table className="w-full text-xs sm:text-sm">
            <TableHeader>
              <TableRow className="border-b border-[#28274A] hover:bg-[#28274A]/50">
                <TableHead className="text-white px-2 sm:px-4">Name</TableHead>
                <TableHead className="text-white hidden lg:table-cell px-2 sm:px-4">Collection</TableHead>
                <TableHead className="text-white hidden lg:table-cell px-2 sm:px-4">Type</TableHead>
                <TableHead className="text-white px-2 sm:px-4">Status</TableHead>
                <TableHead className="text-white px-2 sm:px-4">Progress</TableHead>
                <TableHead className="text-white hidden lg:table-cell px-2 sm:px-4">Next Run</TableHead>
                <TableHead className="text-white px-2 sm:px-4">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {snapshots.map((snapshot) => (
                <TableRow key={snapshot.id} className="border-b border-[#28274A] hover:bg-[#28274A]/50">
                  <TableCell className="font-medium text-white px-2 sm:px-4">
                    <div className="flex flex-col">
                      <span>{snapshot.name}</span>
                      <span className="text-[10px] text-white/60 lg:hidden">
                        {snapshot.collection} • {snapshot.type === 'full' ? 'Full Collection' : snapshot.type === 'specific' ? 'Specific Tokens' : 'By Criteria'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-white hidden lg:table-cell px-2 sm:px-4">{snapshot.collection}</TableCell>
                  <TableCell className="text-white hidden lg:table-cell px-2 sm:px-4">
                    {snapshot.type === 'full'
                      ? 'Full Collection'
                      : snapshot.type === 'specific'
                      ? 'Specific Tokens'
                      : 'By Criteria'}
                  </TableCell>
                  <TableCell className="px-2 sm:px-4">
                    <Badge
                      className={`${getStatusColor(snapshot.status)} text-white shadow-[0_0_10px_rgba(172,70,231,0.3)] text-[10px] sm:text-xs`}
                    >
                      {snapshot.status === 'running'
                        ? 'Running'
                        : snapshot.status === 'paused'
                        ? 'Paused'
                        : snapshot.status === 'completed'
                        ? 'Completed'
                        : 'Failed'}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-2 sm:px-4">
                    <div className="w-full bg-[#28274A] rounded-full h-1.5 sm:h-2 shadow-[0_0_10px_rgba(98,44,108,0.3)] overflow-hidden">
                      <div
                        className="bg-[#AC46E7] h-1.5 sm:h-2 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(172,70,231,0.3)] relative"
                        style={{ width: `${snapshot.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white hidden lg:table-cell px-2 sm:px-4">
                    {new Date(snapshot.nextRun).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-white px-2 sm:px-4">
                    <div className="flex flex-col">
                      <span>{snapshot.cost} UOS</span>
                      <span className="text-[10px] text-white/60 lg:hidden">
                        Next: {new Date(snapshot.nextRun).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
} 