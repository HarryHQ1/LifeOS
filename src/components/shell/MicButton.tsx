"use client";

import { useVoiceEngine } from "@/lib/engines/voice";
import { Mic, MicOff } from "lucide-react";

export function MicButton({ onActivate }: { onActivate: () => void; disabled?: boolean }) {
  const { isListening, startListening, stopListening } = useVoiceEngine();
  const handleClick = () => {
    if (isListening) { stopListening(); } else { startListening(); onActivate(); }
  };
  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-black shadow-lg transition-transform hover:scale-105"
      aria-label={isListening ? "Stop voice control" : "Start voice control"}
    >
      {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
    </button>
  );
}
