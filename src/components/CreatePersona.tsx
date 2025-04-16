'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from "uuid"

type Props = {
  onCreate: (persona: any) => void
}

export default function CreatePersona({ onCreate }: Props) {
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [systemPrompt, setSystemPrompt] = useState("")

  const handleCreate = () => {
    if (!name || !role || !systemPrompt) return
    const newPersona = {
      id: uuidv4(),
      name,
      role,
      systemPrompt,
    }
    onCreate(newPersona)
    setName("")
    setRole("")
    setSystemPrompt("")
  }

  return (
    <div className="space-y-4">
      <Input placeholder="Nome da Persona" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Papel (ex: UX Analyst)" value={role} onChange={(e) => setRole(e.target.value)} />
      <Textarea
        placeholder="Instrução-base (ex: Você é um analista de UX...)"
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
      />
      <Button onClick={handleCreate}>Criar Persona</Button>
    </div>
  )
}
