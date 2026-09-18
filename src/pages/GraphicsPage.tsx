// src/pages/GraficosPage.tsx
import { useMemo, useState } from 'react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { useCsv } from '../hooks/useCsv';
import { parseNumber } from '../utils/format';

type Row = {
	posto: string;
	bairro: string;
	tipo: string;
	preco: number;
	data: string; // ISO ou dd/mm/yyyy
};

// Paleta para diferenciar combustíveis e postos
const CORES_COMBUSTIVEL: Record<string, string> = {
	'Gasolina Comum': '#2563eb',
	'Gasolina Aditivada': '#7c3aed',
	Etanol: '#16a34a',
	'Diesel S-10': '#dc2626',
	'Diesel Comum': '#ea580c',
};

const CORES_POSTO = [
	'#2563eb',
	'#16a34a',
	'#dc2626',
	'#7c3aed',
	'#ea580c',
	'#0891b2',
	'#be185d',
];

/** Normaliza datas para timestamp (aceita ISO e dd/mm/yyyy) */
function toTimestamp(data: string): number {
	const s = data.trim();
	// dd/mm/yyyy hh:mm
	const br = s.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
	if (br) {
		const [, d, m, y] = br;
		return new Date(Number(y), Number(m) - 1, Number(d)).getTime();
	}
	// yyyy-mm-dd
	const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
	if (iso) {
		const [, y, m, d] = iso;
		return new Date(Number(y), Number(m) - 1, Number(d)).getTime();
	}
	return new Date(s).getTime();
}

/** Formata timestamp em rótulo curto (MM/YYYY) */
function labelMes(ts: number): string {
	const d = new Date(ts);
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const y = d.getFullYear();
	return `${m}/${y}`;
}

