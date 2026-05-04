import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

const variantStyles = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border',
  destructive:
    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  ghost:
    'bg-transparent text-foreground hover:bg-muted',
  outline:
    'bg-transparent border border-border text-foreground hover:bg-muted',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors
        ${variantStyles[variant]} ${sizeStyles[size]} ${className}
        disabled:opacity-50 disabled:cursor-not-allowed`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
