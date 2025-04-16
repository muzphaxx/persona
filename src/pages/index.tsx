"use client"; // Required for hooks like useTheme

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // Icons for toggle
import { useTheme } from "next-themes"; // Hook for theme management
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { Button } from "@/components/ui/button";
import Chat from "@/components/Chat";
import ChatHistory from "@/components/ChatHistory"; // Re-add ChatHistory import
import PersonaList from "@/components/PersonaList"; // Import PersonaList
import { Persona } from "@/types/persona"; // Import Persona type
import { getAllPersonas, savePersona, deletePersona } from "@/lib/personaStorage"; // Import storage functions
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import PersonaCard from "@/components/PersonaCard";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const router = useRouter(); // Initialize router
  const [mounted, setMounted] = useState(false);
  const [personas, setPersonas] = useState<Persona[]>([]); // State for personas list
  const [activePersonaId, setActivePersonaId] = useState<string | null>(null); // State for active persona ID
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null); // State for persona being edited

  // Ensure component is mounted before rendering theme-dependent UI
  useEffect(() => {
    setMounted(true);
    // Load personas from storage on mount
    const loadPersonas = async () => {
      const loadedPersonas = await getAllPersonas();
      setPersonas(loadedPersonas);
      // Optionally set the first persona as active if none is selected
      if (!activePersonaId && loadedPersonas.length > 0) {
        setActivePersonaId(loadedPersonas[0].id);
      }
    };
    loadPersonas();
  }, [activePersonaId]); // Re-run if activePersonaId changes (e.g., after delete)

  // --- Persona Handlers ---

  const handleCreatePersona = async (newPersona: Persona) => {
    await savePersona(newPersona);
    setPersonas([...personas, newPersona]);
    setActivePersonaId(newPersona.id); // Optionally activate the new persona
    setEditingPersona(null); // Close edit form if open
  };

  const handleUpdatePersona = async (updatedPersona: Persona) => {
    await savePersona(updatedPersona);
    setPersonas(personas.map(p => p.id === updatedPersona.id ? updatedPersona : p));
    setEditingPersona(null); // Close edit form
  };

  const handleDeletePersona = async (id: string) => {
    await deletePersona(id);
    const remainingPersonas = personas.filter(p => p.id !== id);
    setPersonas(remainingPersonas);
    // If the deleted persona was active, clear active state or select another
    if (activePersonaId === id) {
      setActivePersonaId(remainingPersonas.length > 0 ? remainingPersonas[0].id : null);
    }
    if (editingPersona?.id === id) {
      setEditingPersona(null); // Close edit form if deleting the one being edited
    }
  };

  const handleEditPersona = (id: string) => {
    const personaToEdit = personas.find(p => p.id === id);
    if (personaToEdit) {
      setEditingPersona(personaToEdit);
    }
  };

  const handleDuplicatePersona = async (id: string) => {
    const personaToDuplicate = personas.find(p => p.id === id);
    if (personaToDuplicate) {
      const duplicatedPersona = {
        ...personaToDuplicate,
        id: crypto.randomUUID(),
        name: personaToDuplicate.name + " (Copy)",
      };
      await savePersona(duplicatedPersona);
      setPersonas([...personas, duplicatedPersona]);
      setActivePersonaId(duplicatedPersona.id);
      setEditingPersona(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingPersona(null);
  };

  const handleSelectPersona = (id: string) => {
    setActivePersonaId(id);
    setEditingPersona(null); // Close edit form when selecting a different persona
  };

  // New handler to navigate to create persona page
  const handleNavigateToCreate = () => {
    router.push("/personas/create");
  };

  // Find the active persona object
  const activePersona = personas.find(p => p.id === activePersonaId);

  if (!mounted) {
    // Render a placeholder or null until mounted
    // to prevent hydration errors with theme
    return null;
  }

  return (
    // Make main a full-height vertical flex container
    <main className="flex flex-col h-lvh  relative">
      <div className="flex gap-4 flex-1 p-6 h-full">
        <div className="w-3/12 flex flex-col gap-4 ">
          <PersonaList
            personas={personas}
            activePersonaId={activePersonaId}
            onSelect={handleSelectPersona}
            onEdit={handleEditPersona}
            onDelete={handleDeletePersona}
          />
          <Button onClick={handleNavigateToCreate} className="rounded-full font-semibold p-4 min-h-16 text-base flex items-center gap-2">
            <AddOutlinedIcon fontSize="small" />
            Criar Persona
          </Button>
        </div>
        <div className="flex-1">
          <Chat />
        </div>
      </div>
    </main>
  )
}
