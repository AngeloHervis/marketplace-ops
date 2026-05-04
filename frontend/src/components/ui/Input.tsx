import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  id,
  className = '',
  ...props
}: InputProps) {
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
      <input
        id={id}
        className={`w-full px-3 py-2 bg-input border border-border rounded-md text-foreground
          placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20
          disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}
          ${error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
        {...props}
      />
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}
