export function Header({ subtitle }: { subtitle?: string }) {
	return (
		<div className="flex flex-col gap-2">
			<span
				className="text-xs font-normal tracking-wide uppercase"
				style={{ color: 'var(--color-text-muted)', letterSpacing: '1.4px' }}>
				São Mateus — ES
			</span>
			<h1
				className="m-0 text-xl font-normal sm:text-2xl"
				style={{ color: 'var(--color-text-primary)', lineHeight: 1.4 }}>
				Análise de Preços de Postos de Combustiveis
			</h1>
			<h2
				className="m-0 text-xl font-normal sm:text-XL"
				style={{ color: 'var(--color-text-secondary)' }}>
				Projeto de Extensão para o curso de Análise e Desenvolvimento de
				Sistemas - UVV{' '}
			</h2>
			{subtitle && (
				<span
					className="text-sm font-normal"
					style={{ color: 'var(--color-text-secondary)' }}>
					{subtitle}
				</span>
			)}
		</div>
	);
}
