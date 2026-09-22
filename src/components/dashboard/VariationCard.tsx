import { Badge, FuelDot } from '../ui/index';
import { FUEL_CONFIG } from '../../data/mockData';
import type { GasStation } from '../../types';

export function VariationCard({ station }: { station: GasStation }) {
  const prices = Object.entries(station.prices);

  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-chart-border)',
      }}
    >
      <div className="flex flex-col gap-2 px-5 pt-5 pb-4" style={{ borderBottom: '1px solid var(--color-border-medium)' }}>
        <h3 className="m-0 text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          {station.name}
        </h3>
        <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-10a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{station.neighborhood} · {station.city}</span>
        </div>
      </div>

      <div className="flex flex-col">
        {prices.map(([fuel, data], i) => {
          const cfg = FUEL_CONFIG[fuel as keyof typeof FUEL_CONFIG];
          if (!cfg || !data) return null;
          return (
            <div
              key={fuel}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3 sm:flex-nowrap"
              style={{
                borderBottom: i < prices.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                backgroundColor: i % 2 === 1 ? 'var(--color-bg-hover)' : 'transparent',
              }}
            >
              <div className="flex w-full items-center gap-2 sm:w-auto sm:min-w-[140px]">
                <FuelDot fuel={fuel as keyof typeof FUEL_CONFIG} />
                <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                  {cfg.label}
                </span>
              </div>
              <div className="flex flex-col gap-0.5" style={{ minWidth: 70 }}>
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  último
                </span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  R$ {data.lastPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col gap-0.5" style={{ minWidth: 70 }}>
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  mín
                </span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
                  R$ {data.minPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col gap-0.5" style={{ minWidth: 70 }}>
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  máx
                </span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  R$ {data.maxPrice.toFixed(2)}
                </span>
              </div>
              <Badge text={`+${data.variationPercent.toFixed(2)}%`} variant="red" />
            </div>
          );
        })}
      </div>
    </div>
  );
}