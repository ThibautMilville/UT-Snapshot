import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="paris">Paris (CET)</SelectItem>
                    <SelectItem value="newyork">New York (EST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="fr">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="darkMode" />
                <Label htmlFor="darkMode">Dark Mode</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="emailNotifications" />
                <Label htmlFor="emailNotifications">Email Notifications</Label>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email for notifications</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="successNotifications" />
                <Label htmlFor="successNotifications">Success Notifications</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="errorNotifications" />
                <Label htmlFor="errorNotifications">Error Notifications</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="apiKey">API Key Ultra</Label>
                <Input id="apiKey" type="password" />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="2fa" />
                <Label htmlFor="2fa">Two-Factor Authentication</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="ipRestriction" />
                <Label htmlFor="ipRestriction">IP Restriction</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="retryCount">Default Retry Count</Label>
                <Input id="retryCount" type="number" min="1" max="5" defaultValue="3" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="timeout">Default Timeout (seconds)</Label>
                <Input id="timeout" type="number" min="30" max="3600" defaultValue="300" />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="debugMode" />
                <Label htmlFor="debugMode">Debug Mode</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="autoBackup" />
                <Label htmlFor="autoBackup">Automatic Configuration Backup</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
} 