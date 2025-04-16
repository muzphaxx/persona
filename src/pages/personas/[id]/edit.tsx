'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PersonaForm from '@/components/CreatePersona';
import { getPersonaById, savePersona } from '@/lib/personaStorage';
import { Persona } from '@/types/persona';

export default function EditPersonaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const duplicate = searchParams.get('duplicate') === 'true';
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPersona() {
      if (!id) {
        router.push('/personas');
        return;
      }
      const p = await getPersonaById(id);
      if (!p) {
        router.push('/personas');
        return;
      }
      if (duplicate) {
        setPersona({
          ...p,
          id: crypto.randomUUID(),
          name: p.name + ' (Copy)',
        });
      } else {
        setPersona(p);
      }
    }
    loadPersona();
  }, [id, duplicate, router]);

  const handleUpdate = async (updatedPersona: Persona) => {
    setLoading(true);
    await savePersona(updatedPersona);
    setLoading(false);
    router.push('/personas');
  };

  const handleCancel = () => {
    router.push('/personas');
  };

  if (!persona) {
    return <div>Carregando persona...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{duplicate ? 'Duplicar Persona' : 'Editar Persona'}</h1>
      <PersonaForm
        personaToEdit={persona}
        onCreate={handleUpdate}
        onUpdate={handleUpdate}
        onCancelEdit={handleCancel}
      />
      {loading && <p>Salvando...</p>}
    </div>
  );
}
