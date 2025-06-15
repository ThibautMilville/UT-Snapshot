import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  PauseCircle, 
  PlayCircle,
  Search,
  Filter
} from "lucide-react"

const activeSnapshots = [
  {
    id: "SNAP-001",
    name: "Snapshot Q1 2024",
    status: "running",
    progress: 75,
    startTime: "2024-03-15 10:00:00",
    estimatedEnd: "2024-03-15 11:30:00",
    type: "Mensuel"
  },
  {
    id: "SNAP-002",
    name: "Snapshot Journalier",
    status: "pending",
    progress: 0,
    startTime: "2024-03-15 12:00:00",
    estimatedEnd: "2024-03-15 12:30:00",
    type: "Quotidien"
  },
  {
    id: "SNAP-003",
    name: "Snapshot Hebdomadaire",
    status: "paused",
    progress: 45,
    startTime: "2024-03-15 09:00:00",
    estimatedEnd: "2024-03-15 10:30:00",
    type: "Hebdomadaire"
  }
]

const statusColors = {
  running: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  paused: "bg-blue-100 text-blue-800",
  completed: "bg-gray-100 text-gray-800",
  failed: "bg-red-100 text-red-800"
}

const statusIcons = {
  running: Clock,
  pending: AlertCircle,
  paused: PauseCircle,
  completed: CheckCircle2,
  failed: AlertCircle
}

export default function ActiveSnapshotsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Snapshots Actifs</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher..." className="pl-8" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Snapshots en cours</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead>Début</TableHead>
                <TableHead>Fin estimée</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeSnapshots.map((snapshot) => {
                const StatusIcon = statusIcons[snapshot.status]
                return (
                  <TableRow key={snapshot.id}>
                    <TableCell className="font-medium">{snapshot.id}</TableCell>
                    <TableCell>{snapshot.name}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[snapshot.status]}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {snapshot.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${snapshot.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {snapshot.progress}%
                      </span>
                    </TableCell>
                    <TableCell>{snapshot.startTime}</TableCell>
                    <TableCell>{snapshot.estimatedEnd}</TableCell>
                    <TableCell>{snapshot.type}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {snapshot.status === "running" ? (
                          <Button variant="outline" size="sm">
                            <PauseCircle className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <PlayCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 