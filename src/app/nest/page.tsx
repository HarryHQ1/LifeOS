"use client";

import { useState } from "react";
import { Mic, Home, ShoppingCart, Wrench, Receipt, Lightbulb, Zap, X, CheckCircle } from "lucide-react";
import { MicButton } from "@/components/shell/MicButton";
import { useVoiceEngine } from "@/lib/engines/voice";

const CATEGORIES = [
  { icon: Home, label: "Cleaning", color: "text-amber-400" },
  { icon: Wrench, label: "Repairs", color: "text-orange-400" },
  { icon: ShoppingCart, label: "Groceries", color: "text-green-400" },
  { icon: Receipt, label: "Bills", color: "text-red-400" },
  { icon: Lightbulb, label: "Ideas", color: "text-yellow-400" },
];

interface NestEntry {
  id: string;
  category: string;
  color: string;
  title: string;
  done: boolean;
  urgent: boolean;
  note: string;
  time: string;
}

const SAMPLE: NestEntry[] = [
  { id: "1", category: "Groceries", color: "text-green-400", title: "Buy milk, eggs, bread", done: false, urgent: false, note: "Weekly groceries", time: "Today" },
  { id: "2", category: "Cleaning", color: "text-amber-400", title: "Clean the kitchen floor", done: false, urgent: true, note: "", time: "Today" },
  { id: "3", category: "Bills", color: "text-red-400", title: "Pay electricity bill", done: false, urgent: true, note: "Due in 2 days", time: "Tomorrow" },
  { id: "4", category: "Repairs", color: "text-orange-400", title: "Fix leaking faucet", done: false, urgent: false, note: "Call plumber", time: "This week" },
  { id: "5", category: "Ideas", color: "text-yellow-400", title: "Reorganize bookshelf", done: true, urgent: false, note: "", time: "Yesterday" },
];

export default function NestPage() {
  const [entries, setEntries] = useState<NestEntry[]>(SAMPLE);
  const [selectedCategory, setSelectedCategory] = useState<{ label: string; color: string } | null>(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [urgent, setUrgent] = useState(false);
  const { isListening, speak, startListening } = useVoiceEngine();

  const addEntry = () => {
    if (!selectedCategory || !title.trim()) {
      speak("Please select a category and enter a task");
      return;
    }
    const entry: NestEntry = {
      id: crypto.randomUUID(),
      category: selectedCategory.label,
      color: selectedCategory.color,
      title: title.trim(),
      done: false,
      urgent,
      note,
      time: "Just now",
    };
    setEntries(prev => [entry, ...prev]);
    speak(selectedCategory.label + " task added: " + title.trim());
    setSelectedCategory(null);
    setTitle("");
    setNote("");
    setUrgent(false);
  };

  const toggle = (id: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, done: !e.done } : e));
  };

  const remove = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const pending = entries.filter(e => !e.done);
  const done = entries.filter(e => e.done);
  const urgentCount = pending.filter(e => e.urgent).length;

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-amber-400">Nest</h1><p className="text-xs text-muted-foreground">Home & Living</p></div>
          <div className="flex items-center gap-1 rounded-full bg-amber-400/10 px-3 py-1.5 text-xs text-amber-400 border border-amber-400/20">
            <Zap className="h-3 w-3" />{urgentCount} urgent
          </div>
        </div>
      </div>

      {isListening && (
        <div className="mx-4 mt-4 flex items-center gap-2 rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-400">
          <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />Listening for home task...
        </div>
      )}

      {/* Quick Stats */}
      <div className="mx-4 mt-4 grid grid-cols-3 gap-3">
        {[
          { label: "Pending", value: pending.length, color: "text-amber-400" },
          { label: "Urgent", value: urgentCount, color: "text-red-400" },
          { label: "Done", value: done.length, color: "text-green-400" },
        ].map(stat => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-3 text-center">
            <p className={"text-2xl font-bold " + stat.color}>{stat.value}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Category Picker */}
      <div className="mx-4 mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</p>
        <div className="flex gap-2">
          {CATEGORIES.map(({ icon: Icon, label, color }) => (
            <button key={label} onClick={() => setSelectedCategory(selectedCategory?.label === label ? null : { label, color })}
              className={"flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs border transition " + (selectedCategory?.label === label ? "border-current bg-current/10 " + color : "border-border text-muted-foreground hover:border-amber-400/50")}>
              <Icon className="h-3 w-3" />{label}
            </button>
          ))}
        </div>
      </div>

      {/* Task Input */}
      <div className="mx-4 mt-4 space-y-3">
        <input value={title} onChange={e => setTitle(e.target.value)} onKeyDown={e => e.key === "Enter" && addEntry()} placeholder="What needs to be done?"
          className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-400/50" />
        
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <input type="checkbox" checked={urgent} onChange={e => setUrgent(e.target.checked)} className="rounded" />
            Urgent
          </label>
        </div>

        <input value={note} onChange={e => setNote(e.target.value)} placeholder="Note (optional)"
          className="w-full rounded-lg border border-border bg-secondary px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-400/50" />

        <div className="flex gap-2">
          <button onClick={addEntry} className="flex-1 rounded-lg bg-amber-400 py-2.5 text-sm font-medium text-black hover:bg-amber-300">
            Add Task
          </button>
          <button onClick={startListening} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary hover:border-amber-400/50">
            <Mic className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Pending */}
      <div className="mx-4 mt-6 space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">To Do ({pending.length})</h2>
        {pending.map(entry => (
          <div key={entry.id} className={"rounded-lg border bg-card p-4 " + (entry.urgent ? "border-red-400/50" : "border-border")}>
            <div className="flex items-start gap-3">
              <button onClick={() => toggle(entry.id)} className={"mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border " + (entry.urgent ? "border-red-400 hover:border-red-400" : "border-border hover:border-amber-400")}>
                <div className="h-2 w-2 rounded-full bg-muted-foreground" />
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{entry.title}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className={"text-[10px] " + entry.color}>{entry.category}</span>
                  {entry.note && <span className="text-[10px] text-muted-foreground line-clamp-1">{entry.note}</span>}
                  <span className="text-[10px] text-muted-foreground">{entry.time}</span>
                </div>
              </div>
              <button onClick={() => remove(entry.id)} className="text-muted-foreground hover:text-red-400">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Done */}
      {done.length > 0 && (
        <div className="mx-4 mt-6 space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Done ({done.length})</h2>
          {done.map(entry => (
            <div key={entry.id} className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/50 p-4 opacity-60">
              <button onClick={() => toggle(entry.id)} className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-400 text-black">
                <CheckCircle className="h-3 w-3" />
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground line-through">{entry.title}</p>
                <span className={"text-[10px] " + entry.color}>{entry.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <MicButton onActivate={startListening} />
    </main>
  );
}
