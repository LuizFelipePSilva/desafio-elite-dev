import { useTicketById } from '../../hooks/useTicketById';

import * as S from './styles';

import { Button } from '@/shared/components/Button';
import { Modal } from '@/shared/components/Modal';
import { Skeleton } from '@/shared/components/Skeleton';
import { QRCodeSVG } from 'qrcode.react';

interface TicketDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string | undefined;
}

const statusLabel: Record<string, string> = {
  VALID: 'Válido',
  USED: 'Utilizado',
  CANCELLED: 'Cancelado',
};

const statusColors: Record<string, string> = {
  VALID: '#22c55e',
  USED: '#FF5C5C',
  CANCELLED: '#8D93A0',
};

export function TicketDetailModal({ isOpen, onClose, ticketId }: TicketDetailModalProps) {
  const { data: ticket, isLoading } = useTicketById(ticketId);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalhes do Ingresso">
      <S.Wrapper>
        {isLoading && (
          <S.LoadingWrapper>
            <Skeleton height="280px" />
            <Skeleton height="20px" width="60%" />
            <Skeleton height="16px" width="40%" />
          </S.LoadingWrapper>
        )}

        {!isLoading && ticket && (
          <>
            <S.QrWrapper>
              <QRCodeSVG value={ticket.qrCode} size={220} />
            </S.QrWrapper>

            <S.Details>
              <S.DetailRow>
                <S.DetailLabel>Código</S.DetailLabel>
                <S.DetailValue>{ticket.ticketCode}</S.DetailValue>
              </S.DetailRow>

              <S.DetailRow>
                <S.DetailLabel>Status</S.DetailLabel>
                <S.StatusBadge $color={statusColors[ticket.status]}>
                  {statusLabel[ticket.status]}
                </S.StatusBadge>
              </S.DetailRow>

              {ticket.validatedAt && (
                <S.DetailRow>
                  <S.DetailLabel>Validado em</S.DetailLabel>
                  <S.DetailValue>
                    {new Date(ticket.validatedAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </S.DetailValue>
                </S.DetailRow>
              )}
            </S.Details>
          </>
        )}

        {!isLoading && !ticket && <S.EmptyText>Ingresso não encontrado.</S.EmptyText>}

        <S.Actions>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Fechar
          </Button>
        </S.Actions>
      </S.Wrapper>
    </Modal>
  );
}
