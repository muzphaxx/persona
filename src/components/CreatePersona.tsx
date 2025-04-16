'use client'

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { Persona } from "@/types/persona";

type Props = {
  onCreate: (persona: Persona) => void;
  personaToEdit?: Persona | null;
  onUpdate?: (persona: Persona) => void;
  onCancelEdit?: () => void;
};

export default function CreatePersona({ onCreate, personaToEdit, onUpdate, onCancelEdit }: Props) {
  const router = useRouter(); // Initialize router
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");

  const isEditing = !!personaToEdit;

  useEffect(() => {
    if (personaToEdit) {
      setName(personaToEdit.name);
      setRole(personaToEdit.role);
      setSystemPrompt(personaToEdit.basePrompt);
    } else {
      setName("");
      setRole("");
      setSystemPrompt("");
    }
  }, [personaToEdit]);

  const handleSubmit = () => {
    if (!name || !role || !systemPrompt) return;

    if (isEditing && onUpdate && personaToEdit) {
      const updatedPersona: Persona = {
        ...personaToEdit,
        name,
        role,
        basePrompt: systemPrompt,
      };
      onUpdate(updatedPersona);
    } else {
      const newPersona: Persona = {
        id: uuidv4(),
        name,
        role,
        basePrompt: systemPrompt,
      };
      onCreate(newPersona);
      // Redirect to home page after creation
      router.push("/");
      setName("");
      setRole("");
      setSystemPrompt("");
    }
  };

  return (
    <div className="space-y-4 p-4 rounded-md">
      <h2 className="text-lg font-semibold">{isEditing ? "Editar Persona" : "Criar Nova Persona"}</h2>
      <Input placeholder="Nome da Persona" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Papel (ex: UX Analyst)" value={role} onChange={(e) => setRole(e.target.value)} />
      <Textarea
        placeholder="Instrução-base (ex: Você é um analista de UX...)"
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
        rows={5}
      />
      <div className="flex space-x-2">
        <Button onClick={handleSubmit}>
          {isEditing ? "Salvar Alterações" : "Criar Persona"}
        </Button>
        {isEditing && onCancelEdit && (
          <Button variant="outline" onClick={onCancelEdit}>
            Cancelar
          </Button>
        )}
      </div>
    </div>
  );
}
