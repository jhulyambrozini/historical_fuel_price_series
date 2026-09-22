export function Header({ subtitle }: { subtitle?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="text-xs font-normal tracking-wide uppercase"
        style={{ color: 'var(--color-text-muted)', letterSpacing: '1.4px' }}
      >
        São Mateus — ES
      </span>
      <h1
        className="m-0 text-2xl font-normal"
        style={{ color: 'var(--color-text-primary)', lineHeight: 1.4 }}
      >
        Análise de Preços de Postos de Combustiveis
      </h1>
      {subtitle && (
        <span className="text-sm font-normal" style={{ color: 'var(--color-text-secondary)' }}>
          {subtitle}
        </span>
      )}
    </div>
  );
}