export function GraficosPage() {
	// Carrega as 3 fontes
	const csv1 = useCsv('/data/consu-1.csv');
	const csv2 = useCsv('/data/consu-2.csv');
	const csv3 = useCsv('/data/consu-3.csv');

	const loading = csv1.loading || csv2.loading || csv3.loading;
	const error = csv1.error || csv2.error || csv3.error;

	// ---- Constrói base unificada a partir de consu-1, consu-2 e consu-3 ----
	const base = useMemo<Row[]>(() => {
		const rows: Row[] = [];

		// consu-1: Nome do Posto, Bairro, Tipo de Combustível, Valor, Data
		csv1.data.forEach((r) => {
			const preco = parseNumber(r['Valor do Combustível (R$)']);
			if (preco === null) return;
			rows.push({
				posto: r['Nome do Posto']?.trim() ?? '',
				bairro: r['Bairro']?.trim() ?? '',
				tipo: r['Tipo de Combustível']?.trim() ?? '',
				preco,
				data: r['Data da Coleta'] ?? '',
			});
		});

		// consu-3: mesma estrutura de consu-1
		csv3.data.forEach((r) => {
			const preco = parseNumber(r['Valor do Combustível (R$)']);
			if (preco === null) return;
			rows.push({
				posto: r['Nome do Posto']?.trim() ?? '',
				bairro: r['Bairro']?.trim() ?? '',
				tipo: r['Tipo de Combustível']?.trim() ?? '',
				preco,
				data: r['Data da Coleta'] ?? '',
			});
		});

		// consu-2: tem Preço Médio (R$) e Última Coleta — usamos como ponto adicional
		csv2.data.forEach((r) => {
			const preco = parseNumber(r['Preço Médio (R$)']);
			if (preco === null) return;
			rows.push({
				posto: r['Nome do Posto']?.trim() ?? '',
				bairro: r['Bairro']?.trim() ?? '',
				tipo: r['Tipo de Combustível']?.trim() ?? '',
				preco,
				data: r['Última Coleta'] ?? '',
			});
		});

		return rows;
	}, [csv1.data, csv2.data, csv3.data]);

	// ---- Gráfico I: evolução do preço médio de cada combustível (geral) ----
	// Para cada (mês, tipo), calcula a média de todos os postos
	const serieGeral = useMemo(() => {
		const map = new Map<string, Map<string, { soma: number; qtd: number }>>();

		base.forEach((r) => {
			const ts = toTimestamp(r.data);
			if (!Number.isFinite(ts)) return;
			const mes = labelMes(ts);

			if (!map.has(mes)) map.set(mes, new Map());
			const inner = map.get(mes)!;
			if (!inner.has(r.tipo)) inner.set(r.tipo, { soma: 0, qtd: 0 });
			const cell = inner.get(r.tipo)!;
			cell.soma += r.preco;
			cell.qtd += 1;
		});

		// Ordena meses cronologicamente
		const meses = Array.from(map.keys()).sort((a, b) => {
			const [ma, ya] = a.split('/').map(Number);
			const [mb, yb] = b.split('/').map(Number);
			return ya * 12 + ma - (yb * 12 + mb);
		});

		const tipos = Array.from(new Set(base.map((r) => r.tipo))).filter(Boolean);

		return meses.map((mes) => {
			const row: Record<string, string | number> = { mes };
			tipos.forEach((t) => {
				const cell = map.get(mes)?.get(t);
				row[t] = cell ? Number((cell.soma / cell.qtd).toFixed(3)) : 0;
			});
			return row;
		});
	}, [base]);

	const tiposCombustivel = useMemo(
		() =>
			Array.from(new Set(base.map((r) => r.tipo)))
				.filter(Boolean)
				.sort(),
		[base],
	);

	// ---- Gráfico II: por posto, filtrado por combustível ----
	const [combustivelFiltro, setCombustivelFiltro] = useState<string>('');

	const postosDisponiveis = useMemo(
		() =>
			Array.from(new Set(base.map((r) => r.posto)))
				.filter(Boolean)
				.sort(),
		[base],
	);

	// Inicializa o filtro com o primeiro combustível disponível
	const combustivelAtual = combustivelFiltro || tiposCombustivel[0] || '';

	const seriePorPosto = useMemo(() => {
		const filtrados = base.filter((r) => r.tipo === combustivelAtual);

		const map = new Map<string, Map<string, { soma: number; qtd: number }>>();
		filtrados.forEach((r) => {
			const ts = toTimestamp(r.data);
			if (!Number.isFinite(ts)) return;
			const mes = labelMes(ts);

			if (!map.has(mes)) map.set(mes, new Map());
			const inner = map.get(mes)!;
			if (!inner.has(r.posto)) inner.set(r.posto, { soma: 0, qtd: 0 });
			const cell = inner.get(r.posto)!;
			cell.soma += r.preco;
			cell.qtd += 1;
		});

		const meses = Array.from(map.keys()).sort((a, b) => {
			const [ma, ya] = a.split('/').map(Number);
			const [mb, yb] = b.split('/').map(Number);
			return ya * 12 + ma - (yb * 12 + mb);
		});

		const postos = Array.from(new Set(filtrados.map((r) => r.posto)));

		return meses.map((mes) => {
			const row: Record<string, string | number> = { mes };
			postos.forEach((p) => {
				const cell = map.get(mes)?.get(p);
				row[p] = cell ? Number((cell.soma / cell.qtd).toFixed(3)) : 0;
			});
			return row;
		});
	}, [base, combustivelAtual]);

	const postosNoGrafico = useMemo(
		() =>
			Array.from(
				new Set(
					base.filter((r) => r.tipo === combustivelAtual).map((r) => r.posto),
				),
			).filter(Boolean),
		[base, combustivelAtual],
	);

	if (loading) return <p className="loading">Carregando dados…</p>;
	if (error) return <p className="error">Erro: {error}</p>;

	return (
		<section className="content">
			{/* ---------- GRÁFICO I ---------- */}
			<div className="chart-card">
				<h2>I. Evolução do preço médio de cada combustível</h2>
				<p className="chart-sub">
					Média de todos os postos, agrupada por mês. Cada linha é um
					combustível.
				</p>
				<div className="chart-box">
					<ResponsiveContainer
						width="100%"
						height={380}>
						<LineChart
							data={serieGeral}
							margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="#e2e8f0"
							/>
							<XAxis
								dataKey="mes"
								tick={{ fontSize: 12 }}
							/>
							<YAxis
								tick={{ fontSize: 12 }}
								domain={['auto', 'auto']}
								tickFormatter={(v) => `R$ ${Number(v).toFixed(2)}`}
							/>
							<Tooltip
								formatter={(value) =>
									`R$ ${Number(value).toFixed(2).replace('.', ',')}`
								}
							/>
							<Legend />
							{tiposCombustivel.map((t) => (
								<Line
									key={t}
									type="monotone"
									dataKey={t}
									stroke={CORES_COMBUSTIVEL[t] ?? '#475569'}
									strokeWidth={2}
									dot={{ r: 3 }}
									activeDot={{ r: 5 }}
									connectNulls
								/>
							))}
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* ---------- GRÁFICO II ---------- */}
			<div className="chart-card">
				<div className="chart-header">
					<div>
						<h2>II. Evolução do preço médio por posto</h2>
						<p className="chart-sub">
							Cada linha é um posto. Selecione o combustível abaixo.
						</p>
					</div>
					<select
						className="select"
						value={combustivelAtual}
						onChange={(e) => setCombustivelFiltro(e.target.value)}>
						{tiposCombustivel.map((t) => (
							<option
								key={t}
								value={t}>
								{t}
							</option>
						))}
					</select>
				</div>

				<div className="chart-box">
					<ResponsiveContainer
						width="100%"
						height={420}>
						<LineChart
							data={seriePorPosto}
							margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="#e2e8f0"
							/>
							<XAxis
								dataKey="mes"
								tick={{ fontSize: 12 }}
							/>
							<YAxis
								tick={{ fontSize: 12 }}
								domain={['auto', 'auto']}
								tickFormatter={(v) => `R$ ${Number(v).toFixed(2)}`}
							/>
							<Tooltip
								formatter={(value) =>
									`R$ ${Number(value).toFixed(2).replace('.', ',')}`
								}
							/>
							<Legend wrapperStyle={{ fontSize: 12 }} />
							{postosNoGrafico.map((p, idx) => (
								<Line
									key={p}
									type="monotone"
									dataKey={p}
									stroke={CORES_POSTO[idx % CORES_POSTO.length]}
									strokeWidth={2}
									dot={{ r: 3 }}
									activeDot={{ r: 5 }}
									connectNulls
								/>
							))}
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* ---------- Extra: barras comparativas (último mês por combustível) ---------- */}
			<div className="chart-card">
				<h2>III. Comparativo do último mês por combustível</h2>
				<p className="chart-sub">
					Preço médio no mês mais recente disponível, por combustível.
				</p>
				<div className="chart-box">
					<ResponsiveContainer
						width="100%"
						height={320}>
						<BarChart
							data={
								serieGeral.length ? [serieGeral[serieGeral.length - 1]] : []
							}>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="#e2e8f0"
							/>
							<XAxis
								dataKey="mes"
								tick={{ fontSize: 12 }}
							/>
							<YAxis
								tickFormatter={(v) => `R$ ${Number(v).toFixed(2)}`}
								tick={{ fontSize: 12 }}
							/>
							<Tooltip
								formatter={(value) =>
									`R$ ${Number(value).toFixed(2).replace('.', ',')}`
								}
							/>
							<Legend />
							{tiposCombustivel.map((t) => (
								<Bar
									key={t}
									dataKey={t}
									fill={CORES_COMBUSTIVEL[t] ?? '#475569'}
									radius={[4, 4, 0, 0]}
								/>
							))}
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</section>
	);
}
