import { useCallback, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Message, Conversation } from '../lib/types'

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchConversations = useCallback(async () => {
    try {
      const { data, error: err } = await supabase
        .from('conversations')
        .select('*')
        .order('updated_at', { ascending: false })

      if (err) throw err
      setConversations(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch conversations')
    }
  }, [])

  const fetchMessages = useCallback(async (conversationId: string) => {
    try {
      const { data, error: err } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (err) throw err
      setMessages(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch messages')
    }
  }, [])

  const createConversation = useCallback(async (title: string) => {
    try {
      const { data, error: err } = await supabase
        .from('conversations')
        .insert([{ title }])
        .select()
        .single()

      if (err) throw err
      setCurrentConversation(data)
      setMessages([])
      await fetchConversations()
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create conversation')
    }
  }, [fetchConversations])

  const sendMessage = useCallback(async (conversationId: string, content: string) => {
    if (!content.trim()) return

    try {
      setLoading(true)
      setError(null)

      const { data: userMessage, error: msgErr } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: conversationId,
            role: 'user',
            content,
          },
        ])
        .select()
        .single()

      if (msgErr) throw msgErr

      setMessages((prev) => [...prev, userMessage])

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`
      const { data: { session } } = await supabase.auth.getSession()

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          message: content,
          conversationId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const result = await response.json()

      const { data: aiMessage, error: aiErr } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: conversationId,
            role: 'assistant',
            content: result.response,
          },
        ])
        .select()
        .single()

      if (aiErr) throw aiErr

      setMessages((prev) => [...prev, aiMessage])

      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId)

      await fetchConversations()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }, [fetchConversations])

  const deleteConversation = useCallback(async (conversationId: string) => {
    try {
      const { error: err } = await supabase
        .from('conversations')
        .delete()
        .eq('id', conversationId)

      if (err) throw err
      await fetchConversations()
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(null)
        setMessages([])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete conversation')
    }
  }, [currentConversation, fetchConversations])

  return {
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    fetchConversations,
    fetchMessages,
    createConversation,
    sendMessage,
    deleteConversation,
    setCurrentConversation,
  }
}
