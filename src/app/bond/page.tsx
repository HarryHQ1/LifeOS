"use client";

import { useState } from "react";
import { Mic, Users, Heart, Star, Calendar, MessageCircle, Zap, Phone } from "lucide-react";
import { MicButton } from "@/components/shell/MicButton";
import { useVoiceEngine } from "@/lib/engines/voice";

const RELATION_TYPES = [
  { icon: Heart, label: "Partner", color: "text-pink-400" },
  { icon: Users, label: "Family", color: "text-orange-400" },
  { icon: Star, label: "Friend", color: "text-yellow-400" },
  { icon: Briefcase, label: "Colleague", color: "text-blue-400" },
  { icon: Phone, label: "Acquaintance", color: "text-gray-400" },
];

const ACTIONS = ["Call", "Message", "Meet", "Gift", "Check-in"];

interface BondEntry {
  id: string;
  name: string;
  relation: string;
  color: string;
  action: string;
  note: string;
  done: boolean;
  time: string;
}

const SAMPLE: BondEntry[] = [
  { id: "1", name: "Sarah", relation: "Partner", color: "text-pink-400", action: "Call", note: "Weekly catch-up", done: false, time: "Today" },
  { id: "2", name: "Mom", relation: "Family", color: "text-orange-400", action: "Meet", note: "Sunday brunch", done: false, time: "Tomorrow" },
  { id: "3", name: "James", relation: "Friend", color: "text-yellow-400", action: "Message", note: "Birthday next week", done: false, time: "3 days" },
  { id: "4", name: "Priya", relation: "Colleague", color: "text-blue-400", action: "Check-in", note: "Coffee and feedback", done: true, time: "Yesterday" },
];

export default function BondPage() {
  const [entries, setEntries] = useState<BondEntry[]>(SAMPLE);
  const [selectedRelation, setSelectedRelation] = useState<{ label: string; color: string } | null>(null);
  const [name, setName] = useState("");
  const [action, setAction] = useState("Call");
  const [note, setNote] = useState("");
  const { isListening, speak, startListening } = useVoiceEngine();

  const addEntry = () => {
    if (!selectedRelation || !name.trim()) {
      speak("Please select a relationship type and enter a name");
      return;
    }
    const entry: BondEntry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      relation: selectedRelation.label,
      color: selectedRelation.color,
      action,
      note,
      done: false,
      time: "Just now",
    };
    setEntries(prev => [entry, ...prev]);
    speak(selectedRelation.label + " reminder added for " + name.trim());
    setSelectedRelation(null);
    setName("");
    setAction("Call");
    setNote("");
  };

  const toggle = (id: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, done: !e.done } : e));
  };

  const pending = entries.filter(e => !e.done);

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-pink-400">Bond</h1><p className="text-xs text-muted-foreground">Relationships & Social</p></div>
          <div className="flex items-center gap-1 rounded-full bg-pink-400/10 px-3 py-1.5 text-xs text-pink-400 border border-pink-400/20">
            <Users className="h-3 w-3" />{pending.length} pending
          </div>
        </div>
      </div>

      {isListening && (
        <div className="mx-4 mt-4 flex items-center gap-2 rounded-lg border border-pink-400/30 bg-pink-400/10 px-4 py-2 text-sm text-pink-400">
          <div className="h-2 w-2 animate-pulse rounded-full bg-pink-400" />Listening for relationship reminder...
        </div>
      )}

      {/* Stats */}
      <div className="mx-4 mt-4 grid grid-cols-4 gap-2">
        {[
          { label: "Total", value: entries.length, color: "text-pink-400" },
          { label: "Pending", value: pending.length, color: "text-orange-400" },
          { label: "Calls", value: entries.filter(e => e.action === "Call").length, color: "text-blue-400" },
          { label: "Meetups", value: entries.filter(e => e.action === "Meet").length, color: "text-green-400" },
        ].map(stat => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-2 text-center">
            <p className={"text-lg font-bold " + stat.color}>{stat.value}</p>
            <p className="text-[9px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Relation Type */}
      <div className="mx-4 mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Relationship</p>
        <div className="flex gap-2">
          {RELATION_TYPES.map(({ icon: Icon, label, color }) => (
            <button key={label} onClick={() => setSelectedRelation(selectedRelation?.label === label ? null : { label, color })}
              className={"flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs border transition " + (selectedRelation?.label === label ? "border-current bg-current/10 " + color : "border-border text-muted-foreground hover:border-pink-400/50")}>
              <Icon className="h-3 w-3" />{label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="mx-4 mt-4 space-y-3">
        <input value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && addEntry()} placeholder="Person's name"
          className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-400/50" />
        
        <div className="flex gap-2">
          {ACTIONS.map(a => (
            <button key={a} onClick={() => setAction(a)}
              className={"flex items-center gap-1 rounded-full px-3 py-1.5 text-xs border transition " + (action === a ? "border-pink-400 bg-pink-400/10 text-pink-400" : "border-border text-muted-foreground hover:border-pink-400/50")}>
              {a}
            </button>
          ))}
        </div>

        <input value={note} onChange={e => setNote(e.target.value)} placeholder="Note (optional)"
          className="w-full rounded-lg border border-border bg-secondary px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-400/50" />

        <div className="flex gap-2">
          <button onClick={addEntry} className="flex-1 rounded-lg bg-pink-400 py-2.5 text-sm font-medium text-black hover:bg-pink-300">
            Add Reminder
          </button>
          <button onClick={startListening} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary hover:border-pink-400/50">
            <Mic className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="mx-4 mt-6 space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reminders ({pending.length})</h2>
        {entries.map(entry => (
          <div key={entry.id} className={"rounded-lg border bg-card p-4 " + (entry.done ? "border-border/50 opacity-60" : "border-border")}>
            <div className="flex items-start gap-3">
              <button onClick={() => toggle(entry.id)} className={"mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border " + (entry.done ? "border-green-400 bg-green-400 text-black" : "border-border hover:border-pink-400")}>
                {entry.done && <Heart className="h-3 w-3 text-black" />}
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{entry.name}</p>
                  <span className={"text-[10px] " + entry.color}>{entry.relation}</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded px-1.5 py-0.5 text-[10px] bg-secondary text-muted-foreground">{entry.action}</span>
                  {entry.note && <span className="text-[10px] text-muted-foreground line-clamp-1">{entry.note}</span>}
                  <span className="text-[10px] text-muted-foreground">{entry.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MicButton onActivate={startListening} />
    </main>
  );
}
