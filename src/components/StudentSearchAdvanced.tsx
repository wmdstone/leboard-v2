import React from 'react';
import { X } from 'lucide-react';
import {
  StudentSearchFilter,
  type StudentSearchFilterValue,
} from './StudentSearchFilter';
import { StudentSortDropdown, type SortKey } from './StudentSortDropdown';

interface Props {
  value: StudentSearchFilterValue;
  onChange: (next: StudentSearchFilterValue) => void;
  sortKey: SortKey;
  onSortChange: (next: SortKey) => void;
  availableTags: string[];
  studentTagSource?: string[][];
  placeholder?: string;
  variant?: 'light' | 'dark';
  className?: string;
  /** Whether the advanced section starts open. Defaults to false. */
  defaultOpen?: boolean;
}

/**
 * Composite control:
 *  - Always-visible BASIC search input.
 *  - Collapsible ADVANCED section that reveals Tag filter + Sort dropdown.
 * The "Advanced" toggle shows a badge with the number of active advanced
 * options (selected tags + non-default sort) so users see at a glance whether
 * any hidden filter is currently affecting results.
 */
export function StudentSearchAdvanced({
  value,
  onChange,
  sortKey,
  onSortChange,
  availableTags,
  studentTagSource,
  placeholder = 'Search by name...',
  variant = 'light',
  className = '',
}: Props) {
  const isDark = variant === 'dark';

  return (
    <div className={`flex flex-col gap-2 min-w-0 ${className}`}>
      {/* Search Input */}
      <div className="w-full">
        <StudentSearchFilter
          mode="search"
          value={value}
          onChange={onChange}
          availableTags={availableTags}
          placeholder={placeholder}
          variant={variant}
        />
      </div>

      {/* Tags and Sort Buttons - Always below and left-aligned */}
      <div className="flex items-center gap-2 px-1">
        <StudentSearchFilter
          mode="tags"
          value={value}
          onChange={onChange}
          availableTags={availableTags}
          studentTagSource={studentTagSource}
          variant={variant}
        />
        <StudentSortDropdown
          value={sortKey}
          onChange={onSortChange}
          variant={variant}
        />
      </div>

      {/* Selected tags display */}
      {value.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-1">
          {value.tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                isDark
                  ? 'bg-base-50/15 text-base-50 border border-base-50/20 shadow-sm'
                  : 'bg-primary-50 text-primary-700 border border-primary-100 shadow-sm'
              }`}
            >
              {tag}
              <button
                type="button"
                onClick={() => onChange({ ...value, tags: value.tags.filter(t => t !== tag) })}
                className="hover:opacity-70"
                aria-label={`Remove ${tag}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={() => onChange({ ...value, tags: [] })}
            className="text-[10px] font-bold text-text-light hover:text-primary-600 px-1 ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}