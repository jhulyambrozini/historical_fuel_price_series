import { DASHBOARD_STATS, GAS_STATIONS } from '../../data/mockData';
import { StatCard } from '../ui/index';
import { SearchFilter } from './SearchFilter';
import { MinMaxCard } from './MinMaxCard';

export function PrecoView() {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex items-center gap-6 rounded-xl p-4"
        style={{ backgroundColor: 'var(--color-bg-card)' }}
      >
        <StatCard label="Postos" value={DASHBOARD_STATS.totalStations} />
        <div className="h-12 w-px" style={{ backgroundColor: 'var(--color-border-light)' }} />
        <StatCard label="Total de registros" value={DASHBOARD_STATS.totalRecords} />
        <div className="h-12 w-px" style={{ backgroundColor: 'var(--color-border-light)' }} />
        <StatCard label="Combustíveis" value={DASHBOARD_STATS.totalFuelTypes} />
      </div>

      <SearchFilter />

      <div className="grid grid-cols-2 gap-4">
        {GAS_STATIONS.map((station) => (
          <MinMaxCard key={station.id} station={station} />
        ))}
      </div>
    </div>
  );
}