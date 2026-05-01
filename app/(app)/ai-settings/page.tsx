import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { getAISettings, updateAISettings } from '@/actions/settings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export default async function AISettingsPage() {
  const { data: aiSettings, error } = await getAISettings()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Settings</h2>
        <p className="text-muted-foreground">Configure your AI booking agent.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Agent Configuration</CardTitle>
            <CardDescription>Adjust how the AI communicates and behaves.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={updateAISettings} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme_color">Widget Theme Color</Label>
                <Select name="theme_color" defaultValue={aiSettings?.theme_color || 'blue'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone">AI Tone</Label>
                <Select name="tone" defaultValue={aiSettings?.tone || 'professional'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prompt_context">Custom Knowledge Base / Instructions</Label>
                <Textarea 
                  id="prompt_context" 
                  name="prompt_context" 
                  defaultValue={aiSettings?.prompt_context || ''}
                  placeholder="e.g. We specialize in fade haircuts. Do not offer coloring services."
                  rows={5}
                />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Embed Code</CardTitle>
            <CardDescription>Copy this to add the AI widget to your website.</CardDescription>
          </CardHeader>
          <CardContent>
            {aiSettings ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Include this iframe tag anywhere in your website&apos;s HTML to display the booking widget.
                </p>
                <div className="rounded-md bg-muted p-4">
                  <code className="text-sm text-foreground break-all">
                    {`<iframe src="https://yourdomain.com/widget/${aiSettings.business_id}" width="400" height="600" style="border:none; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" allow="microphone"></iframe>`}
                  </code>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Loading settings...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
