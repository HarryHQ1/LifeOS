"use client";

import { useState } from "react";
import { Mic, CreditCard, TrendingUp, TrendingDown, Wallet, PiggyBank, Zap, Landmark, Receipt } from "lucide-react";
import { MicButton } from "@/components/shell/MicButton";
import { useVoiceEngine } from "@/lib/engines/voice";

const CATEGORIES = [
  { icon: Landmark, label: "Income", color: "text-green-400" },
  { icon: Receipt, label: "Expense", color: "text-red-400" },
  { icon: PiggyBank, label: "Savings", color: "text-blue-400" },
  { icon: CreditCard, label: "Debt", color: "text-orange-400" },
  { icon: Wallet, label: "Bills", color: "text-purple-400" },
];

interface VaultEntry {
  id: string;
  category: string;
  color: string;
  title: string;
  amount: number;
  type: "income" | "expense" | "savings" | "debt";
  note: string;
  time: string;
}

const SAMPLE: VaultEntry[] = [
  { id: "1", category: "Income", color: "text-green-400", title: "Monthly salary", amount: 5200, type: "income", note: "Direct deposit", time: "2 days ago" },
  { id: "2", category: "Expense", color: "text-red-400", title: "Rent payment", amount: -1800, type: "expense", note: "Monthly", time: "1 week ago" },
  { id: "3", category: "Savings", color: "text-blue-400", title: "Emergency fund", amount: 500, type: "savings", note: "Target: 10k", time: "3 days ago" },
  { id: "4", category: "Expense", color: "text-red-400", title: "Groceries", amount: -142.50, type: "expense", note: "Whole Foods", time: "Yesterday" },
  { id: "5", category: "Debt", color: "text-orange-400", title: "Credit card payment", amount: -300, type: "debt", note: "Min payment", time: "5 days ago" },
  { id: "6", category: "Savings", color: "text-blue-400", title: "Vacation fund", amount: 200, type: "savings", note: "Trip to Portugal", time: "1 week ago" },
];

export default function VaultPage() {
  const [entries, setEntries] = useState<VaultEntry[]>(SAMPLE);
  const [selectedCategory, setSelectedCategory] = useState<{ label: string; color: string } | null>(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const { isListening, speak, startListening } = useVoiceEngine();

  const addEntry = () => {
    if (!selectedCategory || !title.trim() || !amount) {
      speak("Please select a category, enter a title and amount");
      return;
    }
    const numAmount = parseFloat(amount);
    const isExpense = ["Expense","Debt","Bills"].includes(selectedCategory.label);
    const entry: VaultEntry = {
      id: crypto.randomUUID(),
      category: selectedCategory.label,
      color: selectedCategory.color,
      title: title.trim(),
      amount: isExpense ? -Math.abs(numAmount) : Math.abs(numAmount),
      type: selectedCategory.label === "Income" ? "income" : selectedCategory.label === "Savings" ? "savings" : selectedCategory.label === "Debt" ? "debt" : "expense",
      note,
      time: "Just now",
    };
    setEntries(prev => [entry, ...prev]);
    speak(selectedCategory.label + " logged: " + title.trim() + ", " + Math.abs(numAmount) + " dollars.");
    setSelectedCategory(null);
    setTitle("");
    setAmount("");
    setNote("");
  };

  const totalBalance = entries.reduce((s, e) => s + e.amount, 0);
  const totalIncome = entries.filter(e => e.type === "income").reduce((s, e) => s + e.amount, 0);
  const totalExpenses = Math.abs(entries.filter(e => e.type === "expense" || e.type === "debt").reduce((s, e) => s + e.amount, 0));

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-blue-400">Vault</h1><p className="text-xs text-muted-foreground">Finance & Assets</p></div>
          <div className="flex items-center gap-1 rounded-full bg-blue-400/10 px-3 py-1.5 text-xs text-blue-400 border border-blue-400/20">
            <Wallet className="h-3 w-3" />Net: ${totalBalance.toLocaleString()}
          </div>
        </div>
      </div>

      {isListening && (
        <div className="mx-4 mt-4 flex items-center gap-2 rounded-lg border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-400">
          <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />Listening for finance input...
        </div>
      )}

      {/* Balance Overview */}
      <div className="mx-4 mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-border bg-card p-3 text-center">
          <TrendingUp className="mx-auto h-4 w-4 text-green-400" />
          <p className="text-lg font-bold text-green-400">${totalIncome.toLocaleString()}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Income</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 text-center">
          <TrendingDown className="mx-auto h-4 w-4 text-red-400" />
          <p className="text-lg font-bold text-red-400">${totalExpenses.toLocaleString()}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Expenses</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 text-center">
          <PiggyBank className="mx-auto h-4 w-4 text-blue-400" />
          <p className="text-lg font-bold text-blue-400">${entries.filter(e => e.type === "savings").reduce((s, e) => s + e.amount, 0).toLocaleString()}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Savings</p>
        </div>
      </div>

      {/* Category Picker */}
      <div className="mx-4 mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Transaction Type</p>
        <div className="flex gap-2">
          {CATEGORIES.map(({ icon: Icon, label, color }) => (
            <button key={label} onClick={() => setSelectedCategory(selectedCategory?.label === label ? null : { label, color })}
              className={"flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs border transition " + (selectedCategory?.label === label ? "border-current bg-current/10 " + color : "border-border text-muted-foreground hover:border-blue-400/50")}>
              <Icon className="h-3 w-3" />{label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="mx-4 mt-4 space-y-3">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Transaction description"
          className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-400/50" />
        
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
          <input type="number" min="0.01" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00"
            className="w-full rounded-lg border border-border bg-secondary py-2.5 pl-7 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-400/50" />
        </div>

        <input value={note} onChange={e => setNote(e.target.value)} placeholder="Note (optional)"
          className="w-full rounded-lg border border-border bg-secondary px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-400/50" />

        <div className="flex gap-2">
          <button onClick={addEntry} className="flex-1 rounded-lg bg-blue-400 py-2.5 text-sm font-medium text-black hover:bg-blue-300">
            Log Transaction
          </button>
          <button onClick={startListening} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary hover:border-blue-400/50">
            <Mic className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="mx-4 mt-6 space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Transactions ({entries.length})</h2>
        {entries.map(entry => (
          <div key={entry.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={"rounded-full p-2 bg-current/10"}>
                  {entry.type === "income" ? <TrendingUp className={"h-4 w-4 " + entry.color} /> :
                   entry.type === "savings" ? <PiggyBank className={"h-4 w-4 " + entry.color} /> :
                   <TrendingDown className={"h-4 w-4 " + entry.color} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{entry.title}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={"text-[10px] " + entry.color}>{entry.category}</span>
                    {entry.note && <span className="text-[10px] text-muted-foreground line-clamp-1">{entry.note}</span>}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={"text-lg font-bold " + entry.color}>{entry.amount < 0 ? "-" : "+"}${Math.abs(entry.amount).toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">{entry.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MicButton onActivate={startListening} />
    </main>
  );
}
