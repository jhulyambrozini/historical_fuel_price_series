import type { Tab, TabId } from '../../types';

const TABS: Tab[] = [
	{ id: 'preco', label: 'Menor/Maior Preço' },
	{ id: 'preco-medio', label: 'Preço Médio' },
	{ id: 'ultimo-preco', label: 'Último Preço' },
	{ id: 'historico-variacao', label: 'Histórico de Variação' },
	{ id: 'evolucao-preco-medio', label: 'Evolução do Preço Médio' },
	{
		id: 'evolucao-preco-por-posto',
		label: 'Evolução do Preço Médio por Posto',
	},
];

export function TabNavigation({
	activeTab,
	onTabChange,
}: {
	activeTab: TabId;
	onTabChange: (tab: TabId) => void;
}) {
	return (
		<div
			className="flex flex-wrap"
			style={{ borderBottom: '1px solid var(--color-border-light)' }}>
			{TABS.map((tab) => {
				const isActive = tab.id === activeTab;
				return (
					<button
						key={tab.id}
						type="button"
						onClick={() => onTabChange(tab.id)}
						className="relative cursor-pointer px-2 py-2.5 text-sm font-medium transition-colors sm:px-4 sm:text-base"
						style={{
							color: isActive
								? 'var(--color-accent)'
								: 'var(--color-text-secondary)',
							borderBottom: isActive
								? `2px solid var(--color-accent)`
								: '2px solid transparent',
						}}>
						{tab.label}
					</button>
				);
			})}
		</div>
	);
}
