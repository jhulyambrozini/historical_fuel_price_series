import { useMemo } from 'react';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { FUEL_CONFIG, GAS_STATIONS, MONTHLY_DATES } from '../../data/mockData';
import type { FuelType } from '../../types';
import { FuelToggleGroup } from './FuelToggleGroup';

export function EvolucaoPrecoMedioView({
	selectedFuels,
	onFuelToggle,
}: {
	selectedFuels: FuelType[];
	onFuelToggle: (fuel: FuelType) => void;
}) {
	const chartData = useMemo(() => {
		return MONTHLY_DATES.map((date) => {
			const point: Record<string, string | number | null> = { date };
			for (const fuel of selectedFuels) {
				const prices = GAS_STATIONS.map(
					(s) => s.prices[fuel]?.history.find((h) => h.date === date)?.price,
				).filter((p): p is number => p !== undefined);
				point[fuel] =
					prices.length > 0
						? +(prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)
						: null;
			}
			return point;
		});
	}, [selectedFuels]);

	return (
		<div className="flex flex-col gap-4">
			<div
				className="flex flex-wrap items-center gap-6 rounded-xl p-4"
				style={{ backgroundColor: 'var(--color-bg-card)' }}>
				<div className="flex flex-col gap-0.5">
					<span
						className="text-xs tracking-wide"
						style={{ color: 'var(--color-text-muted)' }}>
						Combustíveis
					</span>
					<span
						className="text-xl font-semibold"
						style={{ color: 'var(--color-text-primary)' }}>
						5
					</span>
				</div>
				<div
					className="h-12 w-px"
					style={{ backgroundColor: 'var(--color-border-light)' }}
				/>
				<div className="flex flex-col gap-0.5">
					<span
						className="text-xs tracking-wide"
						style={{ color: 'var(--color-text-muted)' }}>
						Período
					</span>
					<span
						className="text-xl font-semibold"
						style={{ color: 'var(--color-text-primary)' }}>
						6 meses
					</span>
				</div>
				<div
					className="h-12 w-px"
					style={{ backgroundColor: 'var(--color-border-light)' }}
				/>
				<div className="flex flex-col gap-0.5">
					<span
						className="text-xs tracking-wide"
						style={{ color: 'var(--color-text-muted)' }}>
						Pontos de dados
					</span>
					<span
						className="text-xl font-semibold"
						style={{ color: 'var(--color-text-primary)' }}>
						6
					</span>
				</div>
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

			{selectedFuels.length === 0 ? (
				<div
					className="flex items-center justify-center rounded-xl p-8"
					style={{
						backgroundColor: 'var(--color-bg-card)',
						border: '1px solid var(--color-chart-border)',
						minHeight: 300,
					}}>
					<span style={{ color: 'var(--color-text-muted)' }}>
						Selecione ao menos um combustível
					</span>
				</div>
			) : (
				<div
					className="rounded-xl p-5"
					style={{
						backgroundColor: 'var(--color-bg-card)',
						border: '1px solid var(--color-chart-border)',
					}}>
					<h3
						className="m-0 mb-0.5 text-base font-semibold"
						style={{ color: 'var(--color-text-primary)' }}>
						Preço médio (R$/litro)
					</h3>
					<span
						className="block text-xs"
						style={{ color: 'var(--color-text-muted)', marginBottom: 12 }}>
						Eixo X: mês · Eixo Y: preço médio
					</span>
					<ResponsiveContainer
						width="100%"
						height={350}>
						<LineChart
							data={chartData}
							margin={{ top: 8, right: 16, left: -16, bottom: 8 }}>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="var(--color-border-light)"
							/>
							<XAxis
								dataKey="date"
								tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
								axisLine={false}
								tickLine={false}
							/>
							<YAxis
								tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
								axisLine={false}
								tickLine={false}
								tickFormatter={(v: number) => `R$${v.toFixed(2)}`}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: '#1a1a2e',
									border: '1px solid #294b9c',
									borderRadius: 8,
									color: '#fff',
									fontSize: 12,
								}}
							/>
							<Legend
								formatter={(value: string) => (
									<span
										style={{
											color: 'var(--color-text-primary)',
											fontSize: 12,
										}}>
										{FUEL_CONFIG[value as FuelType]?.label ?? value}
									</span>
								)}
							/>
							{selectedFuels.map((fuel) => (
								<Line
									key={fuel}
									type="monotone"
									dataKey={fuel}
									stroke={FUEL_CONFIG[fuel]?.color ?? '#666'}
									strokeWidth={2}
									dot={{ r: 3, fill: FUEL_CONFIG[fuel]?.color }}
									activeDot={{ r: 5 }}
									connectNulls={false}
								/>
							))}
						</LineChart>
					</ResponsiveContainer>
				</div>
			)}
		</div>
	);
}
