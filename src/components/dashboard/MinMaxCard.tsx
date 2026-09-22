import type { GasStation } from '../../types';
import { FUEL_CONFIG } from '../../data/mockData';

export function MinMaxCard({ station }: { station: GasStation }) {
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
        <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>Última coleta: {station.lastCollection}</span>
        </div>
      </div>

      <div className="flex flex-col">
        {prices.map(([fuel, data], i) => {
          const cfg = FUEL_CONFIG[fuel as keyof typeof FUEL_CONFIG];
          if (!cfg || !data) return null;
          const spread = data.maxPrice - data.minPrice;
          return (
            <div
              key={fuel}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 px-5 py-3 sm:flex-nowrap"
              style={{
                borderBottom: i < prices.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                backgroundColor: i % 2 === 1 ? 'var(--color-bg-hover)' : 'transparent',
              }}
            >
              <div className="flex w-full items-center gap-2 sm:w-auto sm:min-w-[130px]">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: cfg.dotColor }}
                />
                <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                  {cfg.label}
                </span>
              </div>

              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                último
              </span>
              <span className="text-sm font-semibold" style={{ minWidth: 56, color: 'var(--color-text-primary)' }}>
                R$ {data.lastPrice.toFixed(2)}
              </span>

              <div className="flex items-center gap-1 text-xs" style={{ minWidth: 86 }}>
                <span style={{ color: 'var(--color-text-muted)' }}>min</span>
                <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>
                  R$ {data.minPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs" style={{ minWidth: 86 }}>
                <span style={{ color: 'var(--color-text-muted)' }}>máx</span>
                <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  R$ {data.maxPrice.toFixed(2)}
                </span>
              </div>

              <span
                className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
                style={{ backgroundColor: 'var(--color-blue-badge)', color: '#111118' }}
              >
                +R$ {spread.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}