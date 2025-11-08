import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus, Trash2, LogOut } from 'lucide-react';
export function Sidebar({ conversations, currentConversation, onNewChat, onSelectConversation, onDeleteConversation, onSignOut, }) {
    return (_jsxs("div", { className: "w-64 bg-slate-900 text-white flex flex-col h-screen", children: [_jsx("div", { className: "p-4 border-b border-slate-700", children: _jsxs("button", { onClick: onNewChat, className: "w-full flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors font-medium", children: [_jsx(Plus, { size: 20 }), "New Chat"] }) }), _jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-2", children: conversations.map((conv) => (_jsxs("div", { className: `group p-3 rounded-lg cursor-pointer transition-colors ${currentConversation?.id === conv.id
                        ? 'bg-slate-700'
                        : 'hover:bg-slate-800'}`, onClick: () => onSelectConversation(conv), children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsx("p", { className: "text-sm text-slate-100 line-clamp-2 flex-1", children: conv.title }), _jsx("button", { onClick: (e) => {
                                        e.stopPropagation();
                                        onDeleteConversation(conv.id);
                                    }, className: "opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all", children: _jsx(Trash2, { size: 16 }) })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: new Date(conv.created_at).toLocaleDateString() })] }, conv.id))) }), _jsx("div", { className: "p-4 border-t border-slate-700", children: _jsxs("button", { onClick: onSignOut, className: "w-full flex items-center gap-2 text-slate-400 hover:text-red-400 px-4 py-2 rounded-lg transition-colors font-medium", children: [_jsx(LogOut, { size: 20 }), "Sign Out"] }) })] }));
}
