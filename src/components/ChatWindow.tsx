import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import type { Message } from '../lib/types'

interface ChatWindowProps {
  messages: Message[]
  loading: boolean
  onSendMessage: (message: string) => void
  isEmpty: boolean
}

export function ChatWindow({
  messages,
  loading,
  onSendMessage,
  isEmpty,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {isEmpty ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Start a conversation
              </h2>
              <p className="text-slate-600">
                Ask me anything and I'll do my best to help!
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="inline-block px-4 py-2 bg-slate-100 rounded-lg rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="p-4 md:p-6 bg-white border-t border-slate-200">
        <ChatInput onSendMessage={onSendMessage} disabled={loading} />
      </div>
    </div>
  )
}
