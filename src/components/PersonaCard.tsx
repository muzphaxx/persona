'use client';

import { Persona } from "@/types/persona";
import { Button } from "@/components/ui/button";
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

type Props = {
  persona: Persona;
  isActive: boolean;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function PersonaCard({ persona, isActive, onSelect, onEdit, onDelete }: Props) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl cursor-pointer ${isActive ? 'border border-gray-700' : 'hover:bg-accent'}`}
      onClick={() => onSelect(persona.id)}
    >
      <div>
        <p className="font-medium">{persona.name}</p>
        <p className="text-sm text-muted-foreground">{persona.role}</p>
      </div>
      <div className="space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(persona.id);
          }}
        >
          <EditIcon fontSize="small"/>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(persona.id);
          }}
        >
          <DeleteIcon fontSize="small" />
        </Button>
      </div>
    </div>
  );
}
