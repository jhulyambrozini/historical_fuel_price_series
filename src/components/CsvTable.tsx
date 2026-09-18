// src/components/CsvTable.tsx
import type { CsvRow } from '../hooks/useCsv';
import { formatBRL, isMoneyColumn } from '../utils/format';

interface Props {
	headers: string[];
	rows: CsvRow[];
}

export function CsvTable({ headers, rows }: Props) {
	if (rows.length === 0) {
		return <p className="empty">Nenhum registro encontrado.</p>;
	}

	// Pré-calcula quais colunas são monetárias
	const moneyFlags = headers.map((h) => isMoneyColumn(h));

	return (
		<div className="table-wrapper">
			<table>
				<thead>
					<tr>
						{headers.map((h) => (
							<th
								key={h}
								className={isMoneyColumn(h) ? 'num' : ''}>
								{h}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, i) => (
						<tr key={i}>
							{headers.map((h, j) => {
								const raw = row[h] ?? '';
								const display = moneyFlags[j] ? formatBRL(raw) : raw;
								return (
									<td
										key={h}
										className={moneyFlags[j] ? 'num money' : ''}>
										{display}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
