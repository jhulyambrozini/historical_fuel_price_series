import { useState } from 'react';
import type { TabId, FuelType } from './types';
import { Header } from './components/layout/Header';
import { TabNavigation } from './components/layout/TabNavigation';
import { PrecoView } from './components/dashboard/PrecoView';
import { PrecoMedioView } from './components/dashboard/PrecoMedioView';
import { StationCardsGrid } from './components/dashboard/StationCardsGrid';
import { VariationCardsGrid } from './components/dashboard/VariationCardsGrid';
import { EvolucaoPrecoMedioView } from './components/dashboard/EvolucaoPrecoMedioView';
import { EvolucaoPrecoPorPostoView } from './components/dashboard/EvolucaoPrecoPorPostoView';

const SUBTITLES: Record<TabId, string> = {
  preco: 'Monitoramento de preços por posto — menor e maior valor praticado por tipo de combustível.',
  'preco-medio': 'Preço médio por combustível ao longo do tempo — jan/2026 a jun/2026.',
  'ultimo-preco': 'Preço médio por posto, últimos valores registrados e histórico de variação de preços.',
  'historico-variacao': 'Preço médio por posto, últimos valores registrados e histórico de variação de preços.',
  'evolucao-preco-medio': 'Preço médio por combustível ao longo do tempo — jan/2026 a jun/2026.',
  'evolucao-preco-por-posto': 'Preço médio de cada posto ao longo do tempo — selecione o combustível.',
};

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('preco');
  const [selectedFuels, setSelectedFuels] = useState<FuelType[]>([
    'gasolina_comum',
    'gasolina_aditivada',
    'etanol',
    'diesel_s10',
    'diesel_comum',
  ]);

  const handleFuelToggle = (fuel: FuelType) => {
    setSelectedFuels((prev) =>
      prev.includes(fuel) ? prev.filter((f) => f !== fuel) : [...prev, fuel],
    );
  };

  return (
    <div
      className="flex flex-col gap-4 p-8"
      style={{ minHeight: '100dvh', backgroundColor: 'var(--color-bg-primary)' }}
    >
      <Header subtitle={SUBTITLES[activeTab]} />

      <div
        className="flex flex-col gap-3 rounded-xl p-3"
        style={{ backgroundColor: 'var(--color-bg-card)' }}
      >
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {activeTab === 'preco' && <PrecoView />}
      {activeTab === 'preco-medio' && (
        <PrecoMedioView
          selectedFuels={selectedFuels}
          onFuelToggle={handleFuelToggle}
        />
      )}
      {activeTab === 'ultimo-preco' && <StationCardsGrid />}
      {activeTab === 'historico-variacao' && <VariationCardsGrid />}
      {activeTab === 'evolucao-preco-medio' && (
        <EvolucaoPrecoMedioView
          selectedFuels={selectedFuels}
          onFuelToggle={handleFuelToggle}
        />
      )}
      {activeTab === 'evolucao-preco-por-posto' && <EvolucaoPrecoPorPostoView />}
    </div>
  );
}

export default App;