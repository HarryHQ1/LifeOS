/**
 * ENGINE 1 — VOICE ENGINE (/lib/engines/voice.ts)
 * Full two-way voice conversation with the user.
 */

export const startListening = (
  onResult: (text: string) => void,
  onError: (error: any) => void
) => {
  if (typeof window === "undefined") return null;

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error("Speech Recognition not supported in this browser.");
    onError("Speech Recognition not supported");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onresult = (event: any) => {
    const text = event.results[event.results.length - 1][0].transcript;
    onResult(text.trim());
  };

  recognition.onerror = (event: any) => {
    console.error("Speech recognition error", event.error);
    onError(event.error);
  };

  try {
    recognition.start();
  } catch (e) {
    console.error("Failed to start recognition", e);
    onError(e);
  }

  return recognition;
};

export const stopListening = (recognition: any) => {
  if (recognition && typeof recognition.stop === "function") {
    recognition.stop();
  }
};

export const speak = (text: string, onEnd?: () => void) => {
  if (typeof window === "undefined") return;

  const synthesis = window.speechSynthesis;
  if (!synthesis) {
    console.error("Speech Synthesis not supported in this browser.");
    return;
  }

  // Cancel any ongoing speech
  synthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Optional: customize voice
  const voices = synthesis.getVoices();
  // Try to find a good natural sounding voice if available
  const preferredVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Natural"));
  if (preferredVoice) utterance.voice = preferredVoice;

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (event) => {
    console.error("Speech synthesis error", event);
    if (onEnd) onEnd();
  };

  synthesis.speak(utterance);
};
