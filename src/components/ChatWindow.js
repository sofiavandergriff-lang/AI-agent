import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
export function ChatWindow({ messages, loading, onSendMessage, isEmpty, }) {
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (_jsxs("div", { className: "flex-1 flex flex-col h-screen", children: [_jsx("div", { className: "flex-1 overflow-y-auto p-4 md:p-6 space-y-4", children: isEmpty ? (_jsx("div", { className: "h-full flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl md:text-3xl font-bold text-slate-900 mb-2", children: "Start a conversation" }), _jsx("p", { className: "text-slate-600", children: "Ask me anything and I'll do my best to help!" })] }) })) : (_jsxs(_Fragment, { children: [messages.map((message) => (_jsx(ChatMessage, { message: message }, message.id))), loading && (_jsxs("div", { className: "flex gap-3", children: [_jsx("div", { className: "flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center", children: _jsx("div", { className: "w-2 h-2 bg-slate-400 rounded-full animate-pulse" }) }), _jsx("div", { className: "flex-1", children: _jsx("div", { className: "inline-block px-4 py-2 bg-slate-100 rounded-lg rounded-bl-none", children: _jsxs("div", { className: "flex gap-1", children: [_jsx("div", { className: "w-2 h-2 bg-slate-400 rounded-full animate-bounce" }), _jsx("div", { className: "w-2 h-2 bg-slate-400 rounded-full animate-bounce", style: { animationDelay: '0.1s' } }), _jsx("div", { className: "w-2 h-2 bg-slate-400 rounded-full animate-bounce", style: { animationDelay: '0.2s' } })] }) }) })] })), _jsx("div", { ref: messagesEndRef })] })) }), _jsx("div", { className: "p-4 md:p-6 bg-white border-t border-slate-200", children: _jsx(ChatInput, { onSendMessage: onSendMessage, disabled: loading }) })] }));
}
