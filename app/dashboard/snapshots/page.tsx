import { Button } from '@/components/ui/button';
import { SnapshotList } from '@/components/dashboard/snapshot/snapshot-list';
import { SnapshotHistory } from '@/components/dashboard/snapshot/snapshot-history';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function SnapshotsPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Snapshots</h1>
        <Link href="/dashboard/snapshots/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Snapshot
          </Button>
        </Link>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Snapshots Actifs</h2>
        <SnapshotList />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Historique</h2>
        <SnapshotHistory />
      </div>
    </div>
  );
} 