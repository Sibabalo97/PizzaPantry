export interface AdjustmentLog {
  id: string;
  itemId: string;
  type: 'add' | 'remove';
  amount: number;
  reason: string;
  timestamp: string;
  user: string;
}
