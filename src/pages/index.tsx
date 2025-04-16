"use client"; // Required for hooks like useTheme

import Chat from "@/components/Chat";
import ChatHistory from "@/components/ChatHistory"; // Import ChatHistory
import { Button } from "@/components/ui/button"; // Assuming Button component exists
import { Moon, Sun } from "lucide-react"; // Icons for toggle
import { useTheme } from "next-themes"; // Hook for theme management
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering theme-dependent UI
  // to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Removed handleCreatePersona function

  if (!mounted) {
    // Render a placeholder or null until mounted
    // to prevent hydration errors with theme
    return null;
  }

  return (
    // Make main a full-height vertical flex container
    <main className="flex flex-col h-screen relative"> 
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="absolute top-6 right-6" // Position top-right
      >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        <span className="sr-only">Toggle theme</span>
      </Button>
      {/* Make this div grow and handle overflow, add padding here */}
      <div className="flex gap-4 flex-1 overflow-hidden p-6"> 
        <div className="w-[320px]">
          <ChatHistory /> {/* Use ChatHistory component */}
        </div>
        <div className="flex-1">
          <Chat />
        </div>
      </div>
    </main>
  )
}
