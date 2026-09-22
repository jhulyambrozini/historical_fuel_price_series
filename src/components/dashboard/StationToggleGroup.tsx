import { GAS_STATIONS, STATION_LABELS, STATION_COLORS } from '../../data/mockData';

export function StationToggleGroup({
  selectedStations,
  onToggle,
}: {
  selectedStations: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {GAS_STATIONS.map((s) => {
        const active = selectedStations.includes(s.id);
        const color = STATION_COLORS[s.id] ?? '#666';
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onToggle(s.id)}
            className="inline-flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{
              backgroundColor: active ? color : 'transparent',
              borderColor: color,
              opacity: active ? 1 : 0.7,
            }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            {STATION_LABELS[s.id] ?? s.name}
          </button>
        );
      })}
    </div>
  );
}