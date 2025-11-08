import { Plus, Trash2, LogOut } from 'lucide-react'
import type { Conversation } from '../lib/types'

interface SidebarProps {
  conversations: Conversation[]
  currentConversation: Conversation | null
  onNewChat: () => void
  onSelectConversation: (conversation: Conversation) => void
  onDeleteConversation: (id: string) => void
  onSignOut: () => void
}

export function Sidebar({
  conversations,
  currentConversation,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  onSignOut,
}: SidebarProps) {
  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen">
      <div className="p-4 border-b border-slate-700">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <Plus size={20} />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`group p-3 rounded-lg cursor-pointer transition-colors ${
              currentConversation?.id === conv.id
                ? 'bg-slate-700'
                : 'hover:bg-slate-800'
            }`}
            onClick={() => onSelectConversation(conv)}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm text-slate-100 line-clamp-2 flex-1">{conv.title}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteConversation(conv.id)
                }}
                className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {new Date(conv.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-2 text-slate-400 hover:text-red-400 px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  )
}
