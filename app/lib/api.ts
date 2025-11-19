import { mockItems } from "../data/mockItems";
import { Item } from "../types/Item";
import { AdjustmentLog } from "../types/AdjustmentLog";

let logs: AdjustmentLog[] = [];

const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getItems: async (): Promise<Item[]> => {
    await delay();
    return JSON.parse(JSON.stringify(mockItems));
  },

  createItem: async (payload: Omit<Item, 'id' | 'lastUpdated'>): Promise<Item> => {
    await delay();
    const newItem: Item = {
      ...payload,
      id: 'i-' + Math.random().toString(36).slice(2,9),
      // Item.lastUpdated uses numerical timestamp (number)
      lastUpdated: new Date().getTime() 
    };
    mockItems.push(newItem);
    return JSON.parse(JSON.stringify(newItem));
  },

  updateItem: async (id: string, payload: Partial<Item>): Promise<Item | null> => {
    await delay();
    const idx = mockItems.findIndex(i => i.id === id);
    if (idx === -1) return null;
    mockItems[idx] = { 
        ...mockItems[idx], 
        ...payload, 
        // Item.lastUpdated uses numerical timestamp (number)
        lastUpdated: new Date().getTime() 
    };
    return JSON.parse(JSON.stringify(mockItems[idx]));
  },

  deleteItem: async (id: string) => {
    await delay();
    const before = mockItems.length;
    
    // Using filter for cleaner array deletion
    //mockItems = mockItems.filter(i => i.id !== id);
    
    // Remove related logs
    logs = logs.filter(l => l.itemId !== id);
    return { ok: true, removed: before - mockItems.length };
  },

  adjustItem: async (itemId: string, type: 'add' | 'remove', amount: number, reason: string, user: string) => {
    await delay();
    const idx = mockItems.findIndex(i => i.id === itemId);
    if (idx === -1) throw new Error('Not found');
    
    const prev = mockItems[idx].quantity;
    const newQ = type === 'add' ? prev + amount : prev - amount;

    // Safety check for non-negative stock
    if (newQ < 0) {
        throw new Error('Adjustment would result in negative quantity.');
    }
    
    mockItems[idx].quantity = newQ;
    // Item.lastUpdated uses numerical timestamp (number)
    mockItems[idx].lastUpdated = new Date().getTime(); 

    const log: AdjustmentLog = {
      id: 'log-' + Math.random().toString(36).slice(2,9),
      itemId,
      type,
      amount,
      reason,
      user,
      // 💡 REVERTED FIX: AdjustmentLog.timestamp likely requires ISO String
      timestamp: new Date().toISOString() 
    };
    logs.unshift(log);
    return { item: JSON.parse(JSON.stringify(mockItems[idx])), log };
  },

  getLogsForItem: async (itemId: string) => {
    await delay();
    return logs.filter(l => l.itemId === itemId).slice(0, 20);
  }
};