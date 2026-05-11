"use client";

import { useState } from "react";
import { Mic, Search, BookOpen, Globe, Lightbulb, Zap, ChevronRight, ExternalLink } from "lucide-react";
import { MicButton } from "@/components/shell/MicButton";
import { useVoiceEngine } from "@/lib/engines/voice";

const SOURCES = [
  { icon: BookOpen, label: "Web", color: "text-orange-400" },
  { icon: Globe, label: "Academic", color: "text-blue-400" },
  { icon: Lightbulb, label: "AI Summary", color: "text-purple-400" },
];

interface ResearchCard {
  id: string;
  query: string;
  source: string;
  color: string;
  summary: string;
  url: string;
  saved: boolean;
  time: string;
}

const SAMPLE: ResearchCard[] = [
  { id: "1", query: "How to build sustainable habits in 2026", source: "Web", color: "text-orange-400", summary: "Key insight: Habit stacking + environmental design outperforms willpower-based approaches by 3x.", url: "https://example.com", saved: false, time: "2h ago" },
  { id: "2", query: "LLM reasoning limitations", source: "Academic", color: "text-blue-400", summary: "Current models struggle with multi-step causal reasoning beyond 7 chained inference steps.", url: "https://example.com", saved: true, time: "Yesterday" },
  { id: "3", query: "Remote work productivity trends", source: "AI Summary", color: "text-purple-400", summary: "Async-first companies show 40% higher output but require explicit process documentation.", url: "https://example.com", saved: false, time: "3 days ago" },
];

export default function OraclePage() {
  const [entries, setEntries] = useState<ResearchCard[]>(SAMPLE);
  const [query, setQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState<{ label: string; color: string }>({ label: "Web", color: "text-orange-400" });
  const [isResearching, setIsResearching] = useState(false);
  const { isListening, speak, startListening } = useVoiceEngine();

  const doResearch = () => {
    if (!query.trim()) {
      speak("Please enter a research query");
      return;
    }
    setIsResearching(true);
    const newEntry: ResearchCard = {
      id: crypto.randomUUID(),
      query: query.trim(),
      source: selectedSource.label,
      color: selectedSource.color,
      summary: "Research in progress... " + query.trim() + " — synthesizing results from " + selectedSource.label + " sources.",
      url: "https://example.com",
      saved: false,
      time: "Just now",
    };
    setEntries(prev => [newEntry, ...prev]);
    speak("Researching: " + query.trim() + ". Summarizing from " + selectedSource.label + " sources.");
    setQuery("");
    setTimeout(() => setIsResearching(false), 2000);
  };

  const toggleSaved = (id: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, saved: !e.saved } : e));
  };

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-orange-400">Oracle</h1><p className="text-xs text-muted-foreground">Research & Insights</p></div>
          <div className="flex items-center gap-1 rounded-full bg-orange-400/10 px-3 py-1.5 text-xs text-orange-400 border border-orange-400/20">
            <Zap className="h-3 w-3" />{entries.filter(e => e.saved).length} saved
          </div>
        </div>
      </div>

      {isListening && (
        <div className="mx-4 mt-4 flex items-center gap-2 rounded-lg border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm text-orange-400">
          <div className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />Listening for research query...
        </div>
      )}

      {/* Search */}
      <div className="mx-4 mt-4 space-y-3">
        <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && doResearch()} placeholder="Ask anything..."
          className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-400/50" />
        
        <div className="flex gap-2">
          {SOURCES.map(({ icon: Icon, label, color }) => (
            <button key={label} onClick={() => setSelectedSource({ label, color })}
              className={"flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs border transition " + (selectedSource.label === label ? "border-current bg-current/10 " + color : "border-border text-muted-foreground hover:border-orange-400/50")}>
              <Icon className="h-3 w-3" />{label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button onClick={doResearch} disabled={isResearching} className="flex-1 rounded-lg bg-orange-400 py-2.5 text-sm font-medium text-black hover:bg-orange-300 disabled:opacity-50">
            {isResearching ? "Researching..." : "Research"}
          </button>
          <button onClick={startListening} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary hover:border-orange-400/50">
            <Mic className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="mx-4 mt-6 space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Research ({entries.length})</h2>
        {entries.map(entry => (
          <div key={entry.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Search className={"h-4 w-4 " + entry.color} />
                <p className="text-sm font-medium text-foreground">{entry.query}</p>
              </div>
              <button onClick={() => toggleSaved(entry.id)} className={"text-xs " + (entry.saved ? "text-orange-400" : "text-muted-foreground")}>
                {entry.saved ? "★ Saved" : "☆ Save"}
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{entry.summary}</p>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={"text-[10px] " + entry.color}>{entry.source}</span>
                <span className="text-[10px] text-muted-foreground">{entry.time}</span>
              </div>
              <a href={entry.url} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-400 hover:underline flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />Source
              </a>
            </div>
          </div>
        ))}
      </div>

      <MicButton onActivate={startListening} />
    </main>
  );
}
