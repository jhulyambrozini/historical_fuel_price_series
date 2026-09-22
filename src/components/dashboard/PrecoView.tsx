import {
	DASHBOARD_STATS_MINNOR_MAIORE_PRECO,
	GAS_STATIONS,
} from '../../data/mockData';
import { StatCard } from '../ui/index';
import { MinMaxCard } from './MinMaxCard';

export function PrecoView() {
	return (
		<div className="flex flex-col gap-4">
			<div
				className="flex flex-wrap items-center gap-6 rounded-xl p-4"
				style={{ backgroundColor: 'var(--color-bg-card)' }}>
				<StatCard
					label="Postos"
					value={DASHBOARD_STATS_MINNOR_MAIORE_PRECO.totalStations}
				/>
				<div
					className="h-12 w-px"
					style={{ backgroundColor: 'var(--color-border-light)' }}
				/>
				<StatCard
					label="Total de registros"
					value={DASHBOARD_STATS_MINNOR_MAIORE_PRECO.totalRecords}
				/>
				<div
					className="h-12 w-px"
					style={{ backgroundColor: 'var(--color-border-light)' }}
				/>
				<StatCard
					label="Menor preço"
					value={DASHBOARD_STATS_MINNOR_MAIORE_PRECO.minorPrice}
				/>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{GAS_STATIONS.map((station) => (
					<MinMaxCard
						key={station.id}
						station={station}
					/>
				))}
			</div>
		</div>
	);
}
