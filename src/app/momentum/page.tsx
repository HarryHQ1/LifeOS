"use client";

import { useState } from "react";
import { Mic, Plus, CheckCircle, Clock, Zap, Search } from "lucide-react";
import { MicButton } from "@/components/shell/MicButton";
import { CameraButton } from "@/components/shell/CameraButton";
import { useVoiceEngine } from "@/lib/engines/voice";

interface Task {
  id: string;
  title: string;
  deadline?: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "done";
}

const SAMPLE: Task[] = [
  { id: "1", title: "Finish client proposal", deadline: "Tomorrow", priority: "high", status: "pending" },
  { id: "2", title: "Call the accountant", deadline: "Overdue 3 days", priority: "medium", status: "pending" },
  { id: "3", title: "Review team report", deadline: "Today", priority: "medium", status: "pending" },
];

export default function MomentumPage() {
  const [tasks, setTasks] = useState<Task[]>(SAMPLE);
  const [input, setInput] = useState("");
  const { isListening, speak, startListening } = useVoiceEngine();

  const addTask = (title: string) => {
    if (!title.trim()) return;
    setTasks(prev => [{ id: crypto.randomUUID(), title: title.trim(), priority: "medium", status: "pending" }, ...prev]);
    speak(`Task added: ${title.trim()}`);
  };

  const toggle = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === "pending" ? "done" : "pending" } : t));
  };

  const greeting = () => {
    const hour = new Date().getHours();
    const day = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    const pending = tasks.filter(t => t.status === "pending").slice(0, 3);
    const text = `Good ${hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening"}. It is ${day}. You have ${tasks.filter(t => t.status === "pending").length} tasks. Your top 3: ${pending.map((t, i) => `${i+1}. ${t.title}`).join(". ")}`;
    speak(text);
  };

  const pending = tasks.filter(t => t.status === "pending");
  const done = tasks.filter(t => t.status === "done");

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-yellow-400">Momentum</h1><p className="text-xs text-muted-foreground">Work & Productivity</p></div>
          <button onClick={greeting} className="flex items-center gap-1.5 rounded-full bg-yellow-400/10 px-3 py-1.5 text-xs text-yellow-400 border border-yellow-400/20">
            <Zap className="h-3 w-3" />Morning Summary
          </button>
        </div>
      </div>

      {isListening && (
        <div className="mx-4 mt-4 flex items-center gap-2 rounded-lg border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm text-yellow-400">
          <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />Listening...
        </div>
      )}

      <div className="mx-4 mt-4 flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask(input)} placeholder="Add a task..."
          className="flex-1 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-yellow-400/50" />
        <button onClick={() => addTask(input)} className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-400 text-black hover:bg-yellow-300"><Plus className="h-5 w-5" /></button>
        <button onClick={startListening} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary hover:border-yellow-400/50"><Mic className="h-5 w-5" /></button>
      </div>

      <div className="mx-4 mt-6 space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Today ({pending.length})</h2>
        {pending.map(task => (
          <div key={task.id} className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 hover:border-yellow-400/30">
            <button onClick={() => toggle(task.id)} className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-border hover:border-yellow-400">
              <div className="h-2 w-2 rounded-full bg-muted-foreground group-hover:bg-yellow-400" />
            </button>
            <div className="min-w-0 flex-1"><p className="text-sm font-medium text-foreground">{task.title}</p>
              {task.deadline && <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{task.deadline}</div>}
            </div>
            <span className={`flex-shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium uppercase ${task.priority === "high" ? "bg-red-400/10 text-red-400" : task.priority === "medium" ? "bg-yellow-400/10 text-yellow-400" : "bg-muted text-muted-foreground"}`}>{task.priority}</span>
          </div>
        ))}
      </div>

      {done.length > 0 && (
        <div className="mx-4 mt-6 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Completed ({done.length})</h2>
          {done.map(task => (
            <div key={task.id} className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/50 p-4 opacity-60">
              <button onClick={() => toggle(task.id)} className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400 text-black"><CheckCircle className="h-3 w-3" /></button>
              <p className="flex-1 text-sm text-muted-foreground line-through">{task.title}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mx-4 mt-6">
        <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-secondary/50 px-4 py-3 text-left hover:border-cyan-400/30">
          <Search className="h-4 w-4 text-cyan-400" />
          <span className="text-sm text-muted-foreground">Research productivity trends for 2026...</span>
        </button>
      </div>

      <MicButton onActivate={startListening} />
      <CameraButton onCapture={b64 => console.log("Photo:", b64.substring(0, 30))} />
    </main>
  );
}
