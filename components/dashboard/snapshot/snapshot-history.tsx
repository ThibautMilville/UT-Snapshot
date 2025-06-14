'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Eye, Trash } from 'lucide-react';

interface CompletedSnapshot {
  id: string;
  name: string;
  collection: string;
  type: 'full' | 'specific' | 'criteria';
  completedAt: string;
  tokensCount: number;
  holdersCount: number;
  cost: number;
  status: 'success' | 'partial' | 'failed';
}

const mockCompletedSnapshots: CompletedSnapshot[] = [
  {
    id: '1',
    name: 'Snapshot Collection A',
    collection: 'Digital Dreams',
    type: 'full',
    completedAt: '2024-03-20T10:00:00Z',
    tokensCount: 10000,
    holdersCount: 5000,
    cost: 17,
    status: 'success',
  },
  {
    id: '2',
    name: 'Snapshot Collection B',
    collection: 'Digital Dreams',
    type: 'specific',
    completedAt: '2024-03-19T15:00:00Z',
    tokensCount: 5000,
    holdersCount: 2500,
    cost: 12,
    status: 'partial',
  },
  {
    id: '3',
    name: 'Snapshot Collection C',
    collection: 'Digital Dreams',
    type: 'criteria',
    completedAt: '2024-03-18T09:00:00Z',
    tokensCount: 2000,
    holdersCount: 1000,
    cost: 8,
    status: 'failed',
  },
  {
    id: '4',
    name: 'Snapshot Collection C',
    collection: 'Digital Dreams',
    type: 'criteria',
    completedAt: '2024-03-18T09:00:00Z',
    tokensCount: 2000,
    holdersCount: 1000,
    cost: 8,
    status: 'failed',
  },
  {
    id: '5',
    name: 'Snapshot Collection C',
    collection: 'Digital Dreams',
    type: 'criteria',
    completedAt: '2024-03-18T09:00:00Z',
    tokensCount: 2000,
    holdersCount: 1000,
    cost: 8,
    status: 'failed',
  },
  {
    id: '6',
    name: 'Snapshot Collection C',
    collection: 'Digital Dreams',
    type: 'criteria',
    completedAt: '2024-03-18T09:00:00Z',
    tokensCount: 2000,
    holdersCount: 1000,
    cost: 8,
    status: 'failed',
  },
  {
    id: '7',
    name: 'Snapshot Collection C',
    collection: 'Digital Dreams',
    type: 'criteria',
    completedAt: '2024-03-18T09:00:00Z',
    tokensCount: 2000,
    holdersCount: 1000,
    cost: 8,
    status: 'failed',
  },
];

export function SnapshotHistory() {
  const getStatusColor = (status: CompletedSnapshot['status']) => {
    switch (status) {
      case 'success':
        return 'bg-[#AC46E7]';
      case 'partial':
        return 'bg-[#8757B2]';
      case 'failed':
        return 'bg-red-900';
      default:
        return 'bg-[#622C6C]';
    }
  };

  const getStatusText = (status: CompletedSnapshot['status']) => {
    switch (status) {
      case 'success':
        return 'Success';
      case 'partial':
        return 'Partial';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="bg-primary/20 border-none mt-8 shadow-sm shadow-secondary">
      <CardHeader>
        <CardTitle className="text-white text-sm font-bold">Snapshot History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#28274A] hover:bg-[#28274A]/50">
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Collection</TableHead>
              <TableHead className="text-white">Type</TableHead>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white">Tokens</TableHead>
              <TableHead className="text-white">Holders</TableHead>
              <TableHead className="text-white">Cost (UOS)</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-right text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCompletedSnapshots.map((snapshot) => (
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
                <TableCell className="text-white">
                  {new Date(snapshot.completedAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-white">{snapshot.tokensCount.toLocaleString()}</TableCell>
                <TableCell className="text-white">{snapshot.holdersCount.toLocaleString()}</TableCell>
                <TableCell className="text-white">{snapshot.cost}</TableCell>
                <TableCell>
                  <Badge
                    className={`${getStatusColor(snapshot.status)} text-white shadow-[0_0_10px_rgba(172,70,231,0.3)]`}
                  >
                    {getStatusText(snapshot.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" className="hover:bg-[#28274A] shadow-[0_0_10px_rgba(98,44,108,0.3)]">
                      <Eye className="h-4 w-4 text-white" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-[#28274A] shadow-[0_0_10px_rgba(98,44,108,0.3)]">
                      <Download className="h-4 w-4 text-white" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-[#28274A] shadow-[0_0_10px_rgba(172,70,231,0.3)]">
                      <Trash className="h-4 w-4 text-[#AC46E7]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 