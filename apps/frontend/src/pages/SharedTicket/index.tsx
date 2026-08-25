import { QRCodeSVG } from 'qrcode.react';
import { useParams } from 'react-router-dom';

import * as S from './styles';

import { useSharedTicket } from '@/features/tickets/hooks/useSharedTicket';
import { EmptyState } from '@/shared/components/EmptyState';
import { Skeleton } from '@/shared/components/Skeleton';

const statusConfig: Record<string, { label: string; color: string }> = {
  VALID: { label: 'Válido', color: '#22c55e' },
  USED: { label: 'Utilizado', color: '#FF5C5C' },
  CANCELLED: { label: 'Cancelado', color: '#8D93A0' },
};

export function SharedTicket() {
  const { token } = useParams<{ token: string }>();
  const { data: ticket, isLoading, isError, error } = useSharedTicket(token);

  if (isLoading) {
    return (
      <S.Wrapper>
        <S.Container>
          <Skeleton height="320px" />
          <Skeleton height="20px" width="60%" />
          <Skeleton height="16px" width="40%" />
        </S.Container>
      </S.Wrapper>
    );
  }

  if (isError || !ticket) {
    return (
      <S.Wrapper>
        <S.Container>
          <EmptyState
            title="Link inválido ou expirado"
            description={
              error instanceof Error
                ? error.message
                : 'Este link de compartilhamento não existe ou já expirou.'
            }
          />
        </S.Container>
      </S.Wrapper>
    );
  }

  const status = statusConfig[ticket.status] ?? { label: 'Desconhecido', color: '#8D93A0' };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Header>
          <S.Badge $color={status.color}>{status.label}</S.Badge>
          <S.Title>Ingresso Compartilhado</S.Title>
        </S.Header>

        <S.QrWrapper>
          <QRCodeSVG value={ticket.qrCode} size={240} />
        </S.QrWrapper>

        <S.Details>
          <S.DetailRow>
            <S.DetailLabel>Código</S.DetailLabel>
            <S.CodeValue>#{ticket.ticketCode}</S.CodeValue>
          </S.DetailRow>

          <S.DetailRow>
            <S.DetailLabel>Status</S.DetailLabel>
            <S.StatusBadge $color={status.color}>{status.label}</S.StatusBadge>
          </S.DetailRow>

          {ticket.validatedAt ? (
            <S.DetailRow>
              <S.DetailLabel>Validado em</S.DetailLabel>
              <S.DetailValue>{new Date(ticket.validatedAt).toLocaleString('pt-BR')}</S.DetailValue>
            </S.DetailRow>
          ) : null}
        </S.Details>

        {ticket.status === 'VALID' ? (
          <S.Footer>
            <S.FooterText>Apresente este QR Code na entrada do evento</S.FooterText>
          </S.Footer>
        ) : null}
      </S.Container>
    </S.Wrapper>
  );
}
