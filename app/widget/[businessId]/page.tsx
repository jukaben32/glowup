'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2 } from 'lucide-react'

export default function WidgetPage({ params }: { params: Promise<{ businessId: string }> }) {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Unwrap params using React.use
  const { businessId } = React.use(params)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    // Initial greeting
    setMessages([{ role: 'assistant', content: "Hello! I'm the booking assistant. How can I help you today?" }])
  }, [])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      await processChat(newMessages)
    } catch (err) {
      console.error(err)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
      setLoading(false)
    }
  }

  const processChat = async (chatMessages: any[]) => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    const embed = process.env.NEXT_PUBLIC_WIDGET_EMBED_TOKEN
    if (embed) headers['x-embed-token'] = embed

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers,
      body: JSON.stringify({ messages: chatMessages, business_id: businessId })
    })
    
    const data = await res.json()
    
    if (data.error) throw new Error(data.error)

    if (data.toolResult) {
      // The AI requested a tool use, and we got the result back from our backend wrapper
      const toolResultMessage = {
        role: 'user',
        content: [
          {
            type: 'tool_result',
            tool_use_id: data.toolResult.tool_use_id,
            content: data.toolResult.content,
          }
        ]
      }
      // We must append the AI's tool_use message first, then our tool_result
      const aiToolUseMessage = { role: 'assistant', content: data.content }
      const extendedMessages = [...chatMessages, aiToolUseMessage, toolResultMessage]
      
      // Make another call to let AI respond to the tool result
      await processChat(extendedMessages)
    } else {
      // Final text response from AI
      const block = Array.isArray(data.content) ? data.content[0] : null
      const text =
        block?.type === 'text' && typeof block.text === 'string'
          ? block.text
          : 'Sorry, I could not read the assistant response.'
      const aiResponse = { role: 'assistant', content: text }
      setMessages(prev => [...prev, aiResponse])
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background p-4">
      <div className="flex-1 overflow-y-auto rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex flex-col space-y-4">
          {messages.map((m, idx) => {
            // filter out internal tool messages from rendering directly
            if (Array.isArray(m.content)) return null
            
            return (
              <div key={idx} className={`flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${m.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <div className="flex items-center gap-2 font-semibold">
                  {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  {m.role === 'user' ? 'You' : 'Assistant'}
                </div>
                <div>{m.content}</div>
              </div>
            )
          })}
          {loading && (
            <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={sendMessage} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about booking..."
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
