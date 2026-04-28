import React, { useEffect, useRef, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface SimpleMenuOption {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'destructive';
}

interface Props {
  trigger?: React.ReactNode;
  options: SimpleMenuOption[];
  align?: 'left' | 'right';
  className?: string;
  triggerClassName?: string;
}

export function SimpleMenu({
  trigger,
  options,
  align = 'right',
  className = '',
  triggerClassName = '',
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className={`relative inline-block ${className}`} ref={ref}>
      <div onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }} className="cursor-pointer">
        {trigger || (
          <Button variant="ghost" className={`h-8 w-8 p-0 text-muted-foreground hover:text-foreground ${triggerClassName}`}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )}
      </div>
      {open && (
        <div 
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-48 bg-card border border-border/40 rounded-xl shadow-soft z-[100] p-1.5 animate-in fade-in zoom-in-95 duration-200`}
        >
          {options.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                opt.onClick();
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                opt.variant === 'destructive'
                  ? 'text-destructive hover:bg-destructive/10'
                  : 'hover:bg-secondary text-foreground font-medium'
              }`}
            >
              {opt.icon && <span className="shrink-0">{opt.icon}</span>}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
