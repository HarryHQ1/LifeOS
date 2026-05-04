"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Brain, Heart, Home, CreditCard, Users, TrendingUp, Search, Briefcase } from "lucide-react";

const APPS = [
  { name: "Momentum", slug: "momentum", icon: Zap, color: "text-yellow-400" },
  { name: "Serenity", slug: "serenity", icon: Brain, color: "text-purple-400" },
  { name: "Vitality", slug: "vitality", icon: Heart, color: "text-red-400" },
  { name: "Nest", slug: "nest", icon: Home, color: "text-green-400" },
  { name: "Vault", slug: "vault", icon: CreditCard, color: "text-blue-400" },
  { name: "Bond", slug: "bond", icon: Users, color: "text-pink-400" },
  { name: "Elevate", slug: "elevate", icon: TrendingUp, color: "text-orange-400" },
  { name: "Oracle", slug: "oracle", icon: Search, color: "text-cyan-400" },
  { name: "Ascend", slug: "ascend", icon: Briefcase, color: "text-indigo-400" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-2 py-2 backdrop-blur">
      <div className="flex items-center justify-around">
        {APPS.map(({ name, slug, icon: Icon, color }) => {
          const isActive = pathname?.startsWith(`/${slug}`);
          return (
            <Link key={slug} href={`/${slug}`}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs transition-colors ${isActive ? `${color} font-semibold` : "text-muted-foreground"}`}>
              <Icon className="h-5 w-5" />
              <span className="text-[10px]">{name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
