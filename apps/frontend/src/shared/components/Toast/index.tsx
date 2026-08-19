import { useEffect } from 'react';

import * as S from './styles';

import { useUiStore } from '@/app/store';

export function Toast() {
  const toast = useUiStore((state) => state.toast);
  const clearToast = useUiStore((state) => state.clearToast);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => clearToast(), 4000);
    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <S.Overlay>
      <S.Container $type={toast.type}>
        <S.Icon $type={toast.type}>{toast.type === 'error' ? '✕' : '✓'}</S.Icon>
        <S.Message>{toast.message}</S.Message>
        <S.Close onClick={clearToast}>✕</S.Close>
      </S.Container>
    </S.Overlay>
  );
}
