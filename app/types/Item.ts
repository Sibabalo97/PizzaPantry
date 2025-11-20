export type Category = 'ingredient' | 'packaging' | 'beverage' | 'other';

export type Item = {
  id: string;
  name: string;
  category: 'ingredient' | 'packaging' | 'beverage' | 'other';
  quantity: number;
  unit: string;
  reorderPoint: number;
  supplier?: string;
  lastUpdated: string;
};