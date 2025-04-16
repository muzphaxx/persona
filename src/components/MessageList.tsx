'use client';

import { ChatMessage } from "@/lib/chatStorage";

type Props = {
  messages: ChatMessage[];
};

export default function MessageList({ messages }: Props) {
  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 rounded-md max-w-xs ${msg.role === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-gray-900 self-start"}`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
}
