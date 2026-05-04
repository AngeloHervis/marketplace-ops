import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export function Loading({ size = 'md', text }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <Loader2 className={`${sizeStyles[size]} animate-spin text-primary`} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}

export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-muted rounded-md ${className}`}
    />
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <LoadingSkeleton className="h-10 w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <LoadingSkeleton key={i} className="h-14 w-full" />
      ))}
    </div>
  );
}
