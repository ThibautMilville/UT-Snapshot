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
    status: 'completed',
    progress: 100,
    createdAt: '2024-03-19T15:00:00Z',
    nextRun: '2024-03-20T15:00:00Z',
    cost: 12,
  },
  {
    id: '6',
    name: 'Snapshot Collection B',
    collection: 'Collection B',
    type: 'specific',
    status: 'completed',
    progress: 100,
    createdAt: '2024-03-19T15:00:00Z',
    nextRun: '2024-03-20T15:00:00Z',
    cost: 12,
  },
  {
    id: '7',
    name: 'Snapshot Collection B',
    collection: 'Collection B',
    type: 'specific',
    status: 'completed',
    progress: 100,
    createdAt: '2024-03-19T15:00:00Z',
    nextRun: '2024-03-20T15:00:00Z',
    cost: 12,
  },
  {
    id: '8',
    name: 'Snapshot Collection B',
    collection: 'Collection B',
    type: 'specific',
    status: 'completed',
    progress: 100,
    createdAt: '2024-03-19T15:00:00Z',
    nextRun: '2024-03-20T15:00:00Z',
    cost: 12,
  },
];

export function SnapshotList() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>(mockSnapshots);

  const getStatusColor = (status: Snapshot['status']) => {
    switch (status) {
      case 'running':
        return 'bg-[#AC46E7]';
      case 'paused':
        return 'bg-[#FFA500]/70';
      case 'completed':
        return 'bg-green-600';
      case 'failed':
        return 'bg-red-900';
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
        <CardTitle className="text-white text-sm">All jobs of snapshots</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#28274A] hover:bg-[#28274A]/50">
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Collection</TableHead>
              <TableHead className="text-white">Type</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Progress</TableHead>
              <TableHead className="text-white">Next Run</TableHead>
              <TableHead className="text-white">Cost (UOS)</TableHead>
              <TableHead className="text-right text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {snapshots.map((snapshot) => (
              <TableRow key={snapshot.id} className="border-b border-[#28274A] hover:bg-[#28274A]/50">
                <TableCell className="font-medium text-white">{snapshot.name}</TableCell>
                <TableCell className="text-white">{snapshot.collection}</TableCell>
                <TableCell className="text-white">
                  {snapshot.type === 'full'
                    ? 'Full Collection'
                    : snapshot.type === 'specific'
                    ? 'Specific Tokens'
                    : 'By Criteria'}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${getStatusColor(snapshot.status)} text-white shadow-[0_0_10px_rgba(172,70,231,0.3)]`}
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
                <TableCell>
                  <div className="w-full bg-[#28274A] rounded-full h-2 shadow-[0_0_10px_rgba(98,44,108,0.3)] overflow-hidden">
                    <div
                      className="bg-[#AC46E7] h-2 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(172,70,231,0.3)] relative"
                      style={{ width: `${snapshot.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-white">
                  {new Date(snapshot.nextRun).toLocaleString()}
                </TableCell>
                <TableCell className="text-white">{snapshot.cost}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-[#28274A] shadow-[0_0_10px_rgba(98,44,108,0.3)]">
                        <MoreVertical className="h-4 w-4 text-white" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-foreground border-[#622C6C] shadow-[0_0_15px_rgba(172,70,231,0.3)]">
                      {snapshot.status === 'running' ? (
                        <DropdownMenuItem
                          onClick={() => handleAction(snapshot.id, 'pause')}
                          className="text-white hover:bg-[#622C6C] focus:bg-[#622C6C]"
                        >
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => handleAction(snapshot.id, 'resume')}
                          className="text-white hover:bg-[#622C6C] focus:bg-[#622C6C]"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Resume
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleAction(snapshot.id, 'edit')}
                        className="text-white hover:bg-[#622C6C] focus:bg-[#622C6C]"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction(snapshot.id, 'download')}
                        className="text-white hover:bg-[#622C6C] focus:bg-[#622C6C]"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction(snapshot.id, 'delete')}
                        className="text-white bg-red-800 hover:bg-red-900 focus:bg-red-900"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 