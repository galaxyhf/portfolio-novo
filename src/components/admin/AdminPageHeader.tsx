import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export const AdminPageHeader = ({ title, description, action }: AdminPageHeaderProps) => (
  <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
    <div>
      <h1 className="font-syne text-3xl font-bold text-text-primary">{title}</h1>
      <p className="mt-2 text-sm text-text-secondary">{description}</p>
    </div>
    {action}
  </div>
);
