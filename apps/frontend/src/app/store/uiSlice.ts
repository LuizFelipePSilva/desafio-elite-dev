export interface UiState {
  isLoading: boolean;
  toast: { message: string; type: 'success' | 'error' } | null;
}

export const initialUiState: UiState = {
  isLoading: false,
  toast: null,
};

export interface UiActions {
  setLoading: (isLoading: boolean) => void;
  setToast: (toast: UiState['toast']) => void;
  clearToast: () => void;
}
