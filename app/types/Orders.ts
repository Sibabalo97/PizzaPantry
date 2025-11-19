export interface Order {
  id: string;
  supplier: string;
  items: string[];
  status: 'pending' | 'processing' | 'delivered';
  date: string;
}