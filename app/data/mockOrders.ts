import { Order } from "../types/Orders";

export const mockOrders: Order[] = [
  { id: '1', supplier: 'Dairy Fresh Co.', items: ['Mozzarella Cheese'], status: 'delivered', date: '2024-01-15' },
  { id: '2', supplier: 'PackPro Inc.', items: ['Pizza Boxes (Large)'], status: 'processing', date: '2024-01-16' },
  { id: '3', supplier: 'Meat Masters', items: ['Pepperoni', 'Sausage'], status: 'pending', date: '2024-01-17' },
];