'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PersonaForm from '@/components/CreatePersona';
import { Persona } from '@/types/persona';
import { savePersona } from '@/lib/personaStorage';

export default function CreatePersonaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (persona: Persona) => {
    setLoading(true);
    await savePersona(persona);
    setLoading(false);
    router.push('/personas');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Criar Nova Persona</h1>
      <PersonaForm onCreate={handleCreate} />
      {loading && <p>Salvando...</p>}
    </div>
  );
}
