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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Search, 
  Filter, 
  Download,
  CheckCircle2,
  AlertCircle,
  Clock
} from "lucide-react"

const historySnapshots = [
  {
    id: "SNAP-001",
    name: "Snapshot Q1 2024",
    status: "completed",
    startTime: "2024-03-15 10:00:00",
    endTime: "2024-03-15 11:30:00",
    type: "Mensuel",
    size: "2.5 GB",
    duration: "1h 30m"
  },
  {
    id: "SNAP-002",
    name: "Snapshot Journalier",
    status: "failed",
    startTime: "2024-03-14 12:00:00",
    endTime: "2024-03-14 12:15:00",
    type: "Quotidien",
    size: "1.2 GB",
    duration: "15m"
  },
  {
    id: "SNAP-003",
    name: "Snapshot Hebdomadaire",
    status: "completed",
    startTime: "2024-03-13 09:00:00",
    endTime: "2024-03-13 10:30:00",
    type: "Hebdomadaire",
    size: "3.1 GB",
    duration: "1h 30m"
  }
]

const statusColors = {
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  running: "bg-blue-100 text-blue-800"
}

const statusIcons = {
  completed: CheckCircle2,
  failed: AlertCircle,
  running: Clock
}

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Historique des Snapshots</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher..." className="pl-8" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="completed">Complétés</SelectItem>
              <SelectItem value="failed">Échoués</SelectItem>
              <SelectItem value="running">En cours</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique complet</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Début</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Taille</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historySnapshots.map((snapshot) => {
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
                    <TableCell>{snapshot.startTime}</TableCell>
                    <TableCell>{snapshot.endTime}</TableCell>
                    <TableCell>{snapshot.type}</TableCell>
                    <TableCell>{snapshot.size}</TableCell>
                    <TableCell>{snapshot.duration}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
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