import { Item } from "../types/Item";

export let mockItems: Item[] = [
  {
    id: '1',
    name: 'Mozzarella Cheese',
    category: 'ingredient',
    quantity: 45,
    unit: 'lbs',
    reorderPoint: 20,
    supplier: 'Dairy Fresh Co.',
    lastUpdated: new Date(Date.now() - 14400000).toISOString()
  },
  {
    id: '2',
    name: 'Pizza Boxes (Large)',
    category: 'packaging',
    quantity: 150,
    unit: 'units',
    reorderPoint: 50,
    supplier: 'PackPro Inc.',
    lastUpdated: new Date(Date.now() - 14400000).toISOString()
  },
  {
    id: '3',
    name: 'Tomato Sauce',
    category: 'ingredient',
    quantity: 8,
    unit: 'gallons',
    reorderPoint: 10,
    supplier: 'Fresh Tomato Inc.',
    lastUpdated: new Date(Date.now() - 14400000).toISOString()
  }
];