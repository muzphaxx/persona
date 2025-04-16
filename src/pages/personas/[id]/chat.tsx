'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChatWithPersona from '@/components/ChatWithPersona';
import { getPersonaById } from '@/lib/personaStorage';
import { Persona } from '@/types/persona';

export default function PersonaChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const [persona, setPersona] = useState<Persona | null>(null);

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
      setPersona(p);
    }
    loadPersona();
  }, [id, router]);

  if (!persona) {
    return <div>Carregando persona...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <ChatWithPersona persona={persona} />
    </div>
  );
}
