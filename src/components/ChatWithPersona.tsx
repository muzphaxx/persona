'use client';

import { useEffect, useState } from "react";
import { Persona } from "@/types/persona";
import { ChatMessage, getMessages, saveMessage } from "@/lib/chatStorage";
import { v4 as uuidv4 } from "uuid";
import MessageList from "@/components/MessageList";
import MessageInput from "@/components/MessageInput";

type Props = {
  persona: Persona;
};

export default function ChatWithPersona({ persona }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadHistory() {
      const history = await getMessages(persona.id);
      setMessages(history);
    }
    loadHistory();
  }, [persona.id]);

  const handleSendMessage = async (content: string) => {
    setLoading(true);
    const userMessage: ChatMessage = {
      id: uuidv4(),
      personaId: persona.id,
      role: "user",
      content,
      timestamp: Date.now(),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    await saveMessage(persona.id, userMessage);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: persona.basePrompt },
            ...updatedMessages.map(m => ({
              role: m.role,
              content: m.content
            }))
          ]
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        personaId: persona.id,
        role: "assistant",
        content: data.message,
        timestamp: Date.now(),
      };
      const newMessages = [...updatedMessages, assistantMessage];
      setMessages(newMessages);
      await saveMessage(persona.id, assistantMessage);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        personaId: persona.id,
        role: "assistant",
        content: "Desculpe, ocorreu um erro ao processar sua mensagem.",
        timestamp: Date.now(),
      };
      const newMessages = [...updatedMessages, errorMessage];
      setMessages(newMessages);
      await saveMessage(persona.id, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 border rounded-md">
      <h2 className="text-lg font-semibold mb-4">Chat com {persona.name}</h2>
      <MessageList messages={messages} />
      <MessageInput onSend={handleSendMessage} loading={loading} />
    </div>
  );
}
