import Papa from 'papaparse';
import { useEffect, useState } from 'react';

export type CsvRow = Record<string, string>;

export function useCsv(url: string) {
	const [data, setData] = useState<CsvRow[]>([]);
	const [headers, setHeaders] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		setLoading(true);
		setError(null);

		fetch(url)
			.then((res) => {
				if (!res.ok) throw new Error(`Erro ${res.status} ao carregar ${url}`);
				return res.text();
			})
			.then((text) => {
				const parsed = Papa.parse<CsvRow>(text, {
					header: true,
					skipEmptyLines: true,
					dynamicTyping: false,
				});
				if (cancelled) return;
				setHeaders(parsed.meta.fields ?? []);
				setData(parsed.data);
				setLoading(false);
			})
			.catch((err) => {
				if (cancelled) return;
				setError(err.message);
				setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [url]);

	return { data, headers, loading, error };
}
