import localforage from "localforage";

const chatStorage = localforage.createInstance({ name: "chat-history" });

export interface ChatMessage {
  id: string;
  personaId: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

export async function saveMessage(personaId: string, message: ChatMessage) {
  const history = (await chatStorage.getItem<ChatMessage[]>(personaId)) || [];
  history.push(message);
  await chatStorage.setItem(personaId, history);
}

export async function getMessages(personaId: string): Promise<ChatMessage[]> {
  return (await chatStorage.getItem<ChatMessage[]>(personaId)) || [];
}

export async function clearMessages(personaId: string): Promise<void> {
  await chatStorage.removeItem(personaId);
}
