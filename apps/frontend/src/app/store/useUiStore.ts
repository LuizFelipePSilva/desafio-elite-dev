import { create } from 'zustand';

import type { UiState, UiActions } from './uiSlice';

export const useUiStore = create<UiState & UiActions>((set) => ({
  isLoading: false,
  toast: null,
  setLoading: (isLoading) => set({ isLoading }),
  setToast: (toast) => set({ toast }),
  clearToast: () => set({ toast: null }),
}));
