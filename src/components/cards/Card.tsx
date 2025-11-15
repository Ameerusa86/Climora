import clsx from "clsx";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  className?: string;
  childrenClassName?: string;
};

export default function Card({
  children,
  title,
  className,
  childrenClassName,
}: Props) {
  return (
    <div
      className={clsx(
        "glass-card p-5 md:p-6 flex flex-col gap-4 2xl:h-full relative overflow-hidden group",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight flex items-center gap-2">
          <span className="inline-block h-1.5 w-5 rounded-full pill-gradient" />
          {title}
        </h2>
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-400/90 hidden sm:inline">
          Live Panel
        </span>
      </div>
      <div className="glass-divider" />
      <div
        className={clsx(
          childrenClassName,
          "animate-[fade-in_0.7s_ease-out_forwards] 2xl:flex-1"
        )}
      >
        {children}
      </div>
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-36 w-36 rounded-full pill-gradient opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500" />
    </div>
  );
}
