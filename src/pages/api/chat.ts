import type { NextApiRequest, NextApiResponse } from "next"
import { OpenAI } from "openai"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { messages } = req.body

  try {
    const response = await openai.responses.create({
        input: messages,
        text: {
          format: {
            type: "text"
          }
        },
        model: "gpt-4.1-nano",
        reasoning: {},
        tools: [],
        temperature: 0.7,
        max_output_tokens: 2048,
        top_p: 1,
        store: true
      });

    const reply = response.output_text
    res.status(200).json({ reply })
  } catch (err) {
    res.status(500).json({ error: "Erro na API da OpenAI" })
  }
}
