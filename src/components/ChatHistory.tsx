import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChatHistoryItem {
  id: string;
  title: string;
  lastMessageTimestamp: string;
}

// Dummy Data
const dummyHistory: ChatHistoryItem[] = [
  { id: '1', title: 'Chat about React Hooks', lastMessageTimestamp: 'Yesterday' },
  { id: '2', title: 'Planning the UI', lastMessageTimestamp: '2 days ago' },
  { id: '3', title: 'Tailwind CSS discussion', lastMessageTimestamp: 'April 14, 2025' },
  { id: '4', title: 'State management options', lastMessageTimestamp: 'April 13, 2025' },
  { id: '5', title: 'API integration brainstorm', lastMessageTimestamp: 'April 12, 2025' },
];

const ChatHistory: React.FC = () => {
  return (
    <Card className="w-full h-full border-0"> {/* Adjust dimensions as needed, removed border */}
      <CardContent>
        <ScrollArea className="h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
          <ul className="space-y-2">
            {dummyHistory.map((chat) => (
              <li key={chat.id} className="p-3 rounded-2xl hover:bg-accent cursor-pointer">
                <div className="chat-section-title">{chat.title}</div> {/* Applied chat-section-title */}
                <div className="chat-meta-info">{chat.lastMessageTimestamp}</div> {/* Applied chat-meta-info */}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ChatHistory;
