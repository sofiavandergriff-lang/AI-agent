import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useChat } from './hooks/useChat';
import { Auth } from './components/Auth';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
export function App() {
    const { user, loading: authLoading, signOut } = useAuth();
    const { conversations, currentConversation, messages, loading: chatLoading, fetchConversations, fetchMessages, createConversation, sendMessage, deleteConversation, setCurrentConversation, } = useChat();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
        if (user) {
            fetchConversations();
        }
    }, [user, fetchConversations]);
    useEffect(() => {
        if (currentConversation) {
            fetchMessages(currentConversation.id);
        }
    }, [currentConversation, fetchMessages]);
    if (authLoading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-12 h-12 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" }), _jsx("p", { className: "text-slate-600", children: "Loading..." })] }) }));
    }
    if (!user) {
        return _jsx(Auth, { onSuccess: () => { } });
    }
    const handleNewChat = async () => {
        const conversation = await createConversation('New Chat');
        if (conversation) {
            setCurrentConversation(conversation);
        }
    };
    const handleSendMessage = async (message) => {
        if (!currentConversation)
            return;
        const newTitle = currentConversation.title === 'New Chat'
            ? message.substring(0, 50)
            : currentConversation.title;
        if (currentConversation.title === 'New Chat') {
            await updateConversationTitle();
        }
        await sendMessage(currentConversation.id, message);
    };
    const updateConversationTitle = async () => {
        await fetchConversations();
    };
    return (_jsxs("div", { className: "flex h-screen bg-slate-50", children: [_jsx("div", { className: `hidden md:block`, children: _jsx(Sidebar, { conversations: conversations, currentConversation: currentConversation, onNewChat: handleNewChat, onSelectConversation: setCurrentConversation, onDeleteConversation: deleteConversation, onSignOut: signOut }) }), _jsx("div", { className: "flex-1 flex flex-col md:hidden", children: sidebarOpen ? (_jsx(Sidebar, { conversations: conversations, currentConversation: currentConversation, onNewChat: () => {
                        handleNewChat();
                        setSidebarOpen(false);
                    }, onSelectConversation: (conv) => {
                        setCurrentConversation(conv);
                        setSidebarOpen(false);
                    }, onDeleteConversation: (id) => {
                        deleteConversation(id);
                        setSidebarOpen(false);
                    }, onSignOut: signOut })) : (_jsx(ChatWindow, { messages: messages, loading: chatLoading, onSendMessage: handleSendMessage, isEmpty: !currentConversation })) }), _jsx("div", { className: "hidden md:flex flex-1 flex-col", children: currentConversation ? (_jsx(ChatWindow, { messages: messages, loading: chatLoading, onSendMessage: handleSendMessage, isEmpty: false })) : (_jsx("div", { className: "flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold text-slate-900 mb-2", children: "AI Chat Agent" }), _jsx("p", { className: "text-slate-600 mb-8", children: "Powered by Google Gemini" }), _jsx("button", { onClick: handleNewChat, className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors", children: "Start New Chat" })] }) })) })] }));
}
