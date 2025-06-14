import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { SnapshotList } from "@/components/dashboard/snapshot/snapshot-list"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <Link
          href={"/dashboard/create"}
        >
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau Snapshot
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary/10 shadow-sm shadow-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-white">Snapshots Realized</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">8</div>
            <p className="text-xs text-muted-foreground">
              +2 depuis hier
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 shadow-sm shadow-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-white">Active Snapshots</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">16</div>
            <p className="text-xs text-muted-foreground">
              +4 cette semaine
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 shadow-sm shadow-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-white">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-muted-foreground">
              -1 depuis hier
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 shadow-sm shadow-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-white">Success Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">94%</div>
            <p className="text-xs text-muted-foreground">
              +2% ce mois-ci
            </p>
          </CardContent>
        </Card>
      </div>

      <SnapshotList />
    </div>
  )
} 