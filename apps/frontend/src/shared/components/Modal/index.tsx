import type { ReactNode } from 'react';

import * as S from './styles';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Content onClick={(e) => e.stopPropagation()}>
        {title && <S.Header>{title}</S.Header>}
        <S.Body>{children}</S.Body>
      </S.Content>
    </S.Overlay>
  );
}
