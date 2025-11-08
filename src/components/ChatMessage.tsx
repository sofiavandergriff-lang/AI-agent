import { User, Bot } from 'lucide-react'
import type { Message } from '../lib/types'

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-600' : 'bg-slate-200'}`}>
        {isUser ? (
          <User size={20} className="text-white" />
        ) : (
          <Bot size={20} className="text-slate-700" />
        )}
      </div>

      <div className={`flex-1 max-w-2xl ${isUser ? 'text-right' : ''}`}>
        <div
          className={`inline-block px-4 py-2 rounded-lg ${
            isUser
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-slate-100 text-slate-900 rounded-bl-none'
          }`}
        >
          <p className="text-sm md:text-base whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className={`text-xs mt-1 ${isUser ? 'text-right' : ''} text-slate-500`}>
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  )
}
