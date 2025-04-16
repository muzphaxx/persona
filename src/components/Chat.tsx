'use client'

import { useState, KeyboardEvent, useRef, useEffect } from "react" // Added useRef, useEffect
import TextareaAutosize from 'react-textarea-autosize' // Added import
// Removed Markdown import
import { Button } from "@/components/ui/button"
// Removed Input import
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = { role: "user" | "assistant"; content: string }

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null); // Ref for scrolling

  // Effect to scroll down when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    // Only send if input is not just whitespace
    const currentInput = input.trim()
    if (!currentInput) return

    const newMessages = [...messages, { role: "user" as const, content: currentInput }] // Use trimmed input
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    })

    const data = await res.json()
    setMessages([...newMessages, { role: "assistant" as const, content: data.reply }]) // Explicitly type role
    setLoading(false)
  }

  return (
    // Use h-full to take available height, remove fixed width/centering
    <div className="flex flex-col h-full"> 
      {/* Removed Temporary Static Markdown Test */}
      {/* ScrollArea will grow to fill space, min-h-0 prevents it from expanding infinitely */}
      <ScrollArea className="prose prose-sm rounded p-4 flex-grow mb-4 min-h-0"> {/* Removed max-h-, added min-h-0 */}
        {messages.map((m, i) => (
          <div key={i} className={`w-full mb-2 ${m.role === "user" ? "text-right" : "text-left"}`}>
            <span className="chat-meta-info w-full"> {/* Applied chat-meta-info */}
              {m.role === "user" ? "Você" : "Persona"}
            </span>
            {/* Use p tag for both user and assistant messages */}
            <p className="chat-body-text w-full">{m.content}</p> {/* Applied chat-body-text */}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Empty div for scroll target */}
      </ScrollArea>
      {/* Updated input area layout */}
      <div className="flex bg-gray-900 items-end gap-2 p-5 rounded-4xl"> 
        <TextareaAutosize
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => { // Added type annotation
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Prevent default newline on Enter
              sendMessage();
            }
          }}
          className="chat-input-area" // Applied chat-input-area (includes layout/behavior)
          maxRows={5} // Limit max height
        />
        <Button 
          onClick={sendMessage} 
          disabled={loading || !input.trim()} // Disable if loading or input is empty/whitespace
          size="icon" // Use icon size
          className="rounded-full" // Make button round like references
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            // Simple Send Arrow SVG Icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          )}
        </Button>
      </div>
    </div>
  )
}
