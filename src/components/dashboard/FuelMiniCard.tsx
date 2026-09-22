import type { FuelType } from '../../types';
import { FUEL_CONFIG } from '../../data/mockData';

export function FuelMiniCard({
  fuel,
  lastPrice,
  minPrice,
  maxPrice,
  variationPercent,
  variationAmount,
}: {
  fuel: FuelType;
  lastPrice: number;
  minPrice: number;
  maxPrice: number;
  variationPercent: number;
  variationAmount: number;
}) {
  const cfg = FUEL_CONFIG[fuel];
  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-chart-border)',
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: '1px solid var(--color-border-medium)' }}
      >
        <span
          className="inline-block h-3 w-3 rounded-full"
          style={{ backgroundColor: cfg.color }}
        />
        <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          {cfg.label}
        </span>
        <span
          className="ml-auto inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
          style={{ backgroundColor: 'var(--color-red-badge)', color: '#111118' }}
        >
          +{variationPercent.toFixed(2)}%
        </span>
      </div>

      <div className="flex flex-col gap-3 px-4 py-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            último preço
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              R$ {lastPrice.toFixed(2)}
            </span>
            <div className="flex items-center gap-0.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-red-badge)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 9 12 15 6 9" />
              </svg>
              <span className="text-sm font-medium" style={{ color: 'var(--color-red-badge)' }}>
                +R$ {variationAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              Mínimo
            </span>
            <span className="text-base font-semibold" style={{ color: 'var(--color-accent)' }}>
              R$ {minPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              Máximo
            </span>
            <span className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              R$ {maxPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}