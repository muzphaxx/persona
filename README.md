# Persona 🧠

**Persona** is a web application where you create "artificial mentors" with their own memory. Each Persona is a character with a defined role (e.g., UX Analyst), a history of learning with you, and a personalized collaboration style.

Unlike generic chats, Persona listens, learns, refines, and evolves over time. It remembers what you've built together, understands your context, accepts corrections, and proposes tailored solutions.

The experience aims to be clean, intelligent, and centered around you — offering the fluidity of a notepad and the depth of a reasoning partner.

## ✨ Vision & Goal

The core idea is to create intelligent personas with their own memory, leveraging LLMs (like OpenAI's GPT models). This allows configuring specific "characters" (e.g., a UX Analyst) to assist with tasks like idea generation, UI evaluation, and more, while continuously learning from your feedback.

The goal is to have an extension of your mind: a "digital colleague" that understands your context, your way of thinking, and collaborates with increasing autonomy.

## 🎯 Current Status: MLP - "Essência Primeiro" (Week 1 Focus)

We are currently building the Minimum Lovable Product (MLP) focusing on the core experience:

- **Functional Chat:** A clean interface to interact with a Persona via the OpenAI API.
- **Persona Creation/Editing:** Defining a Persona's name, role, and initial instructions (base prompt).
- **Local Storage:** Saving conversation history locally per Persona using IndexedDB.
- **Basic Navigation:** Ability to reopen previous conversations with a specific Persona.

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (with React Server Components where applicable)
- **UI:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Backend/API:** Next.js API Routes
- **LLM:** [OpenAI API](https://openai.com/api/) (GPT-4 or GPT-3.5)
- **Local Storage:** [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (likely via libraries like `localforage` or `dexie`)

## 🚀 Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add your OpenAI API key:
    ```
    OPENAI_API_KEY=your_openai_api_key_here
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This command uses Turbopack (`--turbopack`) for faster development builds as specified in `package.json`.

4.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure (Overview)

-   `public/`: Static assets.
-   `src/`: Main application source code.
    -   `components/`: Reusable React components (e.g., `Chat.tsx`, `CreatePersona.tsx`, UI elements).
    -   `lib/`: Utility functions and modules (e.g., `personaStorage.ts` for IndexedDB interaction, `utils.ts`).
    -   `pages/`: Next.js pages and API routes.
        -   `index.tsx`: The main entry point/page for the application.
        -   `api/`: Backend API routes (e.g., `chat.ts` for handling OpenAI requests).
    -   `styles/`: Global CSS styles.
-   `next.config.ts`: Next.js configuration.
-   `tailwind.config.ts`: Tailwind CSS configuration.
-   `tsconfig.json`: TypeScript configuration.
-   `package.json`: Project dependencies and scripts.

---

This README provides a snapshot of the project's vision, current state, and how to get started. It will be updated as the project evolves.
