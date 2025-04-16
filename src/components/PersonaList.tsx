'use client';

import { Persona } from "@/types/persona";
import { ScrollArea } from "@/components/ui/scroll-area";
import PersonaCard from "./PersonaCard";

type Props = {
  personas: Persona[];
  activePersonaId: string | null;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function PersonaList({ personas, activePersonaId, onSelect, onEdit, onDelete }: Props) {
  return (
    <ScrollArea className="h-full flex-grow">
      {personas.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma persona criada ainda.</p>
      ) : (
        <div className="space-y-2">
          {personas.map((persona) => (
            <div key={persona.id} className="border-none">
              <PersonaCard
                persona={persona}
                isActive={activePersonaId === persona.id}
                onSelect={onSelect}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}
