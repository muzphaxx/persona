import type { NextApiRequest, NextApiResponse } from "next"
import OpenAI from "openai"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { messages } = req.body

  if (!messages || !Array.isArray(messages)) {
    console.error("Invalid or missing 'messages' in request body:", messages)
    return res.status(400).json({ error: "Invalid or missing 'messages' in request body" })
  }

  try {
    // Convert messages array to a single string input for the Responses API
    const input = messages
      .map((msg: { role: string; content: string }) => `${msg.role}: ${msg.content}`)
      .join("\n")

    console.log("Input to OpenAI responses.create:", input)

    const response = await openai.responses.create({
      model: "gpt-4o",
      input,
      temperature: 0.7
    })

    console.log("Full OpenAI response:", response)

    const message = response.output_text || "Não foi possível obter resposta"
    res.status(200).json({ message })
  } catch (err) {
    console.error("OpenAI API error:", err)
    res.status(500).json({ error: "Erro na API da OpenAI" })
  }
}
