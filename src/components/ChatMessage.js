import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { User, Bot } from 'lucide-react';
export function ChatMessage({ message }) {
    const isUser = message.role === 'user';
    return (_jsxs("div", { className: `flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`, children: [_jsx("div", { className: `flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-600' : 'bg-slate-200'}`, children: isUser ? (_jsx(User, { size: 20, className: "text-white" })) : (_jsx(Bot, { size: 20, className: "text-slate-700" })) }), _jsxs("div", { className: `flex-1 max-w-2xl ${isUser ? 'text-right' : ''}`, children: [_jsx("div", { className: `inline-block px-4 py-2 rounded-lg ${isUser
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-slate-100 text-slate-900 rounded-bl-none'}`, children: _jsx("p", { className: "text-sm md:text-base whitespace-pre-wrap", children: message.content }) }), _jsx("p", { className: `text-xs mt-1 ${isUser ? 'text-right' : ''} text-slate-500`, children: new Date(message.created_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        }) })] })] }));
}
