import { GAS_STATIONS } from '../../data/mockData';
import { StationCard } from './StationCard';

export function StationCardsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {GAS_STATIONS.map((station) => (
        <StationCard key={station.id} station={station} />
      ))}
    </div>
  );
}