// lib/personaStorage.ts
import localforage from "localforage";
import { Persona } from "@/types/persona"; // Corrected import path if it was different

const storage = localforage.createInstance({ name: "persona-store" });

export async function savePersona(persona: Persona) {
  await storage.setItem(persona.id, persona)
}

export async function getAllPersonas(): Promise<Persona[]> {
  const items: Persona[] = []
  await storage.iterate((value: Persona) => {
    items.push(value)
  });
  return items;
}

export async function deletePersona(id: string): Promise<void> {
  await storage.removeItem(id);
}

export async function getPersonaById(id: string): Promise<Persona | null> {
  return storage.getItem<Persona>(id);
}
