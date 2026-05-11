"use client";

import { useState } from "react";
import { Mic, BookOpen, GraduationCap, Trophy, Zap, Star, ChevronRight } from "lucide-react";
import { MicButton } from "@/components/shell/MicButton";
import { useVoiceEngine } from "@/lib/engines/voice";

const SUBJECTS = [
  { icon: BookOpen, label: "Reading", color: "text-cyan-400" },
  { icon: GraduationCap, label: "Course", color: "text-blue-400" },
  { icon: Trophy, label: "Skill", color: "text-amber-400" },
  { icon: Star, label: "Project", color: "text-purple-400" },
];

interface ElevateEntry {
  id: string;
  subject: string;
  color: string;
  title: string;
  progress: number;
  note: string;
  time: string;
}

const SAMPLE: ElevateEntry[] = [
  { id: "1", subject: "Course", color: "text-blue-400", title: "Advanced TypeScript", progress: 65, note: "Module 4: Generics", time: "2h ago" },
  { id: "2", subject: "Reading", color: "text-cyan-400", title: "Atomic Habits", progress: 40, note: "Chapter 7", time: "Yesterday" },
  { id: "3", subject: "Skill", color: "text-amber-400", title: "Public Speaking", progress: 80, note: "Practice session 3 done", time: "3 days ago" },
  { id: "4", subject: "Project", color: "text-purple-400", title: "Build AI agent", progress: 25, note: "Started this week", time: "1 week ago" },
];

export default function ElevatePage() {
  const [entries, setEntries] = useState<ElevateEntry[]>(SAMPLE);
  const [selectedSubject, setSelectedSubject] = useState<{ label: string; color: string } | null>(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const { isListening, speak, startListening } = useVoiceEngine();

  const addEntry = () => {
    if (!selectedSubject || !title.trim()) {
      speak("Please select a subject and enter a title");
      return;
    }
    const entry: ElevateEntry = {
      id: crypto.randomUUID(),
      subject: selectedSubject.label,
      color: selectedSubject.color,
      title: title.trim(),
      progress: 0,
      note,
      time: "Just now",
    };
    setEntries(prev => [entry, ...prev]);
    speak(selectedSubject.label + " learning entry added: " + title.trim());
    setSelectedSubject(null);
    setTitle("");
    setNote("");
  };

  const increment = (id: string, by: number) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, progress: Math.min(100, e.progress + by) } : e));
  };

  const avgProgress = Math.round(entries.reduce((s, e) => s + e.progress, 0) / Math.max(entries.length, 1));

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-cyan-400">Elevate</h1><p className="text-xs text-muted-foreground">Learning & Growth</p></div>
          <div className="flex items-center gap-1 rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-400 border border-cyan-400/20">
            <Zap className="h-3 w-3" />Avg progress: {avgProgress}%
          </div>
        </div>
      </div>

      {isListening && (
        <div className="mx-4 mt-4 flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-400">
          <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />Listening for learning input...
        </div>
      )}

      {/* Subject Picker */}
      <div className="mx-4 mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">What are you learning?</p>
        <div className="grid grid-cols-4 gap-2">
          {SUBJECTS.map(({ icon: Icon, label, color }) => (
            <button key={label} onClick={() => setSelectedSubject(selectedSubject?.label === label ? null : { label, color })}
              className={"flex flex-col items-center gap-1 rounded-lg border p-3 text-xs transition " + (selectedSubject?.label === label ? "border-current bg-current/10 " + color : "border-border hover:border-cyan-400/50")}>
              <Icon className={"h-5 w-5 " + color} />
              <span className={selectedSubject?.label === label ? color : ""}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="mx-4 mt-4 space-y-3">
        <input value={title} onChange={e => setTitle(e.target.value)} onKeyDown={e => e.key === "Enter" && addEntry()} placeholder="Book, course, or skill name"
          className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-400/50" />
        <input value={note} onChange={e => setNote(e.target.value)} placeholder="Current focus / note (optional)"
          className="w-full rounded-lg border border-border bg-secondary px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-400/50" />
        <div className="flex gap-2">
          <button onClick={addEntry} className="flex-1 rounded-lg bg-cyan-400 py-2.5 text-sm font-medium text-black hover:bg-cyan-300">
            Add Learning
          </button>
          <button onClick={startListening} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary hover:border-cyan-400/50">
            <Mic className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="mx-4 mt-6 space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Learning ({entries.length})</h2>
        {entries.map(entry => (
          <div key={entry.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className={"text-xl "}>{entry.subject === "Course" ? "🎓" : entry.subject === "Reading" ? "📖" : entry.subject === "Skill" ? "🏆" : "⭐"}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{entry.title}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={"text-[10px] " + entry.color}>{entry.subject}</span>
                    {entry.note && <span className="text-[10px] text-muted-foreground line-clamp-1">{entry.note}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => increment(entry.id, -10)} className="text-muted-foreground hover:text-cyan-400 text-xs">-</button>
                <span className={"text-lg font-bold " + entry.color}>{entry.progress}%</span>
                <button onClick={() => increment(entry.id, 10)} className="text-muted-foreground hover:text-cyan-400 text-xs">+</button>
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-muted">
              <div className="h-2 rounded-full bg-current" style={{ width: entry.progress + "%", accentColor: "cyan" }} />
            </div>
          </div>
        ))}
      </div>

      <MicButton onActivate={startListening} />
    </main>
  );
}
