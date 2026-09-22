import { useMemo, useState } from 'react';
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
import {
	FUEL_CONFIG,
	FUEL_TYPES,
	GAS_STATIONS,
	MONTHLY_DATES,
	STATION_COLORS,
	STATION_LABELS,
} from '../../data/mockData';
import type { FuelType } from '../../types';
import { StationToggleGroup } from './StationToggleGroup';

export function EvolucaoPrecoPorPostoView() {
	const [selectedFuel, setSelectedFuel] = useState<FuelType>('etanol');
	const [selectedStations, setSelectedStations] = useState<string[]>(
		GAS_STATIONS.slice(0, 6).map((s) => s.id),
	);

	const handleStationToggle = (id: string) => {
		setSelectedStations((prev) =>
			prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
		);
	};

	const chartData = useMemo(() => {
		return MONTHLY_DATES.map((date) => {
			const point: Record<string, string | number | null> = { date };
			for (const sid of selectedStations) {
				const station = GAS_STATIONS.find((s) => s.id === sid);
				const entry = station?.prices[selectedFuel]?.history.find(
					(h) => h.date === date,
				);
				point[sid] = entry?.price ?? null;
			}
			return point;
		});
	}, [selectedFuel, selectedStations]);

	return (
		<div className="flex flex-col gap-4">
			<div
				className="flex items-center gap-6 rounded-xl p-4"
				style={{ backgroundColor: 'var(--color-bg-card)' }}>
				<div className="flex flex-col gap-0.5">
					<span
						className="text-xs tracking-wide"
						style={{ color: 'var(--color-text-muted)' }}>
						Postos
					</span>
					<span
						className="text-xl font-semibold"
						style={{ color: 'var(--color-text-primary)' }}>
						6
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
						Pontos
					</span>
					<span
						className="text-xl font-semibold"
						style={{ color: 'var(--color-text-primary)' }}>
						6
					</span>
				</div>
			</div>

			<div
				className="flex flex-wrap items-end gap-6 rounded-xl p-4"
				style={{ backgroundColor: 'var(--color-bg-card)' }}>
				<div className="flex flex-col gap-1.5">
					<label
						className="text-sm font-medium"
						style={{ color: 'var(--color-text-primary)' }}>
						Combustível
					</label>
					<div
						className="flex items-center gap-2 rounded-lg px-3 py-2.5"
						style={{ backgroundColor: 'var(--color-bg-input)' }}>
						<select
							value={selectedFuel}
							onChange={(e) => setSelectedFuel(e.target.value as FuelType)}
							className="border-none bg-transparent text-base outline-none"
							style={{ color: 'var(--color-text-primary)' }}>
							{FUEL_TYPES.map((f) => (
								<option
									key={f}
									value={f}
									style={{ backgroundColor: '#161621', color: '#fff' }}>
									{FUEL_CONFIG[f].label}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="flex flex-col gap-1.5">
					<span
						className="text-xs tracking-wide"
						style={{ color: 'var(--color-text-muted)' }}>
						Exibir postos
					</span>
					<StationToggleGroup
						selectedStations={selectedStations}
						onToggle={handleStationToggle}
					/>
				</div>
			</div>

			{selectedStations.length === 0 ? (
				<div
					className="flex items-center justify-center rounded-xl p-8"
					style={{
						backgroundColor: 'var(--color-bg-card)',
						border: '1px solid var(--color-chart-border)',
						minHeight: 300,
					}}>
					<span style={{ color: 'var(--color-text-muted)' }}>
						Selecione ao menos um posto
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
						{FUEL_CONFIG[selectedFuel].label} — preço por posto (R$/litro)
					</h3>
					<span
						className="block text-xs"
						style={{ color: 'var(--color-text-muted)', marginBottom: 12 }}>
						Eixo X: mês · Eixo Y: preço
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
										{STATION_LABELS[value] ?? value}
									</span>
								)}
							/>
							{selectedStations.map((sid) => {
								return (
									<Line
										key={sid}
										type="monotone"
										dataKey={sid}
										name={sid}
										stroke={STATION_COLORS[sid] ?? '#666'}
										strokeWidth={2}
										dot={{ r: 3, fill: STATION_COLORS[sid] }}
										activeDot={{ r: 5 }}
										connectNulls={false}
									/>
								);
							})}
						</LineChart>
					</ResponsiveContainer>
				</div>
			)}
		</div>
	);
}
