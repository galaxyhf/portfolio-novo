import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

export const StatCard = ({ title, value, icon }: StatCardProps) => (
  <Card>
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-text-secondary">{title}</p>
        <p className="mt-2 font-syne text-3xl font-bold text-text-primary">{value}</p>
      </div>
      <div className="rounded-lg border border-accent/30 bg-accent/10 p-3 text-accent-light">
        {icon}
      </div>
    </div>
  </Card>
);
