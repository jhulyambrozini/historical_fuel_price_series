import { GAS_STATIONS } from '../../data/mockData';
import { StationCard } from './StationCard';

export function StationCardsGrid() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {GAS_STATIONS.map((station) => (
        <StationCard key={station.id} station={station} />
      ))}
    </div>
  );
}