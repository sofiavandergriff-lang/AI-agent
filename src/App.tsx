import { useEffect, useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useChat } from './hooks/useChat'
import { Auth } from './components/Auth'
import { Sidebar } from './components/Sidebar'
import { ChatWindow } from './components/ChatWindow'

export function App() {
  const { user, loading: authLoading, signOut } = useAuth()
  const {
    conversations,
    currentConversation,
    messages,
    loading: chatLoading,
    fetchConversations,
    fetchMessages,
    createConversation,
    sendMessage,
    deleteConversation,
    setCurrentConversation,
  } = useChat()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (user) {
      fetchConversations()
    }
  }, [user, fetchConversations])

  useEffect(() => {
    if (currentConversation) {
      fetchMessages(currentConversation.id)
    }
  }, [currentConversation, fetchMessages])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Auth onSuccess={() => {}} />
  }

  const handleNewChat = async () => {
    const conversation = await createConversation('New Chat')
    if (conversation) {
      setCurrentConversation(conversation)
    }
  }

  const handleSendMessage = async (message: string) => {
    if (!currentConversation) return

    const newTitle =
      currentConversation.title === 'New Chat'
        ? message.substring(0, 50)
        : currentConversation.title

    if (currentConversation.title === 'New Chat') {
      await updateConversationTitle()
    }

    await sendMessage(currentConversation.id, message)
  }

  const updateConversationTitle = async () => {
    await fetchConversations()
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <div className={`hidden md:block`}>
        <Sidebar
          conversations={conversations}
          currentConversation={currentConversation}
          onNewChat={handleNewChat}
          onSelectConversation={setCurrentConversation}
          onDeleteConversation={deleteConversation}
          onSignOut={signOut}
        />
      </div>

      <div className="flex-1 flex flex-col md:hidden">
        {sidebarOpen ? (
          <Sidebar
            conversations={conversations}
            currentConversation={currentConversation}
            onNewChat={() => {
              handleNewChat()
              setSidebarOpen(false)
            }}
            onSelectConversation={(conv) => {
              setCurrentConversation(conv)
              setSidebarOpen(false)
            }}
            onDeleteConversation={(id) => {
              deleteConversation(id)
              setSidebarOpen(false)
            }}
            onSignOut={signOut}
          />
        ) : (
          <ChatWindow
            messages={messages}
            loading={chatLoading}
            onSendMessage={handleSendMessage}
            isEmpty={!currentConversation}
          />
        )}
      </div>

      <div className="hidden md:flex flex-1 flex-col">
        {currentConversation ? (
          <ChatWindow
            messages={messages}
            loading={chatLoading}
            onSendMessage={handleSendMessage}
            isEmpty={false}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">AI Chat Agent</h1>
              <p className="text-slate-600 mb-8">
                Powered by Google Gemini
              </p>
              <button
                onClick={handleNewChat}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Start New Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
