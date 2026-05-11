"use client";

import { useState } from "react";
import { Mic, Dumbbell, Droplets, Footprints, Zap, Apple, Moon, Heart } from "lucide-react";
import { MicButton } from "@/components/shell/MicButton";
import { useVoiceEngine } from "@/lib/engines/voice";

const WORKOUT_TYPES = [
  { icon: Dumbbell, label: "Strength", color: "text-red-400" },
  { icon: Heart, label: "Cardio", color: "text-pink-400" },
  { icon: Apple, label: "Nutrition", color: "text-green-400" },
  { icon: Moon, label: "Sleep", color: "text-blue-400" },
  { icon: Zap, label: "HIIT", color: "text-orange-400" },
  { icon: Footprints, label: "Steps", color: "text-cyan-400" },
];

const INTENSITY_LEVELS = ["Low", "Medium", "High", "Extreme"];

interface VitalityEntry {
  id: string;
  type: string;
  typeColor: string;
  duration: string;
  intensity: string;
  value: number;
  unit: string;
  note: string;
  time: string;
}

const SAMPLE: VitalityEntry[] = [
  { id: "1", type: "Strength", typeColor: "text-red-400", duration: "45 min", intensity: "High", value: 3, unit: "sets", note: "Upper body workout", time: "2h ago" },
  { id: "2", type: "Cardio", typeColor: "text-pink-400", duration: "30 min", intensity: "Medium", value: 5, unit: "km", note: "Morning run", time: "Yesterday" },
  { id: "3", type: "Hydration", typeColor: "text-blue-400", duration: "", intensity: "", value: 8, unit: "glasses", note: "Good hydration day", time: "3h ago" },
  { id: "4", type: "Steps", typeColor: "text-cyan-400", duration: "", intensity: "", value: 8420, unit: "steps", note: "Almost hit 10k", time: "1 day ago" },
];

