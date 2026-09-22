export function SearchFilter() {
  return (
    <div className="flex items-end gap-3">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
          Buscar posto ou bairro
        </label>
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2.5"
          style={{ backgroundColor: 'var(--color-bg-input)' }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Ex: Ferrari, Boa Vista..."
            className="w-50 border-none bg-transparent text-base outline-none"
            style={{ color: 'var(--color-text-secondary)' }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
          Filtrar por combustível
        </label>
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2.5"
          style={{ backgroundColor: 'var(--color-bg-input)' }}
        >
          <span className="text-base" style={{ color: 'var(--color-text-primary)' }}>
            Todos
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}