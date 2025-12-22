
import { HistoryItem } from '../types';

const HISTORY_KEY = 'jewelai_history';
// Limit increased theoretically, but actual limit is defined by storage quota (approx 5MB)
const MAX_HISTORY_ITEMS = 50; 

export const historyService = {
  getHistory: (): HistoryItem[] => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load history", e);
      return [];
    }
  },

  addToHistory: (item: HistoryItem) => {
    let current = historyService.getHistory();
    // Add new item to the beginning
    let updated = [item, ...current];
    
    // Safety cap
    if (updated.length > MAX_HISTORY_ITEMS) {
      updated = updated.slice(0, MAX_HISTORY_ITEMS);
    }

    // Try to save, if quota exceeded, remove oldest items until it fits
    const saveWithRetry = (items: HistoryItem[]) => {
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
      } catch (e: any) {
        if (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014) {
          if (items.length > 1) {
            // Remove the last (oldest) item and try again
            items.pop(); 
            saveWithRetry(items);
          } else {
            console.error("Storage full, cannot save even a single item.");
          }
        } else {
          console.error("Failed to save history", e);
        }
      }
    };

    saveWithRetry(updated);
  },

  deleteFromHistory: (id: string) => {
    try {
      const current = historyService.getHistory();
      const updated = current.filter(item => item.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error("Failed to delete item", e);
      return [];
    }
  },

  clearHistory: () => {
    localStorage.removeItem(HISTORY_KEY);
  }
};
