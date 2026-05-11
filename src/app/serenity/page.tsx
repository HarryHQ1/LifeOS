"use client";

import { useState } from "react";
import { Mic, Brain, Heart, Leaf, Coffee, Briefcase, Users, Zap } from "lucide-react";
import { MicButton } from "@/components/shell/MicButton";
import { useVoiceEngine } from "@/lib/engines/voice";

const EMOJIS = ["😊", "😌", "😔", "😤", "🥰", "😰", "😴", "🤩", "😤", "😐"];

const TRIGGERS = [
  { icon: Briefcase, label: "Work", color: "text-blue-400" },
  { icon: Users, label: "Social", color: "text-pink-400" },
  { icon: Heart, label: "Health", color: "text-red-400" },
  { icon: Coffee, label: "Rest", color: "text-amber-400" },
  { icon: Leaf, label: "Nature", color: "text-green-400" },
  { icon: Brain, label: "Mental", color: "text-purple-400" },
];

interface MoodEntry {
  id: string;
  emoji: string;
  score: number;
  energy: number;
  stress: number;
  triggers: string[];
  note: string;
  time: string;
}

const SAMPLE: MoodEntry[] = [
  { id: "1", emoji: "😊", score: 8, energy: 7, stress: 3, triggers: ["Work", "Social"], note: "Great productive day!", time: "2h ago" },
  { id: "2", emoji: "😌", score: 6, energy: 5, stress: 4, triggers: ["Rest"], note: "Took it slow today", time: "Yesterday" },
  { id: "3", emoji: "😤", score: 4, energy: 6, stress: 8, triggers: ["Work"], note: "High pressure deadline", time: "2 days ago" },
];

export default function SerenityPage() {
  const [entries, setEntries] = useState<MoodEntry[]>(SAMPLE);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [score, setScore] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [stress, setStress] = useState(3);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const { isListening, speak, startListening } = useVoiceEngine();

  const logMood = () => {
    if (!selectedEmoji) {
      speak("Please select a mood emoji first");
      return;
    }
    const entry: MoodEntry = {
      id: crypto.randomUUID(),
      emoji: selectedEmoji,
      score,
      energy,
      stress,
      triggers: selectedTriggers,
      note,
      time: "Just now",
    };
    setEntries(prev => [entry, ...prev]);
    speak("Mood logged: " + selectedEmoji + ". Score " + score + "/10." + (selectedTriggers.length > 0 ? " Triggers: " + selectedTriggers.join(", ") + "." : ""));
    setSelectedEmoji("");
    setScore(5);
    setEnergy(5);
    setStress(3);
    setSelectedTriggers([]);
    setNote("");
  };

  const toggleTrigger = (label: string) => {
    setSelectedTriggers(prev => prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label]);
  };

  const avgScore = Math.round(entries.reduce((s, e) => s + e.score, 0) / entries.length);
  const avgEnergy = Math.round(entries.reduce((s, e) => s + e.energy, 0) / entries.length);
  const avgStress = Math.round(entries.reduce((s, e) => s + e.stress, 0) / entries.length);

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-purple-400">Serenity</h1><p className="text-xs text-muted-foreground">Mood & Emotions</p></div>
          <div className="flex items-center gap-1 rounded-full bg-purple-400/10 px-3 py-1.5 text-xs text-purple-400 border border-purple-400/20">
            <Zap className="h-3 w-3" />7-day avg: {avgScore}/10
          </div>
        </div>
      </div>

      {isListening && (
        <div className="mx-4 mt-4 flex items-center gap-2 rounded-lg border border-purple-400/30 bg-purple-400/10 px-4 py-2 text-sm text-purple-400">
          <div className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />Listening for mood input...
        </div>
      )}

      <div className="mx-4 mt-4 grid grid-cols-3 gap-3">
        {[
          { label: "Mood", value: avgScore, color: "text-purple-400", bar: avgScore * 10 + "%" },
          { label: "Energy", value: avgEnergy, color: "text-green-400", bar: avgEnergy * 10 + "%" },
          { label: "Stress", value: avgStress, color: "text-orange-400", bar: avgStress * 10 + "%" },
        ].map(stat => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{stat.label}</p>
            <p className={"text-2xl font-bold " + stat.color}>{stat.value}</p>
            <div className="mt-2 h-1 rounded-full bg-muted">
              <div className="h-1 rounded-full bg-current" style={{ width: stat.bar }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">How are you feeling?</p>
        <div className="flex gap-2">
          {EMOJIS.map(e => (
            <button key={e} onClick={() => setSelectedEmoji(e)} className={"text-2xl rounded-lg p-2 transition " + (selectedEmoji === e ? "bg-purple-400/20 scale-125" : "hover:bg-secondary")}>{e}</button>
          ))}
        </div>
      </div>

      <div className="mx-4 mt-6 space-y-4">
        {[
          { label: "Mood", value: score, set: setScore },
          { label: "Energy", value: energy, set: setEnergy },
          { label: "Stress", value: stress, set: setStress },
        ].map(({ label, value, set }) => (
          <div key={label}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{value}/10</span>
            </div>
            <input type="range" min="1" max="10" value={value} onChange={e => set(Number(e.target.value))}
              className="w-full" style={{ accentColor: "purple" }} />
          </div>
        ))}
      </div>

      <div className="mx-4 mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Triggers</p>
        <div className="flex flex-wrap gap-2">
          {TRIGGERS.map(({ icon: Icon, label, color }) => (
            <button key={label} onClick={() => toggleTrigger(label)}
              className={"flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs border transition " + (selectedTriggers.includes(label) ? "border-current bg-current/10 " + color : "border-border text-muted-foreground hover:border-purple-400/50")}>
              <Icon className="h-3 w-3" />{label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-4 mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Journal</p>
        <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="What's on your mind?"
          className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-400/50 resize-none" />
      </div>

      <div className="mx-4 mt-4 flex gap-2">
        <button onClick={logMood} className="flex-1 rounded-lg bg-purple-400 py-2.5 text-sm font-medium text-black hover:bg-purple-300">
          Log Mood
        </button>
        <button onClick={startListening} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary hover:border-purple-400/50">
          <Mic className="h-4 w-4" />
        </button>
      </div>

      <div className="mx-4 mt-6 space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent ({entries.length})</h2>
        {entries.map(entry => (
          <div key={entry.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{entry.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">{entry.time}</div>
                  <div className="mt-1 flex gap-2">
                    <span className="text-[10px] text-purple-400">Mood {entry.score}</span>
                    <span className="text-[10px] text-green-400">Energy {entry.energy}</span>
                    <span className="text-[10px] text-orange-400">Stress {entry.stress}</span>
                  </div>
                </div>
              </div>
              {entry.triggers.length > 0 && (
                <div className="flex gap-1">{entry.triggers.map(t => <span key={t} className="rounded px-1.5 py-0.5 text-[10px] bg-secondary text-muted-foreground">{t}</span>)}</div>
              )}
            </div>
            {entry.note && <p className="mt-2 text-xs text-muted-foreground">{entry.note}</p>}
          </div>
        ))}
      </div>

      <MicButton onActivate={startListening} />
    </main>
  );
}
