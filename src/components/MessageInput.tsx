'use client';

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onSend: (message: string) => void;
  loading?: boolean;
};

export default function MessageInput({ onSend, loading = false }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        className="flex-1 border rounded-md p-2"
        placeholder="Digite sua mensagem..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}
