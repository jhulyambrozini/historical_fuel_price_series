// src/utils/format.ts

/**
 * Converte string/número para número, aceitando vírgula ou ponto como decimal.
 * Retorna null se não for numérico válido (ex: NULL, vazio, "-").
 */
export function parseNumber(
	value: string | number | null | undefined,
): number | null {
	if (value === null || value === undefined) return null;
	if (typeof value === 'number') return Number.isFinite(value) ? value : null;

	const raw = String(value).trim();
	if (raw === '' || raw.toUpperCase() === 'NULL' || raw === '-') return null;

	const cleaned = raw.replace(/\s/g, '').replace('%', '');
	let normalized = cleaned;

	const hasComma = cleaned.includes(',');
	const hasDot = cleaned.includes('.');

	if (hasComma && hasDot) {
		if (cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.')) {
			normalized = cleaned.replace(/\./g, '').replace(',', '.');
		} else {
			normalized = cleaned.replace(/,/g, '');
		}
	} else if (hasComma) {
		normalized = cleaned.replace(',', '.');
	}

	const n = Number(normalized);
	return Number.isFinite(n) ? n : null;
}

/**
 * Formata um valor como moeda brasileira: R$ 6,89
 * Se for NULL/vazio/inválido, retorna "R$ 0,00".
 */
export function formatBRL(value: string | number | null | undefined): string {
	const n = parseNumber(value);
	const safe = n === null ? 0 : n;
	return safe.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});
}

/**
 * Formata um valor como porcentagem brasileira: 9,39%
 * Se for NULL/vazio/inválido, retorna "0,00%".
 */
export function formatPercent(
	value: string | number | null | undefined,
): string {
	console.log('safe =>:', value);
	const n = parseNumber(value);
	const safe = n === null ? 0 : n;
	return `${safe.toFixed(2).replace('.', ',')}%`;
}

/**
 * Detecta se um cabeçalho de coluna representa dinheiro.
 */
export function isMoneyColumn(header: string): boolean {
	const h = header.toLowerCase();

	if (h.includes('(%)') || h.includes('percentual')) return false;
	if (h.includes('quantidade') || h.includes('amostras')) return false;
	if (h.includes('data') || h.includes('coleta')) return false;

	return (
		h.includes('r$') ||
		h.includes('preço') ||
		h.includes('preco') ||
		h.includes('valor') ||
		h.includes('variação (r$)') ||
		h.includes('variacao (r$)')
	);
}

/**
 * Detecta se um cabeçalho de coluna representa porcentagem.
 */
export function isPercentColumn(header: string): boolean {
	const h = header.toLowerCase();
	return (
		h.includes('(%)') || h.includes('percentual') || h.includes('porcentagem')
	);
}
