"use client";

import { useState, useCallback } from "react";
import { Mic, MicOff } from "lucide-react";

interface VoiceEngineState {
  isListening: boolean;
  isSpeaking: boolean;
  lastTranscript: string;
  error: string | null;
}

let recognitionInstance: any | null = null;

export function initVoiceEngine(): VoiceEngineState {
  if (typeof window === "undefined") {
    return { isListening: false, isSpeaking: false, lastTranscript: "", error: "Server-side" };
  }
  const SpeechRecognitionAPI =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognitionAPI) {
    return { isListening: false, isSpeaking: false, lastTranscript: "", error: "Not supported" };
  }
  recognitionInstance = new (SpeechRecognitionAPI as any)();
  recognitionInstance.continuous = false;
  recognitionInstance.interimResults = true;
  recognitionInstance.lang = "en-US";
  return { isListening: false, isSpeaking: false, lastTranscript: "", error: null };
}

export function startListening(
  onResult: (text: string) => void,
  onError: (err: string) => void
): void {
  if (!recognitionInstance) { onError("Not initialized"); return; }
  recognitionInstance.onresult = (event: any) => {
    const last = event.results[event.results.length - 1];
    if (last.isFinal) onResult(last[0].transcript);
  };
  recognitionInstance.onerror = (event: any) => onError(event.error);
  try { recognitionInstance.start(); } catch { /* already started */ }
}

export function stopListening(): void {
  if (recognitionInstance) { try { recognitionInstance.stop(); } catch { /* already stopped */ } }
}

export function speak(text: string, onStart?: () => void, onEnd?: () => void): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1; utterance.pitch = 1; utterance.lang = "en-US";
  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window !== "undefined") window.speechSynthesis.cancel();
}

export function useVoiceEngine() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastTranscript, setLastTranscript] = useState("");

  const start = useCallback(() => {
    startListening(
      (text) => setLastTranscript(text),
      (err) => console.error("Voice error:", err)
    );
    setIsListening(true);
  }, []);

  const stop = useCallback(() => { stopListening(); setIsListening(false); }, []);

  const speakText = useCallback(
    (text: string) => { speak(text, () => setIsSpeaking(true), () => setIsSpeaking(false)); },
    []
  );

  return { startListening: start, stopListening: stop, speak: speakText, isListening, isSpeaking, lastTranscript };
}
