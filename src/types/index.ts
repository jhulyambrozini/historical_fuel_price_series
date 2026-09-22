export type FuelType =
  | 'gasolina_comum'
  | 'gasolina_aditivada'
  | 'etanol'
  | 'diesel_s10'
  | 'diesel_comum';

export interface FuelConfig {
  id: FuelType;
  label: string;
  color: string;
  dotColor: string;
}

export interface FuelPriceData {
  lastPrice: number;
  lastCollection: string;
  minPrice: number;
  maxPrice: number;
  variationPercent: number;
  variationAmount: number;
  history: { date: string; price: number }[];
  dailyHistory: { date: string; price: number }[];
}

export interface GasStation {
  id: string;
  name: string;
  neighborhood: string;
  city: string;
  lastCollection: string;
  prices: Partial<Record<FuelType, FuelPriceData>>;
}

export type TabId = 'preco' | 'preco-medio' | 'ultimo-preco' | 'historico-variacao'
  | 'evolucao-preco-medio' | 'evolucao-preco-por-posto';

export interface Tab {
  id: TabId;
  label: string;
}