import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (rating: number) => void;
  readonly?: boolean;
}

const sizeStyles = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  onChange,
  readonly = false,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }).map((_, index) => {
        const filled = index < rating;
        return (
          <button
            key={index}
            type="button"
            onClick={() => !readonly && onChange?.(index + 1)}
            disabled={readonly}
            className={`${
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            } transition-transform`}
          >
            <Star
              className={`${sizeStyles[size]} ${
                filled
                  ? 'fill-warning text-warning'
                  : 'fill-transparent text-muted'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