export default function VitalityPage() {
  const [entries, setEntries] = useState<VitalityEntry[]>(SAMPLE);
  const [selectedType, setSelectedType] = useState<{ label: string; color: string } | null>(null);
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("Medium");
  const [value, setValue] = useState(1);
  const [unit, setUnit] = useState("min");
  const [note, setNote] = useState("");
  const { isListening, speak, startListening } = useVoiceEngine();

  const logEntry = () => {
    if (!selectedType) {
      speak("Please select a workout type first");
      return;
    }
    const entry: VitalityEntry = {
      id: crypto.randomUUID(),
      type: selectedType.label,
      typeColor: selectedType.color,
      duration,
      intensity,
      value,
      unit,
      note,
      time: "Just now",
    };
    setEntries(prev => [entry, ...prev]);
    speak(selectedType.label + " logged: " + value + " " + unit + "." + (note ? " Note: " + note : ""));
    setSelectedType(null);
    setDuration("");
    setIntensity("Medium");
    setValue(1);
    setUnit("min");
    setNote("");
  };

  const selectType = (label: string, color: string) => {
    const isSelected = selectedType?.label === label;
    setSelectedType(isSelected ? null : { label, color });
    if (label === "Steps" || label === "Hydration") {
      setUnit(label === "Hydration" ? "glasses" : "steps");
      setDuration("");
      setIntensity("");
    } else {
      setUnit("min");
    }
  };

  const avgMood = Math.round(entries.reduce((s, e) => s + (e.type === "Strength" ? e.value : 5), 0) / Math.max(entries.length, 1));

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-green-400">Vitality</h1><p className="text-xs text-muted-foreground">Health & Fitness</p></div>
          <div className="flex items-center gap-1 rounded-full bg-green-400/10 px-3 py-1.5 text-xs text-green-400 border border-green-400/20">
            <Zap className="h-3 w-3" />{entries.length} entries this week
          </div>
        </div>
      </div>

      {isListening && (
        <div className="mx-4 mt-4 flex items-center gap-2 rounded-lg border border-green-400/30 bg-green-400/10 px-4 py-2 text-sm text-green-400">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />Listening for health input...
        </div>
      )}

      {/* Quick Stats */}
      <div className="mx-4 mt-4 grid grid-cols-4 gap-2">
        {[
          { label: "Steps", value: "8.4k", color: "text-cyan-400", icon: Footprints },
          { label: "Water", value: "8", color: "text-blue-400", icon: Droplets },
          { label: "Workouts", value: entries.filter(e => ["Strength","Cardio","HIIT"].includes(e.type)).length.toString(), color: "text-red-400", icon: Dumbbell },
          { label: "Avg Energy", value: "7/10", color: "text-green-400", icon: Zap },
        ].map(stat => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-2 text-center">
            <stat.icon className={"mx-auto h-4 w-4 " + stat.color} />
            <p className={"text-lg font-bold " + stat.color}>{stat.value}</p>
            <p className="text-[9px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Workout Type Grid */}
      <div className="mx-4 mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Log Activity</p>
        <div className="grid grid-cols-3 gap-2">
          {WORKOUT_TYPES.map(({ icon: Icon, label, color }) => (
            <button key={label} onClick={() => selectType(label, color)}
              className={"flex flex-col items-center gap-1 rounded-lg border p-3 text-xs transition " + (selectedType?.label === label ? "border-current bg-current/10 " + color : "border-border hover:border-green-400/50")}>
              <Icon className={"h-5 w-5 " + color} />
              <span className={selectedType?.label === label ? color : ""}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Value Input */}
      {selectedType && (
        <div className="mx-4 mt-4 space-y-3">
          {selectedType.label === "Steps" || selectedType.label === "Hydration" ? (
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">{selectedType.label === "Hydration" ? "Glasses of water" : "Step count"}</span>
                <span className="font-medium">{value} {unit}</span>
              </div>
              <input type="range" min="1" max={selectedType.label === "Hydration" ? 16 : 20000} step={selectedType.label === "Hydration" ? 1 : 100} value={value}
                onChange={e => setValue(Number(e.target.value))} className="w-full" style={{ accentColor: "green" }} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Duration ({unit})</p>
                <input type="number" min="1" value={value} onChange={e => setValue(Number(e.target.value))}
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400/50" />
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Intensity</p>
                <select value={intensity} onChange={e => setIntensity(e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400/50">
                  {INTENSITY_LEVELS.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
            </div>
          )}

          <div>
            <p className="mb-1 text-xs text-muted-foreground">Note (optional)</p>
            <input value={note} onChange={e => setNote(e.target.value)} placeholder="How did it go?"
              className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-400/50" />
          </div>

          <button onClick={logEntry} className="w-full rounded-lg bg-green-400 py-2.5 text-sm font-medium text-black hover:bg-green-300">
            Log {selectedType.label}
          </button>
        </div>
      )}

      {/* Log Button with Mic */}
      {!selectedType && (
        <div className="mx-4 mt-4 flex gap-2">
          <button onClick={logEntry} className="flex-1 rounded-lg bg-green-400 py-2.5 text-sm font-medium text-black hover:bg-green-300">
            Quick Log
          </button>
          <button onClick={startListening} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary hover:border-green-400/50">
            <Mic className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* History */}
      <div className="mx-4 mt-6 space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent ({entries.length})</h2>
        {entries.map(entry => (
          <div key={entry.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={"rounded-full p-2 bg-current/10"}>
                  <span className={entry.typeColor}>{entry.type === "Strength" ? "💪" : entry.type === "Cardio" ? "❤️" : entry.type === "Hydration" ? "💧" : entry.type === "Steps" ? "👟" : "⚡"}</span>
                </div>
                <div>
                  <p className={"text-sm font-medium " + entry.typeColor}>{entry.type}</p>
                  <p className="text-xs text-muted-foreground">{entry.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={"text-lg font-bold " + entry.typeColor}>{entry.value}</p>
                <p className="text-[10px] text-muted-foreground">{entry.unit}</p>
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              {entry.intensity && <span className="rounded px-1.5 py-0.5 text-[10px] bg-secondary text-muted-foreground">{entry.intensity}</span>}
              {entry.duration && <span className="rounded px-1.5 py-0.5 text-[10px] bg-secondary text-muted-foreground">{entry.duration}</span>}
              {entry.note && <span className="rounded px-1.5 py-0.5 text-[10px] bg-secondary text-muted-foreground line-clamp-1">{entry.note}</span>}
            </div>
          </div>
        ))}
      </div>

      <MicButton onActivate={startListening} />
    </main>
  );
}
