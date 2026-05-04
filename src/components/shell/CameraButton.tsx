"use client";

import { Camera, Loader2 } from "lucide-react";
import { useRef } from "react";

export function CameraButton({ onCapture }: { onCapture: (base64: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleCapture = () => inputRef.current?.click();
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    onCapture(base64);
  };
  return (
    <>
      <input type="file" accept="image/*" capture="environment" ref={inputRef} onChange={handleFileChange} className="hidden" />
      <button
        onClick={handleCapture}
        className="fixed bottom-24 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg transition-transform hover:scale-105"
        aria-label="Capture image"
      >
        <Camera className="h-5 w-5" />
      </button>
    </>
  );
}
