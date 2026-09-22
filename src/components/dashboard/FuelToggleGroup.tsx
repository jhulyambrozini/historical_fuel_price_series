import type { FuelType } from '../../types';
import { FuelPill } from '../ui/index';

export function FuelToggleGroup({
  selectedFuels,
  onToggle,
}: {
  selectedFuels: FuelType[];
  onToggle: (fuel: FuelType) => void;
}) {
  const allFuels: FuelType[] = [
    'gasolina_comum',
    'gasolina_aditivada',
    'etanol',
    'diesel_s10',
    'diesel_comum',
  ];

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {allFuels.map((fuel) => (
        <FuelPill
          key={fuel}
          fuel={fuel}
          active={selectedFuels.includes(fuel)}
          onClick={() => onToggle(fuel)}
        />
      ))}
    </div>
  );
}