import {
	DASHBOARD_STATS_PRICE_HISTORY,
	GAS_STATIONS,
} from '../../data/mockData';
import { StatCard } from '../ui';
import { VariationCard } from './VariationCard';

export function VariationCardsGrid() {
	return (
		<>
			<div
				className="flex flex-wrap items-center gap-6 rounded-xl p-4"
				style={{ backgroundColor: 'var(--color-bg-card)' }}>
				<StatCard
					label="Postos"
					value={DASHBOARD_STATS_PRICE_HISTORY.totalStations}
				/>
				<div
					className="h-12 w-px"
					style={{ backgroundColor: 'var(--color-border-light)' }}
				/>
				<StatCard
					label="Total de registros"
					value={DASHBOARD_STATS_PRICE_HISTORY.totalRecords}
				/>
				<div
					className="h-12 w-px"
					style={{ backgroundColor: 'var(--color-border-light)' }}
				/>
				<StatCard
					label="Combustíveis"
					value={DASHBOARD_STATS_PRICE_HISTORY.totalFuelTypes}
				/>
			</div>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				{GAS_STATIONS.map((station) => (
					<VariationCard
						key={station.id}
						station={station}
					/>
				))}
			</div>
		</>
	);
}
