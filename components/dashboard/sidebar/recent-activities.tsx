'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, PauseCircle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'snapshot' | 'distribution' | 'system';
  status: 'success' | 'error' | 'warning';
  message: string;
  timestamp: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'snapshot',
    status: 'success',
    message: 'Snapshot Collection A terminé avec succès',
    timestamp: '2 min',
  },
  {
    id: '2',
    type: 'distribution',
    status: 'error',
    message: 'Erreur lors de la distribution UOS',
    timestamp: '15 min',
  },
  {
    id: '3',
    type: 'system',
    status: 'warning',
    message: 'Mise à jour système disponible',
    timestamp: '1h',
  },
];

export function RecentActivities() {
  const getStatusIcon = (status: Activity['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <PauseCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className='bg-primary/20 shadow-sm shadow-secondary'>
      <CardHeader className="pb-4">
        <CardTitle className="text-md font-bold text-white">Recents activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start justify-between">
            <div className="flex items-start space-x-2">
              <div className="mt-1 bg-highlight h-4 w-4 rounded-full" />
              <div className="space-y-4">
                <p className="text-sm leading-none text-white">UNIQ airdrop</p>
                <p className="text-xs text-white/40">Cosmic warrior</p>
                <p className="text-xs text-white">340 UNIQ sent</p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              {activity.timestamp}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 