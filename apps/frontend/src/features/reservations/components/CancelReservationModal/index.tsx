import * as S from './styles';

import { Button } from '@/shared/components/Button';
import { Modal } from '@/shared/components/Modal';

interface CancelReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function CancelReservationModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: CancelReservationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cancelar reserva">
      <S.Wrapper>
        <S.Text>
          Tem certeza que deseja cancelar esta reserva? Essa ação não pode ser desfeita.
        </S.Text>

        <S.Actions>
          <Button type="button" variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
            Voltar
          </Button>
          <Button type="button" variant="danger" size="sm" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Cancelando...' : 'Confirmar cancelamento'}
          </Button>
        </S.Actions>
      </S.Wrapper>
    </Modal>
  );
}
