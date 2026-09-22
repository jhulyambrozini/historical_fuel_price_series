import { GAS_STATIONS } from '../../data/mockData';
import { VariationCard } from './VariationCard';

export function VariationCardsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {GAS_STATIONS.map((station) => (
        <VariationCard key={station.id} station={station} />
      ))}
    </div>
  );
}