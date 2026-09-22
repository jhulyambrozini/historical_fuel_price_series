import type { FuelType } from '../../types';
import { FUEL_CONFIG } from '../../data/mockData';

export function FuelDot({ fuel, size = 8 }: { fuel: FuelType; size?: number }) {
  const cfg = FUEL_CONFIG[fuel];
  return (
    <span
      className="inline-block rounded-full"
      style={{ width: size, height: size, backgroundColor: cfg.dotColor }}
    />
  );
}

export function FuelBadge({ fuel }: { fuel: FuelType }) {
  const cfg = FUEL_CONFIG[fuel];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium text-white"
      style={{ backgroundColor: cfg.color }}
    >
      <FuelDot fuel={fuel} />
      {cfg.label}
    </span>
  );
}

export function FuelPill({
  fuel,
  active,
  onClick,
}: {
  fuel: FuelType;
  active: boolean;
  onClick: () => void;
}) {
  const cfg = FUEL_CONFIG[fuel];
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium text-white transition-opacity hover:opacity-90"
      style={{
        backgroundColor: active ? cfg.color : 'transparent',
        borderColor: cfg.color,
        opacity: active ? 1 : 0.7,
      }}
    >
      <FuelDot fuel={fuel} />
      {cfg.label}
    </button>
  );
}

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </span>
      <span className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
        {value}
      </span>
    </div>
  );
}

export function Badge({ text, variant = 'red' }: { text: string; variant?: 'red' | 'blue' }) {
  const bgColor = variant === 'red' ? 'var(--color-red-badge)' : 'var(--color-blue-badge)';
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
      style={{ backgroundColor: bgColor, color: '#111118' }}
    >
      {text}
    </span>
  );
}