import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  id,
  options,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full px-3 py-2 bg-input border border-border rounded-md text-foreground
          focus:border-primary focus:ring-2 focus:ring-primary/20
          disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}
          ${error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}
