import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Send } from 'lucide-react';
export function ChatInput({ onSendMessage, disabled }) {
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "flex gap-2", children: [_jsx("input", { type: "text", value: message, onChange: (e) => setMessage(e.target.value), disabled: disabled, placeholder: "Ask me anything...", className: "flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500" }), _jsxs("button", { type: "submit", disabled: disabled || !message.trim(), className: "bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium", children: [_jsx(Send, { size: 18 }), _jsx("span", { className: "hidden sm:inline", children: "Send" })] })] }));
}
