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
	console.log(tabs);
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
