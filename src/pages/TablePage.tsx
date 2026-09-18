import { useState } from 'react';
import '../App.css';
import { CsvTable } from '../components/CsvTable';
import { Tabs } from '../components/Tabs';
import { useCsv } from '../hooks/useCsv';

const TABS = [
	{
		id: 'consu-1',
		label: 'I Menor e maior preço de cada tipo de combustível por posto',
		file: '/data/consu-1.csv',
	},
	{
		id: 'consu-2',
		label: 'II Quantidade de amostras e preço médio por posto e combustível',
		file: '/data/consu-2.csv',
	},
	{
		id: 'consu-3',
		label: 'III Preço mais recente por posto e combustível',
		file: '/data/consu-3.csv',
	},
	{
		id: 'consu-4',
		label: 'IV Evolução do preço de um combustível em um posto específico',
		file: '/data/consu-4.csv',
	},
];

export function TablesPage() {
	const [active, setActive] = useState(TABS[0].id);
	const current = TABS.find((t) => t.id === active)!;
	const { data, headers, loading, error } = useCsv(current.file);

	return (
		<div className="app">
			<header className="header">
				<h1>⛽ Postos de Combustível — São Mateus/ES</h1>
				<p className="subtitle">
					Visualização das tabelas de coletas, médias e variações de preços.
				</p>
			</header>

			<Tabs
				tabs={TABS}
				active={active}
				onChange={setActive}
			/>

			<section className="content">
				<div className="meta">
					<h2>{current.label}</h2>
					{!loading && !error && (
						<span className="badge">{data.length} registros</span>
					)}
				</div>

				{loading && <p className="loading">Carregando…</p>}
				{error && <p className="error">Erro: {error}</p>}
				{!loading && !error && (
					<CsvTable
						headers={headers}
						rows={data}
					/>
				)}
			</section>
		</div>
	);
}
