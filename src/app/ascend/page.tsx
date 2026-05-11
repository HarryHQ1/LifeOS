"use client";

import { useState } from "react";
import { Mic, Compass, Map, Plane, Zap, Mountain, Footprints, Camera } from "lucide-react";
import { MicButton } from "@/components/shell/MicButton";
import { CameraButton } from "@/components/shell/CameraButton";
import { useVoiceEngine } from "@/lib/engines/voice";

const TRIP_TYPES = [
  { icon: Compass, label: "Adventure", color: "text-indigo-400" },
  { icon: Plane, label: "Travel", color: "text-sky-400" },
  { icon: Mountain, label: "Hiking", color: "text-green-400" },
  { icon: Map, label: "Local", color: "text-amber-400" },
];

interface TripEntry {
  id: string;
  type: string;
  color: string;
  title: string;
  destination: string;
  status: "planning" | "active" | "done";
  note: string;
  time: string;
}

const SAMPLE: TripEntry[] = [
  { id: "1", type: "Adventure", color: "text-indigo-400", title: "Alpinism trip", destination: "Swiss Alps", status: "planning", note: "Summit in July", time: "2 weeks" },
  { id: "2", type: "Travel", color: "text-sky-400", title: "Portugal getaway", destination: "Lisbon, Portugal", status: "planning", note: "5 days, solo", time: "1 month" },
  { id: "3", type: "Local", color: "text-amber-400", title: "Food tour", destination: "Downtown", status: "active", note: "Trying new restaurants", time: "This weekend" },
  { id: "4", type: "Hiking", color: "text-green-400", title: "Forest trail", destination: "Sequoia Park", status: "done", note: "Completed 15km", time: "Last week" },
];

export default function AscendPage() {
  const [entries, setEntries] = useState<TripEntry[]>(SAMPLE);
  const [selectedType, setSelectedType] = useState<{ label: string; color: string } | null>(null);
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [note, setNote] = useState("");
  const { isListening, speak, startListening } = useVoiceEngine();

  const addEntry = () => {
    if (!selectedType || !title.trim()) {
      speak("Please select a trip type and enter a title");
      return;
    }
    const entry: TripEntry = {
      id: crypto.randomUUID(),
      type: selectedType.label,
      color: selectedType.color,
      title: title.trim(),
      destination: destination.trim(),
      status: "planning",
      note,
      time: "Just now",
    };
    setEntries(prev => [entry, ...prev]);
    speak(selectedType.label + " adventure added: " + title.trim() + (destination.trim() ? ". Destination: " + destination.trim() : ""));
    setSelectedType(null);
    setTitle("");
    setDestination("");
    setNote("");
  };

  const planning = entries.filter(e => e.status === "planning");
  const active = entries.filter(e => e.status === "active");

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-indigo-400">Ascend</h1><p className="text-xs text-muted-foreground">Adventure & Exploration</p></div>
          <div className="flex items-center gap-1 rounded-full bg-indigo-400/10 px-3 py-1.5 text-xs text-indigo-400 border border-indigo-400/20">
            <Zap className="h-3 w-3" />{planning.length} planned
          </div>
        </div>
      </div>

      {isListening && (
        <div className="mx-4 mt-4 flex items-center gap-2 rounded-lg border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-400">
          <div className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />Listening for adventure input...
        </div>
      )}

      {/* Trip Type */}
      <div className="mx-4 mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trip Type</p>
        <div className="grid grid-cols-4 gap-2">
          {TRIP_TYPES.map(({ icon: Icon, label, color }) => (
            <button key={label} onClick={() => setSelectedType(selectedType?.label === label ? null : { label, color })}
              className={"flex flex-col items-center gap-1 rounded-lg border p-3 text-xs transition " + (selectedType?.label === label ? "border-current bg-current/10 " + color : "border-border hover:border-indigo-400/50")}>
              <Icon className={"h-5 w-5 " + color} />
              <span className={selectedType?.label === label ? color : ""}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="mx-4 mt-4 space-y-3">
        <input value={title} onChange={e => setTitle(e.target.value)} onKeyDown={e => e.key === "Enter" && addEntry()} placeholder="Trip title"
          className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-400/50" />
        <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="Destination (optional)"
          className="w-full rounded-lg border border-border bg-secondary px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-400/50" />
        <input value={note} onChange={e => setNote(e.target.value)} placeholder="Note / plan details (optional)"
          className="w-full rounded-lg border border-border bg-secondary px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-400/50" />
        <div className="flex gap-2">
          <button onClick={addEntry} className="flex-1 rounded-lg bg-indigo-400 py-2.5 text-sm font-medium text-black hover:bg-indigo-300">
            Add Adventure
          </button>
          <button onClick={startListening} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary hover:border-indigo-400/50">
            <Mic className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Active */}
      {active.length > 0 && (
        <div className="mx-4 mt-6 space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Now ({active.length})</h2>
          {active.map(entry => (
            <div key={entry.id} className="rounded-lg border border-indigo-400/30 bg-indigo-400/5 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{entry.type === "Adventure" ? "🧗" : entry.type === "Travel" ? "✈️" : entry.type === "Hiking" ? "🏔️" : "🗺️"}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{entry.title}</p>
                  <p className="text-xs text-muted-foreground">{entry.destination}</p>
                  {entry.note && <p className="mt-1 text-xs text-muted-foreground">{entry.note}</p>}
                </div>
                <span className="rounded-full bg-indigo-400/10 px-2 py-0.5 text-[10px] text-indigo-400">Active</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Planning */}
      <div className="mx-4 mt-6 space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Planning ({planning.length})</h2>
        {planning.map(entry => (
          <div key={entry.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{entry.type === "Adventure" ? "🧗" : entry.type === "Travel" ? "✈️" : entry.type === "Hiking" ? "🏔️" : "🗺️"}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{entry.title}</p>
                {entry.destination && <p className="text-xs text-muted-foreground">{entry.destination}</p>}
                <div className="mt-1 flex items-center gap-2">
                  <span className={"text-[10px] " + entry.color}>{entry.type}</span>
                  {entry.note && <span className="text-[10px] text-muted-foreground line-clamp-1">{entry.note}</span>}
                  <span className="text-[10px] text-muted-foreground">{entry.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MicButton onActivate={startListening} />
      <CameraButton onCapture={b64 => console.log("Photo:", b64.substring(0, 30))} />
    </main>
  );
}
