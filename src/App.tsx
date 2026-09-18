// src/App.tsx
import { useState } from 'react';
import './App.css';
import { LinkedInIcon } from './components/LinkedInIcon';
import { GraficosPage } from './pages/GraphicsPage';
import { TablesPage } from './pages/TablePage';

type Page = 'tabelas' | 'graficos';

export default function App() {
	const [page, setPage] = useState<Page>('tabelas');

	return (
		<div className="app">
			<header className="header">
				<h1>⛽ Postos de Combustível — São Mateus/ES</h1>
				<p className="subtitle">
					Visualização das tabelas de coletas, médias e variações de preços.
					<br></br>
					Os dados utilizados neste site foram extraidos do site oficial da{' '}
					<a
						href="https://www.gov.br/anp/pt-br/centrais-de-conteudo/dados-abertos/serie-historica-de-precos-de-combustiveis"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Serie Histórica de preço de combustíveis">
						Serie Histórica de preço de combustíveis
					</a>
				</p>

				<nav className="nav">
					<button
						className={page === 'tabelas' ? 'nav-btn active' : 'nav-btn'}
						onClick={() => setPage('tabelas')}>
						📊 Tabelas
					</button>
					<button
						className={page === 'graficos' ? 'nav-btn active' : 'nav-btn'}
						onClick={() => setPage('graficos')}>
						📈 Gráficos
					</button>
				</nav>
			</header>

			{page === 'tabelas' ? <TablesPage /> : <GraficosPage />}

			<footer className="footer">
				<a
					href="https://www.linkedin.com/in/jhuly-ambrozini-dev"
					target="_blank"
					rel="noopener noreferrer"
					className="social-link"
					aria-label="LinkedIn">
					<span>Desenvolvido por Jhuly</span>
					<LinkedInIcon size={18} />
				</a>

				<small>Dados de consumo de combustíveis • São Mateus/ES</small>
			</footer>
		</div>
	);
}
