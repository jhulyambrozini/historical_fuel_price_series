import { DASHBOARD_STATS } from '../../data/mockData';
import { StatCard } from '../ui/index';

export function SummaryCards() {
  const stats = [
    { label: 'Postos', value: DASHBOARD_STATS.totalStations },
    { label: 'Total de registros', value: DASHBOARD_STATS.totalRecords },
    { label: 'Combustíveis', value: DASHBOARD_STATS.totalFuelTypes },
  ];

  return (
    <div className="flex items-center gap-4">
      {stats.map((s) => (
        <StatCard key={s.label} label={s.label} value={s.value} />
      ))}
    </div>
  );
}