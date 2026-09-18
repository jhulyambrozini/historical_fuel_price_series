import { useMediaQuery } from '../hooks/useMediaQuery';

interface Tab {
	id: string;
	label: string;
}

interface Props {
	tabs: Tab[];
	active: string;
	onChange: (id: string) => void;
}

export function Tabs({ tabs, active, onChange }: Props) {
	const isMobile = useMediaQuery('(max-width: 640px)');

	if (isMobile) {
		return (
			<select
				className="tabs-select"
				value={active}
				onChange={(e) => onChange(e.target.value)}
				aria-label="Selecionar tabela">
				{tabs.map((t) => (
					<option
						key={t.id}
						value={t.id}>
						{t.label}
					</option>
				))}
			</select>
		);
	}

	return (
		<div
			className="tabs"
			role="tablist">
			{tabs.map((t) => (
				<button
					key={t.id}
					role="tab"
					aria-selected={active === t.id}
					className={active === t.id ? 'tab active' : 'tab'}
					onClick={() => onChange(t.id)}>
					{t.label}
				</button>
			))}
		</div>
	);
}
