import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, AlertCircle, CheckCircle2, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import MoneyRecharge from "./righsidebar/moneyRecharge"
import MoneySend from "./righsidebar/moneySend"
import CollectionComponent from "../collectionComponent"

export function RightSidebar() {
  return (
    <div className="flex h-full">
      <div className="flex-1 h-fit ">
        <div className="px-4 space-y-4">
          <MoneyRecharge />

          {/* <MoneySend /> */}

          {/* <Card className="border-none shadow-none bg-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-white">Notifications Récentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-green-100 p-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-senibold text-white">Snapshot complété</p>
                  <p className="text-xs text-muted-foreground">Snapshot #1234 a été complété avec succès</p>
                  <p className="text-xs text-muted-foreground">Il y a 2 minutes</p>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <X className="h-4 w-4" color="white"/>
                </Button>
              </div>

              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-yellow-100 p-1">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-senibold text-white">Snapshot en attente</p>
                  <p className="text-xs text-muted-foreground">Snapshot #1235 est en attente de validation</p>
                  <p className="text-xs text-muted-foreground">Il y a 15 minutes</p>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <X className="h-4 w-4" color="white"/>
                </Button>
              </div>
            </CardContent>
          </Card> */}

          {/* <Card className="border-none shadow-none bg-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold text-white">Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                Créer un nouveau snapshot
              </Button>
              <Button className="w-full" variant="outline">
                Voir les snapshots actifs
              </Button>
              <Button className="w-full" variant="outline">
                Exporter les rapports
              </Button>
            </CardContent>
          </Card> */}

          {/* <CollectionComponent /> */}
        </div>
      </div>
    </div>
  )
} 