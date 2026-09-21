export type SceneStep = 
  | 'intro'
  | 'transition'
  | 'garden'
  | 'selection'
  | 'builder'
  | 'message'
  | 'revelation'
  | 'celebration'
  | 'final';

export type FlowerType = 
  | 'girasol'
  | 'margarita'
  | 'rosa'
  | 'ramo'
  | 'campo'
  | 'silvestres';

export interface FlowerData {
  id: FlowerType;
  name: string;
  scientificName: string;
  emoji: string;
  description: string;
  meaning: string;
  color: string;
  accentColor: string;
  gradient: string;
  height: number;
  width: number;
}

export interface BouquetItem {
  uid: string;
  flowerId: FlowerType;
  rotation: number;
  scale: number;
  offsetY: number;
  offsetX: number;
  zIndex: number;
  swayDelay: number;
}

export interface DedicationMessage {
  message: string;
  date: string;
}
