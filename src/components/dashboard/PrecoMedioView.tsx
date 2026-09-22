import {
	DASHBOARD_STATS_MEDIA_PRICES,
	FUEL_CONFIG,
	GAS_STATIONS,
} from '../../data/mockData';
import type { FuelType } from '../../types';
import { StatCard } from '../ui';
import { FuelMiniCard } from './FuelMiniCard';
import { FuelToggleGroup } from './FuelToggleGroup';

export function PrecoMedioView({
	selectedFuels,
	onFuelToggle,
}: {
	selectedFuels: FuelType[];
	onFuelToggle: (fuel: FuelType) => void;
}) {
	const fuelSummary = (Object.keys(FUEL_CONFIG) as FuelType[])
		.map((fuel) => {
			const prices = GAS_STATIONS.map((s) => s.prices[fuel]).filter(
				(p): p is NonNullable<typeof p> => p !== undefined,
			);
			if (prices.length === 0) return null;
			return {
				fuel,
				lastPrice: prices.reduce((a, b) => a + b.lastPrice, 0) / prices.length,
				minPrice: Math.min(...prices.map((p) => p.minPrice)),
				maxPrice: Math.max(...prices.map((p) => p.maxPrice)),
				variationPercent:
					prices.reduce((a, b) => a + b.variationPercent, 0) / prices.length,
				variationAmount:
					prices.reduce((a, b) => a + b.variationAmount, 0) / prices.length,
			};
		})
		.filter(
			(f): f is NonNullable<typeof f> =>
				f !== null && selectedFuels.includes(f.fuel),
		);

	return (
		<div className="flex flex-col gap-4">
			<div
				className="flex flex-wrap items-center gap-6 rounded-xl p-4"
				style={{ backgroundColor: 'var(--color-bg-card)' }}>
				<StatCard
					label="Postos"
					value={DASHBOARD_STATS_MEDIA_PRICES.totalStations}
				/>
				<div
					className="h-12 w-px"
					style={{ backgroundColor: 'var(--color-border-light)' }}
				/>
				<StatCard
					label="Total de registros"
					value={DASHBOARD_STATS_MEDIA_PRICES.totalRecords}
				/>
				<div
					className="h-12 w-px"
					style={{ backgroundColor: 'var(--color-border-light)' }}
				/>
				<StatCard
					label="Combustíveis"
					value={DASHBOARD_STATS_MEDIA_PRICES.totalFuelTypes}
				/>
			</div>

			<div
				className="flex flex-col gap-2 rounded-xl p-4"
				style={{ backgroundColor: 'var(--color-bg-card)' }}>
				<span
					className="text-xs tracking-wide"
					style={{ color: 'var(--color-text-muted)' }}>
					Exibir combustíveis
				</span>
				<FuelToggleGroup
					selectedFuels={selectedFuels}
					onToggle={onFuelToggle}
				/>
			</div>

			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
				{fuelSummary.map((f) => (
					<FuelMiniCard
						key={f.fuel}
						fuel={f.fuel}
						lastPrice={+f.lastPrice.toFixed(2)}
						minPrice={f.minPrice}
						maxPrice={f.maxPrice}
						variationPercent={f.variationPercent}
						variationAmount={+f.variationAmount.toFixed(2)}
					/>
				))}
			</div>
		</div>
	);
}
