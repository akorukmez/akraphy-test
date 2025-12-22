
import { HistoryItem } from '../types';

const HISTORY_KEY = 'jewelai_history';
const MAX_HISTORY_ITEMS = 20; // Limit to prevent LocalStorage quota issues with Base64 strings

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
    try {
      const current = historyService.getHistory();
      // Add new item to the beginning
      const updated = [item, ...current];
      
      // Trim to max limit
      if (updated.length > MAX_HISTORY_ITEMS) {
        updated.length = MAX_HISTORY_ITEMS;
      }

      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save history (likely quota exceeded)", e);
      // Optional: Clear oldest items aggressively if quota fails
    }
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
